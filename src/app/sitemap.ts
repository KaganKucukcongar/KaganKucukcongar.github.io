import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { projects } from "@/content/projects";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/` },
    ...projects.map((project) => ({
      url: `${site.url}/projects/${project.slug}/`,
    })),
  ];
}
