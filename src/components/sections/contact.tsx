import { site } from "@/config/site";
export function Contact() {
  return (
    <section
      className="contact-section"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className="container contact-inner">
        <div>
          <h2 id="contact-heading">
            Leave
            <br />
            <span>a note.</span>
          </h2>
          <p>
            A question, an interesting opportunity,
            <br />
            or an idea worth talking about.
          </p>
        </div>
        <div className="contact-links">
          <a className="contact-cta" href={site.links.email}>
            Email Kağan <span aria-hidden="true">↗</span>
          </a>
          <a href={site.links.github} target="_blank" rel="noopener noreferrer">
            Find me on GitHub <span aria-hidden="true">↗</span>
          </a>
          <span className="mono contact-address">
            kucukcongarkagan@gmail.com
          </span>
        </div>
      </div>
    </section>
  );
}
