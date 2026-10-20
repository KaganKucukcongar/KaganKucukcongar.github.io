"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { FieldVisual } from "./field-visual";

type Mode = "language" | "signal";
export function Experiment({
  initialMode = "language",
  fixedMode,
  tone = "ink",
}: {
  initialMode?: Mode;
  fixedMode?: Mode;
  tone?: "paper" | "ink";
}) {
  const [mode, setMode] = useState<Mode>(fixedMode ?? initialMode);
  const [position, setPosition] = useState(50);
  const [vertical, setVertical] = useState(0);
  const [time, setTime] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [automatic, setAutomatic] = useState(false);
  const [paused, setPaused] = useState(false);
  const [requested, setRequested] = useState(false);
  const [visible, setVisible] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const languageTab = useRef<HTMLButtonElement>(null);
  const signalTab = useRef<HTMLButtonElement>(null);
  const phase = useRef(0);
  const id = useId();
  const running = !reduced && !paused && (automatic || requested) && visible;

  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = matchMedia("(min-width: 768px)");
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    const update = () => {
      setReduced(preference.matches);
      setAutomatic(desktop.matches && !connection?.saveData);
    };
    update();
    preference.addEventListener("change", update);
    desktop.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting && !document.hidden),
    );
    if (root.current) observer.observe(root.current);
    const onVisibility = () =>
      setVisible(
        !document.hidden &&
          Boolean(
            root.current &&
            root.current.getBoundingClientRect().bottom > 0 &&
            root.current.getBoundingClientRect().top < innerHeight,
          ),
      );
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", update);
      desktop.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    if (!running) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      if (now - last >= 40) {
        phase.current += Math.min((now - last) / 1000, 0.1);
        last = now;
        setTime(phase.current);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running]);

  function switchWithKeyboard(event: KeyboardEvent<HTMLButtonElement>) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next =
      event.key === "Home"
        ? "language"
        : event.key === "End"
          ? "signal"
          : mode === "language"
            ? "signal"
            : "language";
    setMode(next);
    (next === "language" ? languageTab : signalTab).current?.focus();
  }
  function inspect(event: PointerEvent<HTMLDivElement>) {
    if (
      event.pointerType === "touch" &&
      !event.currentTarget.hasPointerCapture(event.pointerId)
    )
      return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setPosition(
      Math.max(
        0,
        Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100),
      ),
    );
    setVertical(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
  }

  return (
    <div
      ref={root}
      className={`experiment experiment-${tone}`}
      data-mode={mode}
      data-motion={reduced ? "reduced" : running ? "running" : "paused"}
    >
      <div className="experiment-toolbar">
        {!fixedMode ? (
          <div role="tablist" aria-label="Visual study" className="study-tabs">
            <button
              ref={languageTab}
              id={`${id}-language`}
              role="tab"
              aria-selected={mode === "language"}
              aria-controls={`${id}-field`}
              tabIndex={mode === "language" ? 0 : -1}
              onKeyDown={switchWithKeyboard}
              onClick={() => setMode("language")}
            >
              <span>01 /</span> LANGUAGE
            </button>
            <button
              ref={signalTab}
              id={`${id}-signal`}
              role="tab"
              aria-selected={mode === "signal"}
              aria-controls={`${id}-field`}
              tabIndex={mode === "signal" ? 0 : -1}
              onKeyDown={switchWithKeyboard}
              onClick={() => setMode("signal")}
            >
              <span>02 /</span> SIGNAL
            </button>
          </div>
        ) : (
          <span className="fixed-study mono">
            {mode === "language" ? "LETTER STUDY" : "SIGNAL STUDY"}
          </span>
        )}
        <button
          className="motion-control mono"
          type="button"
          disabled={reduced}
          onClick={() => {
            if (running) setPaused(true);
            else {
              setRequested(true);
              setPaused(false);
            }
          }}
        >
          {reduced
            ? "Motion reduced"
            : running
              ? "Pause study"
              : "Animate study"}
          <span aria-hidden="true">{running ? "Ⅱ" : "+"}</span>
        </button>
      </div>
      <div
        className="experiment-screen"
        id={`${id}-field`}
        role={fixedMode ? "group" : "tabpanel"}
        aria-labelledby={fixedMode ? undefined : `${id}-${mode}`}
        aria-label={fixedMode ? `${mode} visual study` : undefined}
        onPointerMove={inspect}
        onPointerDown={(event) => {
          if (event.pointerType === "touch")
            event.currentTarget.setPointerCapture(event.pointerId);
          inspect(event);
        }}
        onPointerUp={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId))
            event.currentTarget.releasePointerCapture(event.pointerId);
        }}
      >
        <div
          className="experiment-plane"
          data-position={Math.round(position)}
          style={{
            transform: reduced
              ? undefined
              : `perspective(1200px) rotateX(${-vertical * 3}deg) rotateY(${(position - 50) * 0.06}deg)`,
          }}
        >
          <FieldVisual
            mode={mode}
            time={time}
            position={position}
            vertical={vertical}
            tone={tone}
          />
        </div>
        <p className="experiment-description sr-only">
          {mode === "language"
            ? "An arrangement of the letters B, O and R. Changing the inspection axis adjusts their spacing. This is not BOR syntax."
            : "Nine synthetic signal traces. Changing the inspection axis moves the sampling line. These are not live security data or model results."}
        </p>
      </div>
      <div className="experiment-foot">
        <p id={`${id}-note`}>
          {mode === "language"
            ? "Letters, arranged. Not a code sample."
            : "Patterns, observed. Not live security data."}
        </p>
        <label className="axis-control" htmlFor={`${id}-axis`}>
          <span className="mono">INSPECT</span>
          <input
            id={`${id}-axis`}
            type="range"
            min="0"
            max="100"
            value={position}
            aria-label="Inspection axis"
            aria-describedby={`${id}-note`}
            onChange={(event) => setPosition(Number(event.target.value))}
          />
        </label>
      </div>
    </div>
  );
}
