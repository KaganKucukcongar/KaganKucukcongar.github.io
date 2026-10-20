import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { Experiment } from "@/components/lab/experiment";
import { Contact } from "@/components/sections/contact";
import { Reveal } from "@/components/ui/reveal";

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((project) => project.slug === slug);
  if (!project) return {};
  return {
    title: project.fullName,
    description: project.summary,
    alternates: { canonical: `/projects/${slug}/` },
    openGraph: {
      title: project.fullName,
      description: project.summary,
      url: `/projects/${slug}/`,
      images: [{ url: "/social.png", width: 1200, height: 630 }],
    },
    twitter: {
      title: project.fullName,
      description: project.summary,
      images: ["/social.png"],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((project) => project.slug === slug);
  if (!project) notFound();
  const next = projects.find((item) => item.slug !== slug)!;
  const language = slug === "bor";
  return (
    <main
      id="main"
      className={`case-study ${language ? "case-language" : "case-signal"}`}
    >
      <div className="container">
        <a className="back-link mono" href="/#work">
          ← BACK TO THE COLLECTION
        </a>
        <section className="case-hero" aria-labelledby="case-heading">
          <span className="case-catalogue mono">
            EXHIBIT {project.number} / {language ? "LANGUAGE" : "SIGNAL"}
          </span>
          <div className="case-identity">
            <h1 id="case-heading">
              {language ? (
                "BOR"
              ) : (
                <>
                  AI-Powered
                  <br />
                  IDS
                </>
              )}
            </h1>
            <div className="case-introduction">
              <h2>
                {language ? (
                  <>
                    Coding,
                    <br />
                    in Turkish.
                  </>
                ) : (
                  <>
                    An inquiry into
                    <br />
                    intelligent detection.
                  </>
                )}
              </h2>
              <p>{project.summary}</p>
              <p className="case-award">{project.award}</p>
            </div>
          </div>
          <div className="case-lab">
            <Experiment
              fixedMode={language ? "language" : "signal"}
              tone={language ? "paper" : "ink"}
            />
            <p className="case-art-note">
              {language
                ? "A typographic interpretation of language and accessibility. The letters are illustrative; no BOR syntax is represented."
                : "A synthetic study of traces and patterns. It does not show attack data, detection results, or model performance."}
            </p>
          </div>
        </section>
        <section className="case-account" aria-labelledby="account-heading">
          <h2 id="account-heading">
            Inside
            <br />
            <span>the project.</span>
          </h2>
          <div className="case-chapters">
            {[
              { label: "The idea", content: project.idea },
              { label: "The challenge", content: project.challenge },
              { label: "The approach", content: project.approach },
              { label: "The outcome", content: project.outcome },
            ].map((chapter, index) => (
              <Reveal
                key={chapter.label}
                className={`case-chapter chapter-${index}`}
              >
                <span className="chapter-index mono">0{index + 1}</span>
                <h3>{chapter.label}</h3>
                <p>{chapter.content}</p>
                {index === 3 && (
                  <span className="outcome-rank" aria-hidden="true">
                    {project.rank}
                  </span>
                )}
              </Reveal>
            ))}
          </div>
        </section>
        <section className="next-exhibit">
          <p className="mono">THE OTHER EXHIBIT</p>
          <a href={`/projects/${next.slug}/`}>
            <span>{next.name}</span>
            <span aria-hidden="true">↗</span>
          </a>
        </section>
      </div>
      <Contact />
    </main>
  );
}
