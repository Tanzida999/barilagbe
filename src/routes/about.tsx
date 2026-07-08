import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Crumbs } from "@/components/site-chrome";
import { Users, Target, Award } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "আমাদের সম্পর্কে — বাড়িলাগবে" }] }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <Crumbs items={[{ label: "হোম", to: "/" }, { label: "আমাদের সম্পর্কে" }]} />
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <h1 className="text-4xl font-bold">আমাদের সম্পর্কে</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          বাড়িলাগবে বাংলাদেশের প্রথম সম্পূর্ণ ভাড়া ব্যবস্থাপনা প্ল্যাটফর্ম — যেখানে বাসা খোঁজা, ভাড়াটিয়া যাচাই, চুক্তি, মাসিক ভাড়া সংগ্রহ ও আইনি সহায়তা সব এক জায়গায়।
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            { icon: Target, title: "আমাদের লক্ষ্য", desc: "সম্পত্তি ভাড়ার সব ঝামেলা এক প্ল্যাটফর্মে সমাধান।" },
            { icon: Users, title: "আমাদের দল", desc: "অভিজ্ঞ ফিল্ড এজেন্ট, আইনজীবী ও সাপোর্ট টিম।" },
            { icon: Award, title: "আমাদের প্রতিশ্রুতি", desc: "স্বচ্ছতা, নিরাপত্তা ও নিশ্চিন্ত মাসিক আয়।" },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
              <c.icon className="h-8 w-8 text-primary" />
              <h3 className="mt-3 font-bold">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
