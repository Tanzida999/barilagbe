import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Crumbs } from "@/components/site-chrome";
import { ShieldCheck, UserCheck, Scale, Wallet, CalendarCheck, Headphones } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({ meta: [{ title: "সেবা — বাড়িলাগবে" }] }),
  component: ServicesPage,
});

const items = [
  { icon: ShieldCheck, title: "সম্পত্তি যাচাই", desc: "প্রতিটি বাসা সরেজমিনে পরিদর্শন করা হয়।" },
  { icon: UserCheck, title: "ভাড়াটিয়া যাচাই", desc: "এনআইডি, রেফারেন্স ও আয় যাচাই।" },
  { icon: CalendarCheck, title: "বাসা ভিজিট", desc: "আমাদের এজেন্ট আপনাকে সঙ্গে যান।" },
  { icon: Scale, title: "চুক্তি ও আইনি সহায়তা", desc: "আইনসম্মত চুক্তিপত্র ও প্রয়োজনে অ্যাডভোকেট।" },
  { icon: Wallet, title: "মাসিক ভাড়া সংগ্রহ", desc: "প্রতি মাসে ভাড়া সংগ্রহ ও মালিকের অ্যাকাউন্টে জমা।" },
  { icon: Headphones, title: "২৪/৭ সহায়তা", desc: "যেকোনো সমস্যায় দ্রুত সাপোর্ট।" },
];

function ServicesPage() {
  return (
    <PageShell>
      <Crumbs items={[{ label: "হোম", to: "/" }, { label: "সেবা" }]} />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="text-4xl font-bold">আমাদের সেবা</h1>
        <p className="mt-3 text-muted-foreground">সম্পত্তি ভাড়ার সম্পূর্ণ যাত্রায় আপনার পাশে।</p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div key={it.title} className="card-lift rounded-2xl border border-border bg-surface p-6 shadow-soft">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary"><it.icon className="h-6 w-6" /></div>
              <h3 className="mt-4 font-bold">{it.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
