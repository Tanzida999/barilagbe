import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Crumbs } from "@/components/site-chrome";
import { MapPin, Users, ClipboardList, Phone, ShieldCheck, BadgeCheck } from "lucide-react";

export const Route = createFileRoute("/agent")({
  head: () => ({
    meta: [
      { title: "এজেন্ট — বাড়িলাগবে" },
      { name: "description", content: "বাড়িলাগবের নিজস্ব এজেন্ট নেটওয়ার্ক, নির্ধারিত এলাকা, ভিজিট ও ভাড়া ব্যবস্থাপনা।" },
      { property: "og:title", content: "এজেন্ট — বাড়িলাগবে" },
      { property: "og:description", content: "নিজ এলাকার মানুষ দিয়ে বাড়ি ভাড়ার সব কাজ — এজেন্ট নিয়োগ ও সেবা।" },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AgentPage,
});

const steps = [
  { icon: MapPin, title: "এলাকা নির্ধারণ", desc: "প্রতি এজেন্টের জন্য একটি নির্দিষ্ট থানা/মহল্লা ম্যাপে দেখানো হয়।" },
  { icon: Users, title: "মালিকের সাথে চুক্তি", desc: "এজেন্ট সরেজমিনে গিয়ে মালিকের সাথে ব্যবস্থাপনা চুক্তি স্বাক্ষর করে।" },
  { icon: ClipboardList, title: "বিল্ডিং তথ্য সংগ্রহ", desc: "ফ্ল্যাট, দোকান, গ্যারেজসহ সম্পূর্ণ বিল্ডিং তথ্য ও ছবি আপলোড করা হয়।" },
  { icon: ShieldCheck, title: "ভাড়াটিয়া যাচাই", desc: "এনআইডি, রেফারেন্স ও ইতিহাস পরীক্ষা করে নিরাপদ ভাড়া নিশ্চিত করা হয়।" },
  { icon: BadgeCheck, title: "ভিজিট ও হ্যান্ডওভার", desc: "ভাড়াটিয়ার ভিজিট সম্পন্ন করে চুক্তি ও চাবি হস্তান্তর সম্পন্ন করা হয়।" },
];

function AgentPage() {
  return (
    <PageShell>
      <Crumbs items={[{ label: "হোম", to: "/" }, { label: "এজেন্ট" }]} />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="text-4xl font-bold">এজেন্ট নেটওয়ার্ক</h1>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          বাড়িলাগবের প্রতিটি এজেন্ট নির্দিষ্ট এলাকার জন্য দায়িত্বপ্রাপ্ত। তারা সরেজমিনে বিল্ডিং ও ভাড়াটিয়া যাচাই করে নিরাপদ ভাড়া নিশ্চিত করে।
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s) => (
            <div key={s.title} className="card-lift rounded-2xl border border-border bg-surface p-6 shadow-soft">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-bold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-surface p-6 shadow-soft sm:p-8">
          <h2 className="text-2xl font-bold">আপনিও কি এজেন্ট হতে চান?</h2>
          <p className="mt-2 text-muted-foreground">
            নিজ এলাকায় বাড়ি ভাড়া ব্যবস্থাপনার কাজ করুন, নির্দিষ্ট কমিশন উপার্জন করুন এবং নিরাপদ আয়ের সুযোগ নিন।
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:bg-primary/90"
            >
              <Phone className="h-4 w-4" />
              আজই আবেদন করুন
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
            >
              সেবা সমূহ দেখুন
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
