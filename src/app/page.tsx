import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Award,
  LockKeyhole,
  Sparkles,
  Asterisk,
} from "lucide-react";
import { HeroArt } from "@/components/three/hero-art";
import { Reveal } from "@/components/ui/reveal";
import { ProjectArt } from "@/components/projects/project-art";
import { Contact } from "@/components/sections/contact";
import {
  projects,
  lockedProjects,
  skills,
  interests,
} from "@/content/projects";

export default function Home() {
  return (
    <main id="main">
      <section
        className="container hero"
        id="home"
        aria-labelledby="hero-heading"
      >
        <div className="hero-topline mono">
          <span>
            <i className="status-dot" /> COMPUTER ENGINEERING STUDENT / BUILDER
          </span>
          <span className="hero-edition">
            AN EXPLORATION IN CODE & CURIOSITY
          </span>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <h1 id="hero-heading">
              Building things
              <br />
              that go beyond
              <br />
              <em>ideas.</em>
              <span className="hero-asterisk" aria-hidden="true">
                ✳
              </span>
            </h1>
            <p>
              Hey, I&apos;m Kağan. I&apos;m a computer engineering student
              interested in software, artificial intelligence, and building
              technology that solves real problems.
            </p>
            <p className="hero-extra">
              I&apos;ve built projects and earned regional awards, and I&apos;m
              now strengthening my engineering fundamentals one project at a
              time.
            </p>
            <div className="hero-actions">
              <a className="button button-lime" href="#work">
                Explore my work <ArrowDownRight size={19} />
              </a>
              <a className="text-link" href="#contact">
                Get in touch <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
          <HeroArt />
        </div>
        <div className="hero-baseline mono">
          <span>ALWAYS LEARNING. ALWAYS BUILDING.</span>
          <a href="#about">
            SCROLL TO DISCOVER <ArrowDown size={15} />
          </a>
        </div>
      </section>
      <section
        id="about"
        className="container section about-section"
        aria-labelledby="about-heading"
      >
        <div className="section-label mono">
          <span>01 / A BIT ABOUT ME</span>
          <ArrowDownRight size={19} />
        </div>
        <Reveal className="about-grid">
          <h2 id="about-heading">
            Curious by nature.
            <br />
            <span className="muted">A builder by choice.</span>
          </h2>
          <div className="about-copy">
            <p>
              I&apos;m studying Computer Engineering at Sivas Cumhuriyet
              University in Türkiye. My interest in software started before
              university.
            </p>
            <p>
              I&apos;ve worked on a Turkish programming language for younger
              students and an AI-powered cybersecurity project, both recognized
              with regional TÜBİTAK awards.
            </p>
            <p>
              Today I&apos;m strengthening my computer science foundations while
              exploring software engineering, cloud technologies, and artificial
              intelligence.
            </p>
            <div className="location-line mono">
              <span className="cross" aria-hidden="true">
                +
              </span>{" "}
              SIVAS CUMHURİYET UNIVERSITY · TÜRKİYE
            </div>
          </div>
        </Reveal>
      </section>
      <section
        id="work"
        className="container section work-section"
        aria-labelledby="work-heading"
      >
        <div className="section-label mono">
          <span>02 / SELECTED WORK</span>
          <span>001—002</span>
        </div>
        <Reveal className="section-heading">
          <h2 id="work-heading">
            Real projects.
            <br />
            <span className="muted">Real learning.</span>
          </h2>
          <p>
            From making code more approachable
            <br className="desktop-break" /> to exploring intelligent security.
          </p>
        </Reveal>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.1}>
              <a
                className={`project-card project-${project.slug}`}
                href={`/projects/${project.slug}/`}
              >
                <ProjectArt variant={project.slug} />
                <div className="project-details">
                  <div className="project-meta mono">
                    <span>
                      {project.number} /{" "}
                      {project.slug === "bor"
                        ? "LANGUAGES & EDUCATION"
                        : "AI & CYBERSECURITY"}
                    </span>
                    <ArrowUpRight className="project-arrow" size={24} />
                  </div>
                  <h3>{project.name}</h3>
                  <p>{project.summary}</p>
                  <div className="award-line">
                    <Award size={16} />
                    <span>{project.award}</span>
                  </div>
                  <span className="project-cta">
                    {index === 0 ? "Explore BOR" : "Explore project"}{" "}
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
      <section
        id="next-up"
        className="container section locked-section"
        aria-labelledby="next-heading"
      >
        <div className="section-label mono">
          <span>03 / WHAT&apos;S NEXT</span>
          <span>003—005</span>
        </div>
        <Reveal className="section-heading">
          <h2 id="next-heading">
            Some things are still
            <br />
            <span className="muted">in the making.</span>
          </h2>
          <p>
            Not everything I&apos;m working on is ready to be shared. A few
            ideas are taking shape behind the scenes.
          </p>
        </Reveal>
        <div className="locked-grid">
          {lockedProjects.map((project, index) => (
            <Reveal key={project.number} delay={index * 0.06}>
              <article
                className={`locked-card locked-${project.number}`}
                tabIndex={0}
                aria-labelledby={`locked-${project.number}-title`}
                aria-describedby={`locked-${project.number}-note`}
              >
                <div className="locked-art" aria-hidden="true">
                  <div className="locked-sheet sheet-one" />
                  <div className="locked-sheet sheet-two" />
                  <div className="locked-sheet sheet-three" />
                  <span className="lock-emblem">
                    <LockKeyhole size={23} strokeWidth={1.5} />
                  </span>
                </div>
                <div className="locked-content">
                  <span className="locked-status mono">
                    <span />
                    {project.status}
                  </span>
                  <h3 id={`locked-${project.number}-title`}>
                    Project {project.number}
                  </h3>
                  <p id={`locked-${project.number}-note`}>{project.note}</p>
                  <LockKeyhole
                    className="locked-corner"
                    size={16}
                    aria-hidden="true"
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="locked-footnote">
          <span aria-hidden="true">↳</span> Good things take time. I&apos;ll
          share more when they&apos;re ready.
        </p>
      </section>
      <section
        id="achievements"
        className="container section achievements"
        aria-labelledby="achievements-heading"
      >
        <div className="section-label mono">
          <span>04 / MILESTONES</span>
          <Sparkles size={18} />
        </div>
        <Reveal className="section-heading">
          <h2 id="achievements-heading">
            A little proof
            <br />
            <span className="muted">of the work.</span>
          </h2>
          <p>
            Not the finish line. Just meaningful
            <br className="desktop-break" /> steps along the way.
          </p>
        </Reveal>
        <div className="achievement-list">
          {projects.map((project, index) => (
            <Reveal key={project.slug}>
              <a
                href={`/projects/${project.slug}/`}
                className="achievement-row"
              >
                <span className="achievement-number mono">0{index + 1}</span>
                <span className="rank">
                  {project.rank}
                  <span className="rank-star" aria-hidden="true">
                    ✳
                  </span>
                </span>
                <span className="achievement-info">
                  <span className="mono">
                    REGIONAL {index === 0 ? "FIRST" : "SECOND"} PLACE
                  </span>
                  <strong>TÜBİTAK Kayseri</strong>
                </span>
                <span className="achievement-project">
                  {project.name}
                  <ArrowUpRight size={20} />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
      <section
        id="skills"
        className="container section skills-section"
        aria-labelledby="skills-heading"
      >
        <div className="section-label mono">
          <span>05 / SKILLS & INTERESTS</span>
          <Asterisk size={20} />
        </div>
        <Reveal className="skills-layout">
          <h2 id="skills-heading">
            Code, systems,
            <br />
            and everything
            <br />
            <span className="muted">in between.</span>
          </h2>
          <div className="skills-groups">
            <div>
              <h3 className="mono">
                <span className="status-dot" /> PROJECT-BACKED
              </h3>
              <ul className="skill-tags">
                {skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mono">
                <span className="outline-dot" /> EXPLORING & STRENGTHENING
              </h3>
              <ul className="skill-tags interest-tags">
                {interests.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
            <p className="skills-note">
              Learning by doing. Connecting the dots along the way.
            </p>
          </div>
        </Reveal>
      </section>
      <Contact />
    </main>
  );
}
