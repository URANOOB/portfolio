"use client";

import { useEffect, useRef, useState } from "react";
import { AsciiGenerator, CharsetPreset } from "ts-ascii-engine";
import type { CharColor } from "ts-ascii-engine";

type RenderedPortrait = {
  characters: string[][];
  colors: CharColor[][];
};

export function AsciiPortrait() {
  const containerRef = useRef<HTMLElement>(null);
  const [portrait, setPortrait] = useState<RenderedPortrait | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const image = new window.Image();
    image.decoding = "async";
    let lastColumns = 0;

    const render = () => {
      if (!image.naturalWidth) return;

      const columns = Math.max(42, Math.min(74, Math.floor(container.clientWidth / 3.25)));
      if (columns === lastColumns) return;
      lastColumns = columns;

      const generator = new AsciiGenerator({
        charset: CharsetPreset.EXTENDED,
        width: columns,
        aspectRatio: 0.5,
        colored: true,
        optimized: true,
      });
      const result = generator.convertImage(image);

      setPortrait({
        characters: result.characters,
        colors: result.colors ?? [],
      });
    };

    image.onload = render;
    image.onerror = () => setPortrait(null);
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
      <pre aria-hidden="true">
        {portrait
          ? portrait.characters.map((row, rowIndex) => (
              <span className="about-ascii-line" key={rowIndex}>
                {row.map((character, columnIndex) => {
                  const color = portrait.colors[rowIndex]?.[columnIndex];
                  const style = color
                    ? { color: `rgb(${color.r} ${color.g} ${color.b})` }
                    : undefined;

                  return (
                    <span style={style} key={columnIndex}>
                      {character}
                    </span>
                  );
                })}
              </span>
            ))
          : "Rendering portrait…"}
      </pre>
      <figcaption>William and his cat, rendered in ASCII.</figcaption>
    </figure>
  );
}
