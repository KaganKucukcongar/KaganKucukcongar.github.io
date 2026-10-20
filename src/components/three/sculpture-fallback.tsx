export function SculptureFallback() {
  return (
    <svg
      className="sculpture-fallback"
      viewBox="0 0 600 650"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="chrome"
          x1="170"
          y1="120"
          x2="430"
          y2="530"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F4F1EB" />
          <stop offset=".25" stopColor="#4A5265" />
          <stop offset=".47" stopColor="#DBDEE8" />
          <stop offset=".68" stopColor="#282C38" />
          <stop offset="1" stopColor="#A6ACBA" />
        </linearGradient>
        <linearGradient
          id="violet"
          x1="160"
          y1="80"
          x2="450"
          y2="530"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9276FF" />
          <stop offset="1" stopColor="#454051" />
        </linearGradient>
      </defs>
      <g transform="translate(300 320) rotate(-28)">
        <ellipse
          rx="147"
          ry="224"
          stroke="url(#violet)"
          strokeWidth="12"
          transform="rotate(38)"
        />
        {Array.from({ length: 9 }, (_, i) => (
          <ellipse
            key={i}
            cx={Math.sin(i * 0.47) * 28 - 12}
            cy={(i - 4) * 40}
            rx={125 - Math.abs(i - 4) * 7}
            ry="50"
            stroke="url(#chrome)"
            strokeWidth="16"
          />
        ))}
        <ellipse
          rx="147"
          ry="224"
          stroke="url(#violet)"
          strokeWidth="9"
          transform="rotate(-36)"
          strokeDasharray="470 800"
        />
        <circle cx="117" cy="-100" r="26" fill="#D7FF72" />
        <circle cx="-139" cy="140" r="12" fill="#9276FF" />
      </g>
    </svg>
  );
}
