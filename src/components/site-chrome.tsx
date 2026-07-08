import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, X, Bell, User, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { useAppStore, type Role } from "@/lib/store";

const links = [
  { to: "/", label: "হোম" },
  { to: "/properties", label: "বাসা খুঁজুন" },
  { to: "/owners", label: "বাড়ির মালিক" },
  { to: "/services", label: "সেবা" },
  { to: "/about", label: "আমাদের সম্পর্কে" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "যোগাযোগ" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const role = useAppStore((s) => s.role);
  const setRole = useAppStore((s) => s.setRole);
  const unread = useAppStore((s) => s.notifications.filter((n) => !n.read).length);
  const navigate = useNavigate();

  const dashboardTo =
    role === "owner" ? "/dashboard/owner" : role === "admin" ? "/dashboard/admin" : "/dashboard/tenant";

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-surface/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-bold shrink-0">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">বা</span>
          <span className="text-lg tracking-tight text-foreground">বাড়িলাগবে</span>
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
          {role !== "guest" ? (
            <>
              <Link
                to="/notifications"
                className="relative grid h-10 w-10 place-items-center rounded-lg text-muted-foreground hover:bg-muted"
                aria-label="নোটিফিকেশন"
              >
                <Bell className="h-5 w-5" />
                {unread > 0 && (
                  <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
                    {unread}
                  </span>
                )}
              </Link>
              <Link to={dashboardTo} className="grid h-10 w-10 place-items-center rounded-lg text-muted-foreground hover:bg-muted" aria-label="ড্যাশবোর্ড">
                <LayoutDashboard className="h-5 w-5" />
              </Link>
              <Link to="/profile" className="grid h-10 w-10 place-items-center rounded-lg text-muted-foreground hover:bg-muted" aria-label="প্রোফাইল">
                <User className="h-5 w-5" />
              </Link>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="h-9 rounded-lg border border-input bg-surface px-2 text-xs font-medium"
                title="প্রিভিউ ভূমিকা"
              >
                <option value="tenant">ভাড়াটিয়া</option>
                <option value="owner">মালিক</option>
                <option value="admin">অ্যাডমিন</option>
              </select>
              <button
                onClick={() => {
                  setRole("guest");
                  navigate({ to: "/" });
                }}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground hover:bg-muted"
              >
                লগআউট
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="rounded-lg px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted">
                লগইন
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition hover:bg-primary/90"
              >
                রেজিস্টার
              </Link>
            </>
          )}
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
            {role !== "guest" && (
              <>
                <Link to={dashboardTo} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted">
                  ড্যাশবোর্ড
                </Link>
                <Link to="/notifications" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted">
                  নোটিফিকেশন {unread > 0 && `(${unread})`}
                </Link>
                <Link to="/profile" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted">
                  প্রোফাইল
                </Link>
              </>
            )}
            <div className="mt-2 grid grid-cols-2 gap-2">
              {role === "guest" ? (
                <>
                  <Link to="/login" onClick={() => setOpen(false)} className="rounded-lg border border-border px-4 py-2 text-center text-sm font-semibold">
                    লগইন
                  </Link>
                  <Link to="/register" onClick={() => setOpen(false)} className="rounded-lg bg-primary px-4 py-2 text-center text-sm font-semibold text-primary-foreground">
                    রেজিস্টার
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    setRole("guest");
                    setOpen(false);
                    navigate({ to: "/" });
                  }}
                  className="col-span-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold"
                >
                  লগআউট
                </button>
              )}
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
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">বা</span>
            <span className="text-lg">বাড়িলাগবে</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            বাংলাদেশের সবচেয়ে সহজ ভাড়া ব্যবস্থাপনা প্ল্যাটফর্ম। ভাড়াটিয়া, মালিক ও সম্পত্তির জন্য।
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground">কোম্পানি</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary">আমাদের সম্পর্কে</Link></li>
            <li><Link to="/services" className="hover:text-primary">আমাদের সেবা</Link></li>
            <li><Link to="/faq" className="hover:text-primary">সাধারণ প্রশ্ন</Link></li>
            <li><Link to="/contact" className="hover:text-primary">যোগাযোগ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground">সহায়তা</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/properties" className="hover:text-primary">বাসা খুঁজুন</Link></li>
            <li><Link to="/owners/register" className="hover:text-primary">মালিক নিবন্ধন</Link></li>
            <li><Link to="/privacy" className="hover:text-primary">গোপনীয়তা</Link></li>
            <li><Link to="/terms" className="hover:text-primary">শর্তাবলী</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground">যোগাযোগ</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>📞 ০৯৬১১-২৩৪৫৬৭</li>
            <li>✉️ hello@barilagbe.com.bd</li>
            <li>📍 ঢাকা, বাংলাদেশ</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} বাড়িলাগবে। সর্বস্বত্ব সংরক্ষিত।
        </p>
      </div>
    </footer>
  );
}

export function Crumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 pt-4 text-xs text-muted-foreground sm:px-6">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {it.to ? (
              <Link to={it.to} className="hover:text-primary">{it.label}</Link>
            ) : (
              <span className="text-foreground">{it.label}</span>
            )}
            {i < items.length - 1 && <span>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
