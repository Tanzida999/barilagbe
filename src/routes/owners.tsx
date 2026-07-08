import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Crumbs } from "@/components/site-chrome";
import { ShieldCheck, Wallet, Scale, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/owners")({
  head: () => ({ meta: [{ title: "বাড়ির মালিক — বাড়িলাগবে" }] }),
  component: OwnersPage,
});

function OwnersPage() {
  const benefits = [
    { icon: ShieldCheck, title: "যাচাইকৃত ভাড়াটিয়া", desc: "প্রতিটি ভাড়াটিয়া এনআইডি ও রেফারেন্স যাচাই সহ।" },
    { icon: Wallet, title: "নিশ্চিত মাসিক আয়", desc: "আমরা মাসিক ভাড়া সংগ্রহ করে আপনার অ্যাকাউন্টে জমা দিই।" },
    { icon: Scale, title: "সম্পূর্ণ আইনি সহায়তা", desc: "চুক্তি থেকে বকেয়া নোটিশ পর্যন্ত সবকিছু আমাদের।" },
  ];
  return (
    <PageShell>
      <Crumbs items={[{ label: "হোম", to: "/" }, { label: "বাড়ির মালিক" }]} />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="text-4xl font-bold sm:text-5xl">আপনার সম্পত্তি, আমাদের ব্যবস্থাপনা</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              সম্পত্তি ভাড়া দেওয়ার ঝামেলা থেকে মুক্তি পান। আমরা যাচাইকৃত ভাড়াটিয়া খুঁজে দিই, চুক্তি করি, মাসিক ভাড়া সংগ্রহ করি এবং সব আইনি বিষয় দেখি।
            </p>
            <Link to="/owners/register" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              নিবন্ধন শুরু করুন <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4">
            {benefits.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card-lift rounded-2xl border border-border bg-surface p-6 shadow-soft">
                <div className="flex items-start gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary"><Icon className="h-5 w-5" /></div>
                  <div>
                    <h3 className="font-bold">{title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
