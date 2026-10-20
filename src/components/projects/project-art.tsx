export function ProjectArt({ variant }: { variant: "bor" | "ai-ids" }) {
  return (
    <div className={`project-art art-${variant}`} aria-hidden="true">
      <span className="art-index mono">
        {variant === "bor" ? "LANGUAGE → POSSIBILITY" : "PATTERNS → AWARENESS"}
      </span>
      {variant === "bor" ? (
        <div className="bor-composition">
          <span className="bor-bracket bracket-left">[</span>
          <span className="bor-type">
            bor<span>.</span>
          </span>
          <span className="bor-bracket bracket-right">]</span>
          <span className="bor-caption mono">A FIRST STEP INTO CODE</span>
        </div>
      ) : (
        <svg viewBox="0 0 600 320" fill="none">
          <g stroke="#9276FF" strokeOpacity=".45">
            <path d="M65 75 220 55 300 160 415 70 535 120M65 75 170 235 300 160 440 255 535 120M220 55 170 235 440 255 415 70M65 75 300 160 535 120" />
            <path
              d="M300 160 290 290M220 55 400 25M170 235 70 285"
              strokeDasharray="4 7"
            />
          </g>
          <circle
            cx="300"
            cy="160"
            r="59"
            stroke="#9276FF"
            strokeOpacity=".3"
          />
          <circle cx="300" cy="160" r="40" fill="#1d2033" stroke="#9276FF" />
          <path
            d="m300 140 17 7v13c0 12-17 21-17 21s-17-9-17-21v-13l17-7Z"
            stroke="#d7ff72"
            strokeWidth="2"
          />
          <path d="m293 158 5 5 9-10" stroke="#d7ff72" strokeWidth="2" />
          {[
            [65, 75],
            [220, 55],
            [415, 70],
            [535, 120],
            [170, 235],
            [440, 255],
          ].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="14" fill="#151923" stroke="#686079" />
              <circle
                cx={x}
                cy={y}
                r="4"
                fill={i === 4 ? "#d7ff72" : "#b19aff"}
              />
            </g>
          ))}
        </svg>
      )}
      <span className="concept-label mono">Conceptual artwork</span>
    </div>
  );
}
