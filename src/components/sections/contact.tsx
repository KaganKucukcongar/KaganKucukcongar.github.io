import { ArrowUpRight, GitFork, Mail } from "lucide-react";
import { site } from "@/config/site";

export function Contact() {
  return (
    <section
      id="contact"
      className="container contact-wrap"
      aria-labelledby="contact-heading"
    >
      <div className="contact-panel">
        <div className="contact-top mono">
          <span>HAVE AN IDEA? SAY HELLO.</span>
          <span>
            LET&apos;S MAKE A CONNECTION <span aria-hidden="true">↗</span>
          </span>
        </div>
        <div className="contact-grid">
          <h2 id="contact-heading">
            Have something
            <br />
            <span>interesting</span> in mind?
          </h2>
          <div>
            <p>
              I&apos;m always open to thoughtful conversations, interesting
              opportunities, and ideas worth building.
            </p>
            <a className="contact-cta" href={site.links.email}>
              Get in touch <ArrowUpRight size={26} />
            </a>
          </div>
        </div>
        <div className="contact-bottom">
          <a href={site.links.github} target="_blank" rel="noopener noreferrer">
            <GitFork size={16} /> GitHub <ArrowUpRight size={14} />
          </a>
          <a href={site.links.email}>
            <Mail size={16} /> Email <ArrowUpRight size={14} />
          </a>
          <span className="mono">ALWAYS LEARNING. ALWAYS BUILDING.</span>
        </div>
      </div>
    </section>
  );
}
