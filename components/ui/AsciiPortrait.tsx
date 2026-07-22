"use client";

import { useEffect, useRef, useState } from "react";
import { AsciiGenerator, CharsetPreset } from "ts-ascii-engine";

export function AsciiPortrait() {
  const containerRef = useRef<HTMLElement>(null);
  const [ascii, setAscii] = useState("Rendering portrait…");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const image = new window.Image();
    image.decoding = "async";
    let lastColumns = 0;

    const render = () => {
      if (!image.naturalWidth) return;

      const columns = Math.max(40, Math.min(58, Math.floor(container.clientWidth / 4)));
      if (columns === lastColumns) return;
      lastColumns = columns;

      const generator = new AsciiGenerator({
        charset: CharsetPreset.STANDARD,
        width: columns,
        aspectRatio: 0.52,
        colored: false,
        optimized: true,
      });

      setAscii(generator.convertImage(image).text);
    };

    image.onload = render;
    image.onerror = () => setAscii("Portrait unavailable");
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
