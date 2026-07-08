import { createFileRoute, Link } from "@tanstack/react-router";
import { PROPERTIES, OWNERS, TENANTS, APPLICATIONS, VISITS, RENT_PAYMENTS, ADVOCATES, TICKETS, bn, getProperty } from "@/lib/mock-data";
import { useAppStore } from "@/lib/store";
import { useMemo, useState } from "react";
import { Home, Users, Wallet, AlertTriangle, ClipboardList, Scale, CalendarCheck, Download, Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/admin")({
  head: () => ({ meta: [{ title: "অ্যাডমিন ড্যাশবোর্ড — বাড়িলাগবে" }] }),
  component: AdminDash,
});

function AdminDash() {
  const visits = useAppStore((s) => s.visits);
  const [q, setQ] = useState("");

  const cards = [
    { icon: Users, label: "মালিক", value: bn(OWNERS.length) },
    { icon: Users, label: "ভাড়াটিয়া", value: bn(TENANTS.length) },
    { icon: Home, label: "সম্পত্তি", value: bn(PROPERTIES.length) },
    { icon: ClipboardList, label: "আবেদন", value: bn(APPLICATIONS.length) },
    { icon: CalendarCheck, label: "ভিজিট", value: bn(VISITS.length + visits.length) },
    { icon: AlertTriangle, label: "বকেয়া", value: bn(TENANTS.filter((t) => t.rentDueMonths > 0).length) },
  ];

  const overdue = TENANTS.filter((t) => t.rentDueMonths >= 3);

  const exportCsv = (rows: any[], filename: string) => {
    const cols = Object.keys(rows[0] || {});
    const csv = [cols.join(","), ...rows.map((r) => cols.map((c) => JSON.stringify(r[c] ?? "")).join(","))].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a"); a.href = url; a.download = filename; a.click();
    toast.success("এক্সপোর্ট সম্পন্ন");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">অ্যাডমিন ড্যাশবোর্ড</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="সার্চ..." className="h-9 w-48 rounded-lg border border-input bg-surface pl-9 pr-3 text-sm" />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-border bg-surface p-4 shadow-soft">
            <c.icon className="h-5 w-5 text-primary" />
            <div className="mt-2 text-xl font-bold">{c.value}</div>
            <div className="text-xs text-muted-foreground">{c.label}</div>
          </div>
        ))}
      </div>

      <Tabs defaultValue="properties">
        <TabsList className="flex flex-wrap gap-1">
          <TabsTrigger value="properties">সম্পত্তি</TabsTrigger>
          <TabsTrigger value="owners">মালিক</TabsTrigger>
          <TabsTrigger value="tenants">ভাড়াটিয়া</TabsTrigger>
          <TabsTrigger value="applications">আবেদন</TabsTrigger>
          <TabsTrigger value="rent">ভাড়া</TabsTrigger>
          <TabsTrigger value="legal">আইনি</TabsTrigger>
          <TabsTrigger value="advocates">অ্যাডভোকেট</TabsTrigger>
          <TabsTrigger value="tickets">টিকেট</TabsTrigger>
        </TabsList>

        <TabsContent value="properties">
          <TableCard title="সম্পত্তি তালিকা" onExport={() => exportCsv(PROPERTIES, "properties.csv")}>
            <Table headers={["শিরোনাম", "ঠিকানা", "ভাড়া", "অবস্থা"]} rows={PROPERTIES.filter((p) => !q || p.title.includes(q) || p.address.includes(q)).slice(0, 15).map((p) => [
              <Link to="/properties/$id" params={{ id: p.id }} className="text-primary hover:underline">{p.title}</Link>,
              p.address, "৳" + bn(p.rent.toLocaleString("en-US")), p.available ? "ফাঁকা" : "ভাড়া হয়েছে",
            ])} />
          </TableCard>
        </TabsContent>

        <TabsContent value="owners">
          <TableCard title="মালিক তালিকা" onExport={() => exportCsv(OWNERS, "owners.csv")}>
            <Table headers={["নাম", "ফোন", "সম্পত্তি", "ব্যাংক"]} rows={OWNERS.filter((o) => !q || o.name.includes(q)).map((o) => [o.name, o.phone, bn(o.propertyIds.length), o.bank])} />
          </TableCard>
        </TabsContent>

        <TabsContent value="tenants">
          <TableCard title="ভাড়াটিয়া তালিকা" onExport={() => exportCsv(TENANTS, "tenants.csv")}>
            <Table headers={["নাম", "ফোন", "পেশা", "আয়", "বকেয়া"]} rows={TENANTS.filter((t) => !q || t.name.includes(q)).slice(0, 20).map((t) => [t.name, t.phone, t.occupation, "৳" + bn(t.monthlyIncome.toLocaleString("en-US")), t.rentDueMonths > 0 ? bn(t.rentDueMonths) + " মাস" : "-"])} />
          </TableCard>
        </TabsContent>

        <TabsContent value="applications">
          <TableCard title="আবেদন" onExport={() => exportCsv(APPLICATIONS, "applications.csv")}>
            <Table headers={["ভাড়াটিয়া", "সম্পত্তি", "আয়", "অবস্থা"]} rows={APPLICATIONS.map((a) => {
              const t = TENANTS.find((x) => x.id === a.tenantId);
              const p = getProperty(a.propertyId);
              return [t?.name, p?.title, "৳" + bn(a.monthlyIncome.toLocaleString("en-US")), a.status];
            })} />
          </TableCard>
        </TabsContent>

        <TabsContent value="rent">
          <TableCard title="ভাড়া সংগ্রহ" onExport={() => exportCsv(RENT_PAYMENTS, "rent.csv")}>
            <Table headers={["মাস", "ভাড়াটিয়া", "পরিমাণ", "অবস্থা"]} rows={RENT_PAYMENTS.slice(0, 25).map((r) => {
              const t = TENANTS.find((x) => x.id === r.tenantId);
              return [r.month, t?.name, "৳" + bn(r.amount.toLocaleString("en-US")), r.status];
            })} />
          </TableCard>
        </TabsContent>

        <TabsContent value="legal">
          <TableCard title="বকেয়া ও আইনি নোটিশ">
            {overdue.length === 0 ? <p className="p-6 text-sm text-muted-foreground">কোনো বকেয়া নেই</p> : (
              <Table headers={["ভাড়াটিয়া", "বকেয়া মাস", "ফোন", "পদক্ষেপ"]} rows={overdue.map((t) => [
                t.name, bn(t.rentDueMonths) + " মাস", t.phone,
                <Link to="/legal/$tenantId" params={{ tenantId: t.id }} className="rounded-lg bg-destructive px-3 py-1 text-xs font-semibold text-destructive-foreground">নোটিশ তৈরি</Link>,
              ])} />
            )}
          </TableCard>
        </TabsContent>

        <TabsContent value="advocates">
          <TableCard title="অ্যাডভোকেট">
            <Table headers={["নাম", "শহর", "বিশেষজ্ঞতা", "রেটিং"]} rows={ADVOCATES.map((a) => [a.name, a.city, a.specialty, "⭐ " + a.rating.toFixed(1)])} />
          </TableCard>
        </TabsContent>

        <TabsContent value="tickets">
          <TableCard title="সাপোর্ট টিকেট">
            <Table headers={["বিষয়", "থেকে", "অবস্থা", "তারিখ"]} rows={TICKETS.map((t) => [t.subject, t.from, t.status, new Date(t.createdAt).toLocaleDateString("bn-BD")])} />
          </TableCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TableCard({ title, children, onExport }: { title: string; children: React.ReactNode; onExport?: () => void }) {
  return (
    <div className="mt-3 rounded-2xl border border-border bg-surface shadow-soft">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <h3 className="font-bold">{title}</h3>
        {onExport && <button onClick={onExport} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold hover:bg-muted"><Download className="h-3.5 w-3.5" /> CSV</button>}
      </div>
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}
function Table({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  return (
    <table className="w-full text-sm">
      <thead className="bg-muted text-xs uppercase text-muted-foreground">
        <tr>{headers.map((h) => <th key={h} className="px-4 py-2 text-left">{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className="border-t border-border">
            {r.map((c, j) => <td key={j} className="px-4 py-3">{c}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
