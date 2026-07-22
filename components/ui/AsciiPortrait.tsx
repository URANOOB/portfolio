"use client";

import { useEffect, useRef, useState } from "react";

const ramp = " .,:;irsXA253hMHGS#9B&@";

export function AsciiPortrait() {
  const containerRef = useRef<HTMLElement>(null);
  const [ascii, setAscii] = useState("Rendering portrait…");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return;

    const image = new window.Image();
    image.decoding = "async";

    const render = () => {
      if (!image.naturalWidth) return;
      const columns = Math.max(42, Math.min(74, Math.floor(container.clientWidth / 3.25)));
      const rows = Math.max(28, Math.round(columns * (image.naturalHeight / image.naturalWidth) * 0.47));
      canvas.width = columns;
      canvas.height = rows;
      context.clearRect(0, 0, columns, rows);
      context.drawImage(image, 0, 0, columns, rows);

      const pixels = context.getImageData(0, 0, columns, rows).data;
      const lines: string[] = [];
      for (let y = 0; y < rows; y += 1) {
        let line = "";
        for (let x = 0; x < columns; x += 1) {
          const index = (y * columns + x) * 4;
          const luminance =
            pixels[index] * 0.2126 + pixels[index + 1] * 0.7152 + pixels[index + 2] * 0.0722;
          const characterIndex = Math.round((1 - luminance / 255) * (ramp.length - 1));
          line += ramp[characterIndex];
        }
        lines.push(line.trimEnd());
      }
      setAscii(lines.join("\n"));
    };

    image.onload = render;
    image.onerror = () => setAscii("WG");
    image.src = "/about/william-and-cat.jpeg";

    const observer = new ResizeObserver(render);
    observer.observe(container);

    return () => {
      observer.disconnect();
      image.onload = null;
      image.onerror = null;
    };
  }, []);

  return (
    <figure
      ref={containerRef}
      className="about-ascii-portrait"
      role="img"
      aria-label="ASCII portrait of William Galeano holding his cat"
    >
      <pre aria-hidden="true">{ascii}</pre>
      <figcaption>William and his cat, rendered in ASCII.</figcaption>
    </figure>
  );
}
