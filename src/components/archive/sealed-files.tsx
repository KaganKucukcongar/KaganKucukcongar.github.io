"use client";

import type { CSSProperties, PointerEvent } from "react";
import { lockedProjects } from "@/content/projects";

export function SealedFiles() {
  function tilt(event: PointerEvent<HTMLElement>) {
    if (
      event.pointerType !== "mouse" ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--rx",
      `${(-(event.clientY - bounds.top - bounds.height / 2) / bounds.height) * 7}deg`,
    );
    event.currentTarget.style.setProperty(
      "--ry",
      `${((event.clientX - bounds.left - bounds.width / 2) / bounds.width) * 9}deg`,
    );
  }
  return (
    <div className="sealed-files">
      {lockedProjects.map((project, index) => (
        <article
          key={project.number}
          tabIndex={0}
          className={`sealed-file file-${index}`}
          aria-labelledby={`case-${project.number}`}
          aria-describedby={`case-${project.number}-status`}
          onPointerMove={tilt}
          onPointerLeave={(event) => {
            event.currentTarget.style.setProperty("--rx", "0deg");
            event.currentTarget.style.setProperty("--ry", "0deg");
          }}
          style={
            { "--rest": ["-3deg", "2.5deg", "-1.5deg"][index] } as CSSProperties
          }
        >
          <span className="folder-tab mono">
            UNPUBLISHED / {project.number}
          </span>
          <div className="folder-inner">
            <div className="file-top mono">
              <span>THE OPEN LAB</span>
              <span>RESEARCH FILE</span>
            </div>
            <h3 id={`case-${project.number}`}>
              <span>CASE</span> 0{project.number}
            </h3>
            <div className="archive-redaction" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <span className="archive-seal" aria-hidden="true">
              SEALED
              <br />
              <span>NOT FOR RELEASE</span>
            </span>
            <p id={`case-${project.number}-status`}>
              {project.status}
              <span>Details withheld.</span>
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
