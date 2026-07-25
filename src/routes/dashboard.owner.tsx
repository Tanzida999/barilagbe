import { createFileRoute, Link } from "@tanstack/react-router";
import { PROPERTIES, TENANTS, RENT_PAYMENTS, BUILDINGS, unitsOfBuilding, bn, getProperty } from "@/lib/mock-data";

import { useAppStore } from "@/lib/store";
import { Home, Users, Wallet, AlertCircle, CalendarCheck, TrendingUp } from "lucide-react";
import { EmptyState } from "@/components/empty-state";

export const Route = createFileRoute("/dashboard/owner")({
  head: () => ({ meta: [{ title: "মালিক ড্যাশবোর্ড — বাড়িলাগবে" }] }),
  component: OwnerDash,
});

function OwnerDash() {
  const visits = useAppStore((s) => s.visits);
  // Show first owner's data as demo
  const ownerId = "own-1";
  const props = PROPERTIES.filter((p) => p.ownerId === ownerId);
  const occupied = props.filter((p) => !p.available).length;
  const vacant = props.filter((p) => p.available).length;
  const income = props.reduce((sum, p) => sum + (p.available ? 0 : p.rent), 0);
  const pending = RENT_PAYMENTS.filter((r) => props.some((p) => p.id === r.propertyId) && r.status !== "paid").length;
  const visitReq = visits.length;

  const cards = [
    { icon: Home, label: "মোট সম্পত্তি", value: bn(props.length), tone: "primary" },
    { icon: Users, label: "ভাড়া হয়েছে", value: bn(occupied), tone: "secondary" },
    { icon: Home, label: "ফাঁকা", value: bn(vacant), tone: "accent" },
    { icon: Wallet, label: "মাসিক আয়", value: `৳${bn(income.toLocaleString("en-US"))}`, tone: "primary" },
    { icon: AlertCircle, label: "বকেয়া ভাড়া", value: bn(pending), tone: "destructive" },
    { icon: CalendarCheck, label: "ভিজিট রিকোয়েস্ট", value: bn(visitReq), tone: "secondary" },
  ];

  const myBuildings = BUILDINGS.filter((b) => b.ownerId === ownerId).map((b) => {
    const units = unitsOfBuilding(b.id);
    const rentedUnits = units.filter((u) => !u.available);
    const vacantUnits = units.filter((u) => u.available);
    return {
      ...b,
      total: units.length,
      rented: rentedUnits.length,
      vacant: vacantUnits.length,
      income: rentedUnits.reduce((s, u) => s + u.rent, 0),
      loss: vacantUnits.reduce((s, u) => s + u.rent, 0),
    };
  });

  const months = ["জানু", "ফেব্রু", "মার্চ", "এপ্রি", "মে", "জুন", "জুল"];
  const chart = [12, 18, 22, 25, 30, 28, 35];


  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">মালিক ড্যাশবোর্ড</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <div key={c.label} className="card-lift rounded-2xl border border-border bg-surface p-5 shadow-soft">
            <div className={`grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary`}><c.icon className="h-5 w-5" /></div>
            <div className="mt-3 text-2xl font-bold">{c.value}</div>
            <div className="text-xs text-muted-foreground">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">ভবনভিত্তিক আয় ও ক্ষতি</h2>
          <TrendingUp className="h-5 w-5 text-primary" />
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          <span className="mr-3"><span className="mr-1 inline-block h-2 w-2 rounded-full bg-secondary" />আদায় হওয়া ভাড়া</span>
          <span><span className="mr-1 inline-block h-2 w-2 rounded-full bg-destructive" />ফাঁকা ইউনিটের ক্ষতি</span>
        </p>
        {myBuildings.length === 0 ? <EmptyState title="কোনো ভবন নেই" /> : (
          <div className="mt-5 space-y-4">
            {myBuildings.map((b) => {
              const max = Math.max(1, ...myBuildings.map((x) => x.income + x.loss));
              return (
                <div key={b.id}>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                    <span className="font-semibold">{b.name} <span className="text-xs font-normal text-muted-foreground">— {b.area}, {b.thana}</span></span>
                    <span className="text-xs">
                      <span className="text-secondary">আয় ৳{bn(b.income.toLocaleString("en-US"))}</span>
                      <span className="mx-1 text-muted-foreground">/</span>
                      <span className="text-destructive">ক্ষতি ৳{bn(b.loss.toLocaleString("en-US"))}</span>
                    </span>
                  </div>
                  <div className="mt-1.5 flex h-4 overflow-hidden rounded-full bg-muted">
                    <div className="bg-secondary transition-all" style={{ width: `${(b.income / max) * 100}%` }} title="আদায়" />
                    <div className="bg-destructive/70 transition-all" style={{ width: `${(b.loss / max) * 100}%` }} title="ক্ষতি" />
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    ইউনিট {bn(b.total)} · ভাড়া হয়েছে {bn(b.rented)} · ফাঁকা {bn(b.vacant)} · {bn(b.floors)} তলা
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">মাসিক আয় (৭ মাস)</h2>
          <TrendingUp className="h-5 w-5 text-primary" />
        </div>
        <div className="mt-4 flex h-40 items-end gap-3">
          {chart.map((v, i) => (
            <div key={i} className="flex-1 text-center">
              <div className="mx-auto w-full rounded-t bg-primary transition-all hover:bg-primary/80" style={{ height: `${v * 3}px` }} />
              <div className="mt-2 text-xs text-muted-foreground">{months[i]}</div>
            </div>
          ))}
        </div>
      </div>


      <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">সম্পত্তির তালিকা</h2>
          <Link to="/properties" className="text-sm text-primary hover:underline">সব দেখুন</Link>
        </div>
        {props.length === 0 ? <EmptyState title="কোনো সম্পত্তি নেই" /> : (
          <div className="mt-4 overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted text-xs uppercase text-muted-foreground">
                <tr><th className="px-4 py-2 text-left">সম্পত্তি</th><th className="px-4 py-2 text-left">ভাড়া</th><th className="px-4 py-2 text-left">অবস্থা</th></tr>
              </thead>
              <tbody>
                {props.map((p) => (
                  <tr key={p.id} className="border-t border-border">
                    <td className="px-4 py-3"><Link to="/properties/$id" params={{ id: p.id }} className="font-medium hover:text-primary">{p.title}</Link><div className="text-xs text-muted-foreground">{p.address}</div></td>
                    <td className="px-4 py-3">৳{bn(p.rent.toLocaleString("en-US"))}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${p.available ? "bg-accent/20 text-accent-foreground" : "bg-secondary/20 text-secondary"}`}>{p.available ? "ফাঁকা" : "ভাড়া হয়েছে"}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
