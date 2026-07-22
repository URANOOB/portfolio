export function UranoMark({ size = 24 }: { size?: number }) {
  return (
    <span aria-hidden="true" className="urano-mark" style={{ width: size, height: size }}>
      <span />
    </span>
  );
}
