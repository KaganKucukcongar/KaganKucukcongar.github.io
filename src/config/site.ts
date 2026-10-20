export const site = {
  name: "Kağan Küçükçongar",
  role: "Computer Engineering Student",
  university: "Sivas Cumhuriyet University",
  url: "https://kagankucukcongar.github.io",
  description:
    "The Open Lab — projects and experiments by Kağan Küçükçongar, a Computer Engineering student at Sivas Cumhuriyet University. Language, software, AI, and cybersecurity.",
  // Verified against the existing published site. Add other socials only after verification.
  links: {
    github: "https://github.com/KaganKucukcongar",
    email: "mailto:kucukcongarkagan@gmail.com",
  },
} as const;

export const navigation = [
  { label: "Index", href: "/#home" },
  { label: "Exhibits", href: "/#work" },
  { label: "Sealed archive", href: "/#next-up" },
  { label: "Field notes", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;
