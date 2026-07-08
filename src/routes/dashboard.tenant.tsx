import { createFileRoute, Link } from "@tanstack/react-router";
import { PROPERTIES, RENT_PAYMENTS, TENANTS, bn, getProperty } from "@/lib/mock-data";
import { useAppStore } from "@/lib/store";
import { Home, Wallet, FileText, LifeBuoy, AlertCircle } from "lucide-react";
import { EmptyState } from "@/components/empty-state";

export const Route = createFileRoute("/dashboard/tenant")({
  head: () => ({ meta: [{ title: "ভাড়াটিয়া ড্যাশবোর্ড — বাড়িলাগবে" }] }),
  component: TenantDash,
});

function TenantDash() {
  const applications = useAppStore((s) => s.applications);
  // Demo tenant with active rental
  const tenant = TENANTS.find((t) => t.propertyId) || TENANTS[0];
  const property = tenant.propertyId ? getProperty(tenant.propertyId) : undefined;
  const payments = RENT_PAYMENTS.filter((r) => r.tenantId === tenant.id);
  const due = payments.filter((p) => p.status !== "paid");
  const paid = payments.filter((p) => p.status === "paid");

  if (!property) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">আমার ড্যাশবোর্ড</h1>
        <EmptyState title="আপনার কোনো সক্রিয় ভাড়া নেই" description="বাসা খুঁজে আবেদন করুন।" action={<Link to="/properties" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">বাসা খুঁজুন</Link>} />
        {applications.length > 0 && (
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="font-bold">আমার আবেদনসমূহ</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {applications.map((a) => (
                <li key={a.id} className="flex justify-between border-b border-border pb-2">
                  <span>{a.propertyId}</span>
                  <span className="text-primary">{a.status}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">আমার ভাড়া</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={Home} label="বর্তমান বাসা" value={property.title} />
        <StatCard icon={Wallet} label="মাসিক ভাড়া" value={`৳${bn(property.rent.toLocaleString("en-US"))}`} />
        <StatCard icon={AlertCircle} label="বকেয়া মাস" value={bn(due.length)} tone={due.length > 0 ? "destructive" : "primary"} />
      </div>

      <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
        <h2 className="font-bold">পেমেন্ট ইতিহাস</h2>
        <div className="mt-4 overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted text-xs uppercase text-muted-foreground">
              <tr><th className="px-4 py-2 text-left">মাস</th><th className="px-4 py-2 text-left">পরিমাণ</th><th className="px-4 py-2 text-left">অবস্থা</th><th className="px-4 py-2 text-left">তারিখ</th></tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{p.month}</td>
                  <td className="px-4 py-3">৳{bn(p.amount.toLocaleString("en-US"))}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${p.status === "paid" ? "bg-secondary/20 text-secondary" : p.status === "overdue" ? "bg-destructive/20 text-destructive" : "bg-accent/20 text-accent-foreground"}`}>
                      {p.status === "paid" ? "পরিশোধিত" : p.status === "overdue" ? "বকেয়া" : "অপেক্ষমাণ"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{p.paidAt ? new Date(p.paidAt).toLocaleDateString("bn-BD") : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <QuickCard icon={FileText} title="চুক্তিপত্র" desc="আপনার ভাড়া চুক্তি ডাউনলোড করুন" action="ডাউনলোড" />
        <QuickCard icon={LifeBuoy} title="সহায়তা" desc="২৪/৭ কাস্টমার সাপোর্ট" action="যোগাযোগ" />
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, tone = "primary" }: { icon: any; label: string; value: string; tone?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-soft">
      <div className={`grid h-10 w-10 place-items-center rounded-xl ${tone === "destructive" ? "bg-destructive/15 text-destructive" : "bg-primary-soft text-primary"}`}><Icon className="h-5 w-5" /></div>
      <div className="mt-3 text-xs text-muted-foreground">{label}</div>
      <div className="text-lg font-bold">{value}</div>
    </div>
  );
}
function QuickCard({ icon: Icon, title, desc, action }: { icon: any; title: string; desc: string; action: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-soft">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary"><Icon className="h-5 w-5" /></div>
      <h3 className="mt-3 font-bold">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
      <button className="mt-3 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90">{action}</button>
    </div>
  );
}
