import { site } from "@/config/site";
export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <a href="/#home" className="footer-title">
          {site.name}
          <span aria-hidden="true">↥</span>
        </a>
        <p>
          A personal collection of projects
          <br />
          and experiments by {site.name}.
        </p>
        <span className="mono">
          © {new Date().getFullYear()}
          <br />
          COMPUTER ENGINEERING STUDENT
        </span>
      </div>
    </footer>
  );
}
