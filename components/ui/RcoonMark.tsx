import Image from "next/image";

export function RcoonMark({ size = 24 }: { size?: number }) {
  return (
    <Image
      src="/about-raccoon.gif"
      alt="R/COON"
      width={size}
      height={size}
      unoptimized
      style={{ display: "inline-block", verticalAlign: "middle" }}
    />
  );
}
