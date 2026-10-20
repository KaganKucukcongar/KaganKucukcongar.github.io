type FieldProps = {
  mode: "language" | "signal";
  time?: number;
  position?: number;
  vertical?: number;
  tone?: "paper" | "ink";
};

export function FieldVisual({
  mode,
  time = 0,
  position = 50,
  vertical = 0,
  tone = "ink",
}: FieldProps) {
  const light = tone === "paper";
  const foreground = light ? "#191B1B" : "#F0ECE3";
  const grid = light ? "#536B68" : "#B5B7A9";
  const axis = 70 + position * 8.6;
  const sample = (x: number, row: number) => {
    const pulse = Math.exp(-Math.pow((x - axis) / 100, 2));
    return (
      62 +
      row * 38 +
      Math.sin(x * 0.019 + time * 0.7 + row * 0.7) * (7 + pulse * 24) +
      Math.sin(x * 0.067 - time + row) * pulse * 12
    );
  };
  return (
    <svg
      className="field-visual"
      viewBox="0 0 1000 440"
      fill="none"
      aria-hidden="true"
    >
      <g stroke={grid} strokeOpacity={light ? ".19" : ".16"}>
        {[80, 290, 500, 710, 920].map((x) => (
          <path key={x} d={`M${x} 24V416`} />
        ))}
        {[60, 220, 380].map((y) => (
          <path key={y} d={`M30 ${y}H970`} />
        ))}
      </g>
      {mode === "language" ? (
        <>
          <path
            d={`M60 365H940M${axis} 35V405`}
            stroke="#E75B39"
            strokeOpacity=".7"
            strokeDasharray="3 6"
          />
          {["B", "O", "R"].map((letter, i) => {
            const x = 125 + i * 275 + (position - 50) * (i - 1) * 0.6;
            const y =
              352 +
              Math.sin(time * 0.55 + i * 1.8) * 13 +
              vertical * (i - 1) * 12;
            const rotation = [-9, 8, -5][i] + Math.sin(time * 0.3 + i) * 2;
            return (
              <g
                key={letter}
                transform={`translate(${x} ${y}) rotate(${rotation})`}
              >
                {[4, 3, 2, 1].map((depth) => (
                  <text
                    key={depth}
                    className="lab-glyph"
                    x={depth * 8}
                    y={-depth * 6}
                    fill="none"
                    stroke={i === 1 ? "#E75B39" : grid}
                    strokeOpacity={0.13 + depth * 0.05}
                    strokeWidth="1"
                  >
                    {letter}
                  </text>
                ))}
                <text
                  className="lab-glyph"
                  fill={i === 1 ? "#E75B39" : foreground}
                >
                  {letter}
                </text>
              </g>
            );
          })}
          <g stroke={foreground} strokeOpacity=".7">
            <path d="M38 38h15m-7-7v15M948 402h15m-7-7v15" />
          </g>
          <text className="diagram-text" x="38" y="418" fill={grid}>
            LETTER / SPACE / READING
          </text>
        </>
      ) : (
        <>
          {Array.from({ length: 9 }, (_, row) => (
            <g key={row}>
              <path
                d={Array.from({ length: 116 }, (_, point) => {
                  const x = 40 + point * 8;
                  return `${point ? "L" : "M"}${x.toFixed(1)} ${sample(x, row).toFixed(2)}`;
                }).join(" ")}
                stroke={row === 4 ? "#E75B39" : foreground}
                strokeWidth={row === 4 ? "2.5" : "1.2"}
                strokeOpacity={row === 4 ? 1 : 0.22 + row * 0.045}
              />
              <circle
                cx={axis}
                cy={sample(axis, row)}
                r={row === 4 ? "5" : "2.5"}
                fill={row === 4 ? "#E75B39" : foreground}
              />
            </g>
          ))}
          <path
            d={`M${axis} 28V404`}
            stroke="#E75B39"
            strokeDasharray="3 5"
            strokeOpacity=".9"
          />
          <rect x={axis - 26} y="24" width="52" height="16" fill="#E75B39" />
          <text className="diagram-text" x="40" y="418" fill={grid}>
            TRACE / PATTERN / INSPECTION
          </text>
          <text className="diagram-text" x="800" y="418" fill={grid}>
            SYNTHETIC STUDY
          </text>
        </>
      )}
    </svg>
  );
}
