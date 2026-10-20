"use client";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/config/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  return (
    <header
      className={`header ${pathname.includes("ai-ids") ? "header-ink" : ""}`}
    >
      <div className="container header-inner">
        <a
          className="lab-mark"
          href="/#home"
          aria-label="The Open Lab, Kağan Küçükçongar, home"
        >
          <span className="lab-mark-symbol" aria-hidden="true">
            [o/l]
          </span>
          <span>
            THE
            <br />
            OPEN LAB
          </span>
        </a>
        <span className="header-byline mono">
          A PERSONAL COLLECTION
          <br />
          BY KAĞAN KÜÇÜKÇONGAR
        </span>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <button
          ref={button}
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <nav
        className={`mobile-nav ${open ? "is-open" : ""}`}
        id="mobile-navigation"
        aria-label="Mobile navigation"
      >
        {navigation.map((item) => (
          <a key={item.label} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
            <span aria-hidden="true">↗</span>
          </a>
        ))}
      </nav>
    </header>
  );
}
