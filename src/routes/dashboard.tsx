import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";
import { useAppStore } from "@/lib/store";
import { LayoutDashboard, Home, Users, ClipboardList, CalendarCheck, Wallet, Scale, FileText, Settings, Bell, LifeBuoy } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "ড্যাশবোর্ড — বাড়িলাগবে" }] }),
  component: DashboardShell,
});

function DashboardShell() {
  const role = useAppStore((s) => s.role);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === "/dashboard") {
      const to = role === "owner" ? "/dashboard/owner" : role === "agent" ? "/dashboard/agent" : role === "admin" ? "/dashboard/admin" : "/dashboard/tenant";
      navigate({ to, replace: true });
    }
  }, [pathname, role]);

  const items = role === "admin" ? [
    { to: "/dashboard/admin", label: "সংক্ষিপ্ত", icon: LayoutDashboard },
    { to: "/visits", label: "ভিজিট", icon: CalendarCheck },
    { to: "/notifications", label: "নোটিফিকেশন", icon: Bell },
    { to: "/profile", label: "প্রোফাইল", icon: Settings },
  ] : role === "agent" ? [
    { to: "/dashboard/agent", label: "সংক্ষিপ্ত", icon: LayoutDashboard },
    { to: "/visits", label: "ভিজিট", icon: CalendarCheck },
    { to: "/notifications", label: "নোটিফিকেশন", icon: Bell },
    { to: "/profile", label: "প্রোফাইল", icon: Settings },
  ] : role === "owner" ? [
    { to: "/dashboard/owner", label: "সংক্ষিপ্ত", icon: LayoutDashboard },
    { to: "/visits", label: "ভিজিট", icon: CalendarCheck },
    { to: "/notifications", label: "নোটিফিকেশন", icon: Bell },
    { to: "/profile", label: "প্রোফাইল", icon: Settings },
  ] : [
    { to: "/dashboard/tenant", label: "সংক্ষিপ্ত", icon: LayoutDashboard },
    { to: "/properties", label: "বাসা খুঁজুন", icon: Home },
    { to: "/notifications", label: "নোটিফিকেশন", icon: Bell },
    { to: "/profile", label: "প্রোফাইল", icon: Settings },
  ];

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <nav className="flex gap-1 overflow-x-auto rounded-2xl border border-border bg-surface p-2 lg:flex-col">
              {items.map((it) => {
                const active = pathname === it.to;
                return (
                  <Link key={it.to} to={it.to} className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium whitespace-nowrap ${active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`}>
                    <it.icon className="h-4 w-4" /> {it.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
          <div className="min-w-0"><Outlet /></div>
        </div>
      </div>
    </PageShell>
  );
}
