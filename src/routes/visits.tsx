import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Crumbs } from "@/components/site-chrome";
import { VISITS, STAFF, getProperty, bn } from "@/lib/mock-data";
import { useAppStore } from "@/lib/store";
import { CalendarCheck, X, Users } from "lucide-react";
import { toast } from "sonner";
import { useMemo, useState } from "react";
import { EmptyState } from "@/components/empty-state";

export const Route = createFileRoute("/visits")({
  head: () => ({ meta: [{ title: "ভিজিট — বাড়িলাগবে" }] }),
  component: VisitsPage,
});

function VisitsPage() {
  const stored = useAppStore((s) => s.visits);
  const updateVisit = useAppStore((s) => s.updateVisit);
  const removeVisit = useAppStore((s) => s.removeVisit);
  const [tab, setTab] = useState<"upcoming" | "completed">("upcoming");

  const all = useMemo(() => [...stored, ...VISITS], [stored]);
  const list = all.filter((v) => v.status === tab);

  return (
    <PageShell>
      <Crumbs items={[{ label: "হোম", to: "/" }, { label: "ভিজিট" }]} />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">ভিজিট ক্যালেন্ডার</h1>
          <div className="flex gap-2">
            <button onClick={() => setTab("upcoming")} className={`rounded-lg px-4 py-2 text-sm font-semibold ${tab === "upcoming" ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"}`}>আসন্ন ({bn(all.filter(v=>v.status==="upcoming").length)})</button>
            <button onClick={() => setTab("completed")} className={`rounded-lg px-4 py-2 text-sm font-semibold ${tab === "completed" ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"}`}>সম্পন্ন ({bn(all.filter(v=>v.status==="completed").length)})</button>
          </div>
        </div>

        <div className="mt-6">
          {list.length === 0 ? <EmptyState icon={CalendarCheck} title="কোনো ভিজিট নেই" /> : (
            <div className="grid gap-3">
              {list.map((v) => {
                const p = getProperty(v.propertyId);
                return (
                  <div key={v.id} className="rounded-2xl border border-border bg-surface p-5 shadow-soft">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="min-w-0">
                        <Link to="/properties/$id" params={{ id: v.propertyId }} className="font-bold hover:text-primary">{p?.title ?? v.propertyId}</Link>
                        <div className="mt-1 text-sm text-muted-foreground">{p?.address}</div>
                        <div className="mt-2 flex flex-wrap gap-3 text-xs">
                          <span>📅 {v.date}</span>
                          <span>🕐 {v.time}</span>
                          <span>👤 {v.visitorName}</span>
                          <span>📞 {v.phone}</span>
                        </div>
                      </div>
                      {v.status === "upcoming" && (
                        <div className="flex flex-wrap gap-2">
                          <select value={v.staffId ?? ""} onChange={(e) => { updateVisit(v.id, { staffId: e.target.value }); toast.success("স্টাফ নিযুক্ত"); }} className="h-9 rounded-lg border border-input bg-surface px-2 text-xs">
                            <option value="">স্টাফ নিযুক্ত করুন</option>
                            {STAFF.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                          </select>
                          <button onClick={() => { const d = window.prompt("নতুন তারিখ (YYYY-MM-DD)", v.date); if (d) { updateVisit(v.id, { date: d }); toast.success("পুনঃনির্ধারিত"); } }} className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold hover:bg-muted">রিশিডিউল</button>
                          <button onClick={() => { if (confirm("বাতিল করবেন?")) { removeVisit(v.id); toast.success("বাতিল হয়েছে"); } }} className="rounded-lg border border-destructive/40 px-3 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive/10"><X className="inline h-3 w-3" /> বাতিল</button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
