import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { PageShell, Crumbs } from "@/components/site-chrome";
import { TENANTS, ADVOCATES, getProperty, bn } from "@/lib/mock-data";
import { AlertTriangle, Download, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/legal/$tenantId")({
  loader: ({ params }) => {
    const t = TENANTS.find((x) => x.id === params.tenantId);
    if (!t) throw notFound();
    return t;
  },
  head: () => ({ meta: [{ title: "আইনি নোটিশ — বাড়িলাগবে" }] }),
  component: LegalPage,
  notFoundComponent: () => <div className="p-8">পাওয়া যায়নি</div>,
});

function LegalPage() {
  const t = Route.useLoaderData();
  const property = t.propertyId ? getProperty(t.propertyId) : undefined;
  const [advocate, setAdvocate] = useState("");
  const [generated, setGenerated] = useState(false);

  const generate = () => {
    const notice = `আইনি নোটিশ\n\nপ্রাপক: ${t.name}\nফোন: ${t.phone}\nসম্পত্তি: ${property?.title ?? ""}\nবকেয়া: ${bn(t.rentDueMonths)} মাস\n\nআপনার নামে ${bn(t.rentDueMonths)} মাসের ভাড়া বকেয়া রয়েছে। ৭ দিনের মধ্যে পরিশোধের অনুরোধ জানানো হচ্ছে।\n\nবাড়িলাগবে টিম`;
    const url = URL.createObjectURL(new Blob([notice], { type: "text/plain" }));
    const a = document.createElement("a"); a.href = url; a.download = `notice-${t.id}.txt`; a.click();
    setGenerated(true);
    toast.success("নোটিশ ডাউনলোড হয়েছে");
  };

  return (
    <PageShell>
      <Crumbs items={[{ label: "হোম", to: "/" }, { label: "অ্যাডমিন", to: "/dashboard/admin" }, { label: "আইনি" }]} />
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="rounded-2xl border-2 border-destructive/40 bg-destructive/5 p-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-destructive" />
            <div>
              <h1 className="text-xl font-bold text-destructive">বকেয়া সতর্কতা</h1>
              <p className="text-sm text-muted-foreground">{t.name} — {bn(t.rentDueMonths)} মাসের ভাড়া বকেয়া</p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
            <h2 className="font-bold">টাইমলাইন</h2>
            <ol className="mt-4 space-y-4">
              {[
                { title: "প্রথম রিমাইন্ডার পাঠানো", date: "১ মাস আগে", done: true },
                { title: "দ্বিতীয় রিমাইন্ডার", date: "২ মাস আগে", done: true },
                { title: "চূড়ান্ত সতর্কতা", date: "৩ মাস আগে", done: true },
                { title: "আইনি নোটিশ", date: "আজ", done: generated },
                { title: "অ্যাডভোকেট নিযুক্ত", date: "পেন্ডিং", done: !!advocate },
              ].map((s, i) => (
                <li key={i} className="flex gap-3">
                  <div className={`mt-0.5 grid h-6 w-6 place-items-center rounded-full ${s.done ? "bg-secondary text-secondary-foreground" : "border border-border bg-surface"}`}>
                    {s.done && <CheckCircle2 className="h-4 w-4" />}
                  </div>
                  <div>
                    <div className="font-semibold">{s.title}</div>
                    <div className="text-xs text-muted-foreground">{s.date}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <aside className="space-y-4">
            <div className="rounded-2xl border border-border bg-surface p-5 shadow-soft">
              <h3 className="font-bold">আইনি নোটিশ তৈরি</h3>
              <p className="mt-1 text-xs text-muted-foreground">অফিসিয়াল নোটিশ ডকুমেন্ট ডাউনলোড করুন।</p>
              <Button onClick={generate} className="mt-3 w-full"><Download className="h-4 w-4" /> নোটিশ ডাউনলোড</Button>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-5 shadow-soft">
              <h3 className="font-bold">অ্যাডভোকেট নিয়োগ</h3>
              <select value={advocate} onChange={(e) => { setAdvocate(e.target.value); if (e.target.value) toast.success("অ্যাডভোকেট নিযুক্ত"); }} className="mt-3 h-10 w-full rounded-lg border border-input bg-surface px-2 text-sm">
                <option value="">— নির্বাচন করুন —</option>
                {ADVOCATES.map((a) => <option key={a.id} value={a.id}>{a.name} ({a.city})</option>)}
              </select>
              {advocate && <p className="mt-2 text-xs text-secondary">✓ নিযুক্ত: {ADVOCATES.find((a) => a.id === advocate)?.name}</p>}
            </div>
          </aside>
        </div>
      </div>
    </PageShell>
  );
}
