import { Experiment } from "@/components/lab/experiment";
import { FieldVisual } from "@/components/lab/field-visual";
import { SealedFiles } from "@/components/archive/sealed-files";
import { Contact } from "@/components/sections/contact";
import { Reveal } from "@/components/ui/reveal";
import { projects, skills, interests } from "@/content/projects";

export default function Home() {
  const [bor, ids] = projects;
  return (
    <main id="main">
      <section
        className="container identity-section"
        id="home"
        aria-labelledby="identity-heading"
      >
        <div className="identity-composition">
          <h1 id="identity-heading">
            <span>KAĞAN</span>
            <span>KÜÇÜKÇONGAR</span>
          </h1>
          <div className="identity-note">
            <p>Computer Engineering Student</p>
            <p>Software / AI / Experiments</p>
            <a href="#work">
              Visit the exhibits <span aria-hidden="true">↓</span>
            </a>
          </div>
          <span className="identity-margin mono">AN OPEN NOTEBOOK, BY ME.</span>
        </div>
        <div className="lab-desk">
          <div className="desk-introduction">
            <h2>
              Language
              <br />& signal.
            </h2>
            <p>
              Two subjects from my work, turned into a small experiment you can
              play with.
            </p>
            <p className="desk-instruction mono">
              SWITCH THE STUDY.
              <br />
              MOVE, DRAG, OR USE THE SLIDER.
            </p>
          </div>
          <Experiment />
        </div>
      </section>

      <section
        id="work"
        className="exhibitions"
        aria-labelledby="collection-heading"
      >
        <div className="container collection-heading">
          <h2 id="collection-heading">
            The public
            <br />
            <span>collection.</span>
          </h2>
          <p>
            Two completed projects.
            <br />A language. A security study.
          </p>
          <span className="collection-count" aria-hidden="true">
            02
          </span>
        </div>
        <article className="container exhibit-bor" aria-labelledby="bor-title">
          <div className="bor-copy">
            <span className="exhibit-number mono">EXHIBIT 001 / LANGUAGE</span>
            <h3 id="bor-title">BOR</h3>
            <p className="exhibit-subtitle">
              Coding,
              <br />
              in Turkish.
            </p>
            <p className="exhibit-description">{bor.summary}</p>
            <p className="exhibit-award">
              TÜBİTAK Kayseri
              <br />
              <strong>Regional 1st Place</strong>
            </p>
            <a className="exhibit-link" href="/projects/bor/">
              Enter the BOR exhibit <span aria-hidden="true">↗</span>
            </a>
          </div>
          <Reveal className="bor-specimen">
            <div className="specimen-corner mono">
              B / O / R<span>TYPE AS A STARTING POINT</span>
            </div>
            <FieldVisual mode="language" position={37} tone="paper" />
            <div className="specimen-caption">
              <span>
                A familiar language.
                <br />A first step into programming.
              </span>
              <small>
                Conceptual typography.
                <br />
                Not a BOR code sample.
              </small>
            </div>
          </Reveal>
        </article>

        <article className="exhibit-signal" aria-labelledby="ids-title">
          <div className="container signal-composition">
            <div className="signal-title">
              <span className="exhibit-number mono">EXHIBIT 002 / SIGNAL</span>
              <h3 id="ids-title">
                AI-Powered
                <br />
                <span>IDS</span>
              </h3>
              <p className="exhibit-subtitle">
                Looking for patterns.
                <br />
                Asking what they mean.
              </p>
            </div>
            <Reveal className="signal-preview">
              <FieldVisual mode="signal" position={65} />
              <span className="mono signal-preview-caption">
                A SYNTHETIC SIGNAL STUDY — NOT LIVE SECURITY DATA
              </span>
            </Reveal>
            <div className="signal-copy">
              <p className="exhibit-description">{ids.summary}</p>
              <p className="exhibit-award">
                TÜBİTAK Kayseri
                <br />
                <strong>Regional 2nd Place</strong>
              </p>
              <a className="exhibit-link" href="/projects/ai-ids/">
                Enter the signal exhibit <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </article>
      </section>

      <section
        id="next-up"
        className="archive-section"
        aria-labelledby="archive-heading"
      >
        <div className="container">
          <div className="archive-heading">
            <h2 id="archive-heading">
              The sealed
              <br />
              <span>archive.</span>
            </h2>
            <p>
              Some things aren&apos;t ready to be shared.
              <br />
              These files stay closed.
            </p>
            <span className="archive-heading-note mono">
              CONTENTS WITHHELD
              <br />
              003—005
            </span>
          </div>
          <SealedFiles />
          <p className="archive-note">
            I&apos;ll open these when there&apos;s something ready to show.
          </p>
        </div>
      </section>

      <section
        className="container field-notes"
        id="about"
        aria-labelledby="notes-heading"
      >
        <Reveal className="notes-title">
          <h2 id="notes-heading">
            Behind
            <br />
            <span>the work.</span>
          </h2>
          <p className="notes-signature">Kağan Küçükçongar.</p>
        </Reveal>
        <div className="notes-body">
          <div className="personal-note">
            <p>
              I&apos;m studying Computer Engineering at Sivas Cumhuriyet
              University in Türkiye.
            </p>
            <p>
              Before university, I worked on a Turkish programming language for
              younger students and an AI-powered cybersecurity project. Now
              I&apos;m spending more time on the fundamentals — and trying
              things as I learn.
            </p>
          </div>
          <div className="practice-columns" id="skills">
            <div>
              <h3>Through projects</h3>
              <ul>
                {skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Currently exploring</h3>
              <ul>
                {interests.map((interest) => (
                  <li key={interest}>{interest}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="recognition-note" id="achievements">
            <h3>Recognition</h3>
            <p>
              <strong>BOR</strong>
              <span>TÜBİTAK Kayseri · Regional 1st Place</span>
            </p>
            <p>
              <strong>AI-Powered IDS</strong>
              <span>TÜBİTAK Kayseri · Regional 2nd Place</span>
            </p>
          </div>
        </div>
      </section>
      <Contact />
    </main>
  );
}
