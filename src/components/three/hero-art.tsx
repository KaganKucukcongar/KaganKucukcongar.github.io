"use client";

import dynamic from "next/dynamic";
import {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Pause, Play } from "lucide-react";
import { SculptureFallback } from "./sculpture-fallback";

const Scene = dynamic(() => import("./sculpture-scene"), { ssr: false });

class SceneBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function HeroArt() {
  const container = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const onReady = useCallback(() => setReady(true), []);
  const onFailure = useCallback(() => setFailed(true), []);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia("(max-width: 767px)");
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const update = () => {
      if (
        motion.matches ||
        small.matches ||
        connection?.saveData ||
        ["slow-2g", "2g"].includes(connection?.effectiveType ?? "") ||
        navigator.hardwareConcurrency <= 2
      ) {
        setEnabled(false);
        return;
      }
      try {
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl2");
        setEnabled(Boolean(gl));
        gl?.getExtension("WEBGL_lose_context")?.loseContext();
      } catch {
        setEnabled(false);
      }
    };
    update();
    motion.addEventListener("change", update);
    small.addEventListener("change", update);
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting && !document.hidden),
      { rootMargin: "80px" },
    );
    if (container.current) observer.observe(container.current);
    const onVisibility = () =>
      setVisible(
        !document.hidden &&
          Boolean(
            container.current &&
            container.current.getBoundingClientRect().bottom > 0,
          ),
      );
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", update);
      small.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const live = enabled && !failed;
  return (
    <div
      ref={container}
      className="hero-art"
      data-scene={live && ready ? "webgl" : "static"}
    >
      <div className="art-corner corner-tl" />
      <div className="art-corner corner-br" />
      <div
        className="sculpture-frame"
        role="img"
        aria-label="Abstract interconnected chrome rings with lime and violet details"
      >
        <div className={`static-art ${live && ready ? "is-hidden" : ""}`}>
          <SculptureFallback />
        </div>
        {live && (
          <div className="canvas-layer" aria-hidden="true">
            <SceneBoundary onFailure={onFailure}>
              <Scene
                paused={paused || !visible}
                onReady={onReady}
                onFailure={onFailure}
              />
            </SceneBoundary>
          </div>
        )}
      </div>
      <span className="art-annotation mono">FIG. 01 — CONNECTED SYSTEMS</span>
      <span className="art-vertical mono">IDEAS BECOME CONNECTIONS</span>
      <div className="art-bottom">
        <span className="mono">
          <i />{" "}
          {live && ready
            ? "Move your cursor to explore"
            : "Connected by curiosity"}
        </span>
        {live && ready && (
          <button
            type="button"
            onClick={() => setPaused(!paused)}
            aria-label={
              paused ? "Play sculpture animation" : "Pause sculpture animation"
            }
          >
            {paused ? <Play size={13} /> : <Pause size={13} />}
          </button>
        )}
      </div>
    </div>
  );
}
