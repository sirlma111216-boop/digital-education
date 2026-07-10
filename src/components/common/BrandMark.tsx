/** Anthropic-style radial spike glyph — brand wordmark prefix / content marker. */
export function BrandMark({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
      style={{ display: "block" }}
    >
      <g fill={color}>
        <path d="M16 3 L18 14 L16 16 L14 14 Z" />
        <path d="M16 29 L14 18 L16 16 L18 18 Z" />
        <path d="M3 16 L14 14 L16 16 L14 18 Z" />
        <path d="M29 16 L18 18 L16 16 L18 14 Z" />
        <path d="M6.7 6.7 L15 13 L16 16 L13 15 Z" />
        <path d="M25.3 25.3 L17 19 L16 16 L19 17 Z" />
        <path d="M25.3 6.7 L17 13 L16 16 L19 15 Z" />
        <path d="M6.7 25.3 L15 19 L16 16 L13 17 Z" />
      </g>
    </svg>
  );
}
