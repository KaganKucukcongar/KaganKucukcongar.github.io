export type Project = {
  slug: "bor" | "ai-ids";
  number: string;
  name: string;
  fullName: string;
  category: string;
  summary: string;
  award: string;
  rank: string;
  idea: string;
  challenge: string;
  approach: string;
  outcome: string;
};

export const projects: Project[] = [
  {
    slug: "bor",
    number: "001",
    name: "BOR",
    fullName: "BOR — Turkish Programming Language",
    category: "Programming Languages / Education Technology",
    summary:
      "A Turkish-language programming project for middle school students taking their first steps into coding.",
    award: "TÜBİTAK Kayseri Regional 1st Place",
    rank: "1st",
    idea: "Make first encounters with programming more approachable for Turkish-speaking younger students.",
    challenge: "Improve accessibility to introductory coding concepts.",
    approach:
      "Develop a Turkish-language programming project focused on learning.",
    outcome: "Regional 1st Place at TÜBİTAK Kayseri.",
  },
  {
    slug: "ai-ids",
    number: "002",
    name: "AI-Powered IDS",
    fullName: "AI-Powered IDS — Intelligent Intrusion Detection",
    category: "Artificial Intelligence / Cybersecurity",
    summary:
      "An intrusion detection project exploring how AI can help identify suspicious security activity.",
    award: "TÜBİTAK Kayseri Regional 2nd Place",
    rank: "2nd",
    idea: "Explore artificial intelligence in intrusion detection.",
    challenge: "Investigate identifying suspicious security activity.",
    approach: "Develop an intrusion detection project incorporating AI.",
    outcome: "Regional 2nd Place at TÜBİTAK Kayseri.",
  },
];

// No private project data belongs here, in metadata, or in a hidden route.
export const lockedProjects = [
  { number: "03", status: "Currently building" },
  { number: "04", status: "Locked" },
  { number: "05", status: "Exploring" },
] as const;

export const skills = [
  "Programming",
  "Software Development",
  "Artificial Intelligence",
  "Cybersecurity",
  "Problem Solving",
];
export const interests = [
  "Computer Science",
  "Software Engineering",
  "Cloud Engineering",
  "Machine Learning",
  "Product Development",
];
