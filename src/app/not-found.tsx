import Link from "next/link";
import { ArrowLeft } from "lucide-react";
export default function NotFound() {
  return (
    <main id="main" className="container not-found">
      <span className="mono">404 / A SMALL DETOUR</span>
      <h1>
        This page is
        <br />
        <span className="muted">off the map.</span>
      </h1>
      <p>Let&apos;s get you back to the work.</p>
      <Link className="button button-lime" href="/">
        <ArrowLeft size={18} /> Back home
      </Link>
    </main>
  );
}
