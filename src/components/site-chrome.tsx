import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/", label: "হোম" },
  { to: "/properties", label: "ভাড়া বাসা" },
  { to: "/owners", label: "বাড়ির মালিক" },
  { to: "/services", label: "আমাদের সেবা" },
  { to: "/contact", label: "যোগাযোগ" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-surface/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            বা
          </span>
          <span className="text-lg tracking-tight text-foreground">বাড়িবন্ধু</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary-soft hover:text-primary"
              activeProps={{ className: "text-primary bg-primary-soft" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            to="/login"
            className="rounded-lg px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted"
          >
            লগইন
          </Link>
          <Link
            to="/register"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition hover:bg-primary/90"
          >
            রেজিস্টার
          </Link>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-lg border border-border lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-surface lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-border px-4 py-2 text-center text-sm font-semibold"
              >
                লগইন
              </Link>
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-primary px-4 py-2 text-center text-sm font-semibold text-primary-foreground"
              >
                রেজিস্টার
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              বা
            </span>
            <span className="text-lg">বাড়িবন্ধু</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            বাংলাদেশের সবচেয়ে সহজ ভাড়া ব্যবস্থাপনা প্ল্যাটফর্ম। ভাড়াটিয়া, মালিক ও
            সম্পত্তির জন্য।
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground">কোম্পানি</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary">আমাদের সম্পর্কে</Link></li>
            <li><Link to="/services" className="hover:text-primary">আমাদের সেবা</Link></li>
            <li><Link to="/contact" className="hover:text-primary">যোগাযোগ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground">সহায়তা</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/privacy" className="hover:text-primary">গোপনীয়তা</Link></li>
            <li><Link to="/terms" className="hover:text-primary">শর্তাবলী</Link></li>
            <li><a href="#" className="hover:text-primary">সাহায্য কেন্দ্র</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground">যোগাযোগ</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>📞 ০৯৬১১-২৩৪৫৬৭</li>
            <li>✉️ hello@baribondhu.com.bd</li>
            <li>📍 ঢাকা, বাংলাদেশ</li>
            <li className="flex gap-3 pt-2">
              <a href="#" className="hover:text-primary">Facebook</a>
              <a href="#" className="hover:text-secondary">WhatsApp</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} বাড়িবন্ধু। সর্বস্বত্ব সংরক্ষিত।
        </p>
      </div>
    </footer>
  );
}
