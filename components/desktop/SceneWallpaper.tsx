"use client";

import { useEffect, useRef } from "react";
import { usePreferencesStore } from "@/store/preferences-store";

const wallpaperSources = {
  landscape: "/scene/landscape-4k.jpg",
} as const;

const vertexShaderSource = `
  attribute vec2 a_position;
  varying vec2 v_uv;

  void main() {
    v_uv = vec2(a_position.x * 0.5 + 0.5, 1.0 - (a_position.y * 0.5 + 0.5));
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;

  uniform sampler2D u_image;
  uniform vec2 u_resolution;
  uniform vec2 u_imageSize;
  uniform float u_time;
  varying vec2 v_uv;

  vec2 coverUv(vec2 uv) {
    float viewportAspect = u_resolution.x / u_resolution.y;
    float imageAspect = u_imageSize.x / u_imageSize.y;

    if (viewportAspect > imageAspect) {
      uv.y = (uv.y - 0.5) * (imageAspect / viewportAspect) + 0.5;
    } else {
      uv.x = (uv.x - 0.5) * (viewportAspect / imageAspect) + 0.5;
    }

    return uv;
  }

  void main() {
    vec2 uv = coverUv(v_uv);
    vec3 source = texture2D(u_image, uv).rgb;

    float greenChroma = source.g - max(source.r, source.b * 0.82);
    float foliageMask = smoothstep(0.035, 0.24, greenChroma)
      * smoothstep(0.54, 0.74, uv.y);

    float waterMask = smoothstep(0.555, 0.61, uv.y)
      * (1.0 - smoothstep(0.69, 0.735, uv.y));

    float foliageWave = sin(uv.x * 74.0 + u_time * 5.0 + sin(uv.y * 31.0))
      + sin(uv.x * 29.0 - u_time * 0.81) * 0.52
      + sin((uv.x + uv.y) * 17.0 + u_time * 0.042) * 0.24;
    vec2 foliageOffset = vec2(
      foliageWave * 0.00062,
      cos(uv.x * 43.0 - u_time * 2.5) * 0.00024
    ) * foliageMask;

    float waterWave = sin(uv.x * 170.0 + uv.y * 24.0 + u_time * 0.82)
      + sin(uv.x * 67.0 - u_time * 0.61) * 0.45;
    vec2 waterOffset = vec2(
      waterWave * 0.00105,
      sin(uv.x * 113.0 + u_time * 0.9) * 0.00042
    ) * waterMask;

    vec2 animatedUv = clamp(uv + foliageOffset + waterOffset, 0.001, 0.999);
    vec3 color = texture2D(u_image, animatedUv).rgb;

    float waterGlint = sin(uv.x * 220.0 + u_time * 1.15) * 0.5 + 0.5;
    color += vec3(0.012, 0.025, 0.03) * waterGlint * waterMask;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

export function SceneWallpaper() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wallpaper = usePreferencesStore((state) => state.wallpaper);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      powerPreference: "high-performance",
    });
    if (!gl) return;

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    const buffer = gl.createBuffer();
    const texture = gl.createTexture();
    if (!program || !buffer || !texture) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const resolution = gl.getUniformLocation(program, "u_resolution");
    const imageSize = gl.getUniformLocation(program, "u_imageSize");
    const time = gl.getUniformLocation(program, "u_time");
    const imageSampler = gl.getUniformLocation(program, "u_image");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let startedAt = performance.now();
    let ready = false;

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      let width = Math.round(canvas.clientWidth * pixelRatio);
      let height = Math.round(canvas.clientHeight * pixelRatio);
      const maxPixels = 2_400_000;
      if (width * height > maxPixels) {
        const scale = Math.sqrt(maxPixels / (width * height));
        width = Math.round(width * scale);
        height = Math.round(height * scale);
      }
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
      gl.uniform2f(resolution, width, height);
    };

    const render = (now: number) => {
      if (!ready) return;
      resize();
      gl.uniform1f(time, (now - startedAt) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      canvas.classList.add("is-ready");
      if (!reducedMotion.matches) frame = requestAnimationFrame(render);
    };

    const image = new Image();
    image.decoding = "async";
    image.onload = () => {
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
      gl.uniform1i(imageSampler, 0);
      gl.uniform2f(imageSize, image.naturalWidth, image.naturalHeight);
      ready = true;
      startedAt = performance.now();
      frame = requestAnimationFrame(render);
    };
    image.src = wallpaperSources[wallpaper];

    const handleMotionChange = () => {
      cancelAnimationFrame(frame);
      startedAt = performance.now();
      frame = requestAnimationFrame(render);
    };
    const handleResize = () => resize();
    reducedMotion.addEventListener("change", handleMotionChange);
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      reducedMotion.removeEventListener("change", handleMotionChange);
      window.removeEventListener("resize", handleResize);
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, [wallpaper]);

  return (
    <div className="scene-wallpaper" aria-hidden="true">
      <div
        className="landscape-wallpaper-fallback"
        style={{ backgroundImage: `url(${wallpaperSources[wallpaper]})` }}
      />
      <canvas ref={canvasRef} className="landscape-wallpaper-canvas" />
      <div className="landscape-wallpaper-light" />
    </div>
  );
}
