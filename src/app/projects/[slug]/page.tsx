import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Award } from "lucide-react";
import { projects } from "@/content/projects";
import { ProjectArt } from "@/components/projects/project-art";
import { Reveal } from "@/components/ui/reveal";
import { Contact } from "@/components/sections/contact";

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
  return (
    <main id="main" className={`case-study case-${slug}`}>
      <section className="container case-hero">
        <Link className="back-link mono" href="/#work">
          <ArrowLeft size={15} /> BACK TO SELECTED WORK
        </Link>
        <div className="case-eyebrow mono">
          <span>PROJECT {project.number}</span>
          <span>{project.category}</span>
        </div>
        <h1>
          {project.name}
          <span className="case-period">.</span>
        </h1>
        <div className="case-intro">
          <h2>
            {slug === "bor"
              ? "A more approachable first step into code."
              : "Exploring intelligence in intrusion detection."}
          </h2>
          <p>{project.summary}</p>
        </div>
        <div className="case-award">
          <Award size={18} />
          {project.award}
        </div>
        <figure>
          <ProjectArt variant={project.slug} />
          <figcaption className="mono">
            CONCEPTUAL ARTWORK — A VISUAL INTERPRETATION, NOT A PROJECT
            INTERFACE.
          </figcaption>
        </figure>
      </section>
      <section className="container case-story" aria-label="Project case study">
        <div className="case-story-label mono">
          THE THINKING
          <br />
          BEHIND THE PROJECT <span aria-hidden="true">↘</span>
        </div>
        <div className="case-chapters">
          {[
            { label: "The idea", content: project.idea },
            { label: "The challenge", content: project.challenge },
            { label: "The approach", content: project.approach },
            { label: "The outcome", content: project.outcome },
          ].map((chapter, index) => (
            <Reveal key={chapter.label} className="case-chapter">
              <span className="mono">0{index + 1}</span>
              <div>
                <h2>{chapter.label}</h2>
                <p>{chapter.content}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="container next-project">
        <span className="mono">KEEP EXPLORING / NEXT PROJECT</span>
        <Link href={`/projects/${next.slug}/`}>
          <span>{next.name}</span>
          <ArrowUpRight />
        </Link>
      </section>
      <Contact />
    </main>
  );
}
