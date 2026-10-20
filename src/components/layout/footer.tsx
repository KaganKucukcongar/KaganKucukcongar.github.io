import { ArrowUpRight, ArrowUp } from "lucide-react";
import { site } from "@/config/site";

export function Footer() {
  return (
    <footer className="container footer">
      <p>Made with curiosity, code, and a lot of trial and error.</p>
      <div>
        <a href={site.links.github} target="_blank" rel="noopener noreferrer">
          GitHub <ArrowUpRight size={14} />
        </a>
        <a href="/#home" aria-label="Back to top">
          Back to top <ArrowUp size={14} />
        </a>
      </div>
      <span className="footer-name">
        © {new Date().getFullYear()} {site.name}
      </span>
    </footer>
  );
}
