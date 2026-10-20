export const site = {
  name: "Kağan Küçükçongar",
  role: "Computer Engineering Student",
  university: "Sivas Cumhuriyet University",
  url: "https://kagankucukcongar.github.io",
  description:
    "Kağan Küçükçongar — computer engineering student exploring software, artificial intelligence, and technology that solves real problems.",
  // Verified against the existing published site. Add other socials only after verification.
  links: {
    github: "https://github.com/KaganKucukcongar",
    email: "mailto:kucukcongarkagan@gmail.com",
  },
} as const;

export const navigation = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "Next Up", href: "/#next-up" },
  { label: "Achievements", href: "/#achievements" },
  { label: "Contact", href: "/#contact" },
] as const;
