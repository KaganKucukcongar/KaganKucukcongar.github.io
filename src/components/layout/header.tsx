"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navigation, site } from "@/config/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="header">
      <div className="container header-inner">
        <Link
          href="/#home"
          className="wordmark"
          aria-label="Kağan Küçükçongar, home"
        >
          kk<span className="wordmark-dot">.</span>
          <span className="wordmark-name">
            KAĞAN
            <br />
            KÜÇÜKÇONGAR
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link key={item.label} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <a className="nav-contact" href={site.links.email}>
          Let&apos;s connect <ArrowUpRight size={15} />
        </a>
        <button
          ref={button}
          className="menu-toggle"
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <nav
        className={`mobile-nav ${open ? "is-open" : ""}`}
        id="mobile-navigation"
        aria-label="Mobile navigation"
      >
        {navigation.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => setOpen(false)}
          >
            {item.label}
            <ArrowUpRight size={18} />
          </Link>
        ))}
      </nav>
    </header>
  );
}
