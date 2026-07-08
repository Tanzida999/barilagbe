import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Crumbs } from "@/components/site-chrome";
import { useAppStore } from "@/lib/store";
import { Bell, Check, CheckCheck } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { useState } from "react";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "নোটিফিকেশন — বাড়িলাগবে" }] }),
  component: NotificationsPage,
});

const typeLabels: Record<string, string> = {
  rent_due: "ভাড়া", visit_approved: "ভিজিট", application_submitted: "আবেদন", application_approved: "আবেদন", legal_notice: "আইনি", document_verified: "ডকুমেন্ট",
};

function NotificationsPage() {
  const notifications = useAppStore((s) => s.notifications);
  const markRead = useAppStore((s) => s.markRead);
  const markAllRead = useAppStore((s) => s.markAllRead);
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? notifications : notifications.filter((n) => n.type === filter);
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <PageShell>
      <Crumbs items={[{ label: "হোম", to: "/" }, { label: "নোটিফিকেশন" }]} />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">নোটিফিকেশন {unread > 0 && <span className="ml-2 rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground">{unread}</span>}</h1>
          <button onClick={markAllRead} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold hover:bg-muted"><CheckCheck className="h-3.5 w-3.5" /> সব পড়া হিসাবে</button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {["all", "rent_due", "visit_approved", "application_approved", "legal_notice", "document_verified"].map((t) => (
            <button key={t} onClick={() => setFilter(t)} className={`rounded-full px-3 py-1 text-xs font-semibold ${filter === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-primary-soft"}`}>
              {t === "all" ? "সব" : typeLabels[t] ?? t}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-2">
          {filtered.length === 0 ? <EmptyState icon={Bell} title="কোনো নোটিফিকেশন নেই" /> : filtered.map((n) => (
            <div key={n.id} className={`rounded-xl border border-border p-4 ${n.read ? "bg-surface" : "bg-primary-soft"}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold text-primary">{typeLabels[n.type]}</span>
                    <h3 className="font-semibold">{n.title}</h3>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{n.message}</p>
                  <div className="mt-1 text-xs text-muted-foreground">{new Date(n.createdAt).toLocaleString("bn-BD")}</div>
                  {n.link && <Link to={n.link as any} className="mt-2 inline-block text-xs font-semibold text-primary hover:underline">বিস্তারিত →</Link>}
                </div>
                {!n.read && <button onClick={() => markRead(n.id)} className="grid h-8 w-8 place-items-center rounded-lg hover:bg-muted"><Check className="h-4 w-4" /></button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
