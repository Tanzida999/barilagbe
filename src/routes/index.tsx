import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Search, Home as HomeIcon, MapPin, ShieldCheck, UserCheck, Scale, Wallet,
  CalendarCheck, Headphones, ArrowRight, CheckCircle2, Building2, FileSignature,
  ClipboardCheck,
} from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { PropertyCard } from "@/components/property-card";
import heroImg from "@/assets/hero-skyline.jpg";
import { PROPERTIES, THANAS, AREAS_BY_THANA, bn } from "@/lib/mock-data";
import { useState, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "বাড়িলাগবে — শুধু বাসা খোঁজা নয়, সম্পূর্ণ ভাড়া ব্যবস্থাপনা" },
      { name: "description", content: "বাংলাদেশের প্রথম সম্পূর্ণ ভাড়া ব্যবস্থাপনা প্ল্যাটফর্ম।" },
    ],
  }),
  component: HomePage,
});

const features = [
  { icon: ShieldCheck, title: "যাচাইকৃত সম্পত্তি", desc: "প্রতিটি বাসা সরেজমিনে পরিদর্শন করা।" },
  { icon: UserCheck, title: "যাচাইকৃত ভাড়াটিয়া", desc: "এনআইডি ও রেফারেন্স যাচাই নিশ্চিত।" },
  { icon: Scale, title: "আইনি সহায়তা", desc: "চুক্তিপত্র থেকে নোটিশ পর্যন্ত সব কিছু।" },
  { icon: Wallet, title: "ভাড়া ট্র্যাকিং", desc: "মাসিক ভাড়া সংগ্রহ ও হিসাব রক্ষণ।" },
  { icon: CalendarCheck, title: "বাসা ভিজিট সেবা", desc: "আমাদের এজেন্ট আপনাকে সঙ্গে দিবে।" },
  { icon: Headphones, title: "২৪/৭ সহায়তা", desc: "যে কোনো সমস্যায় সরাসরি ফোনে।" },
];

const steps = [
  { title: "এলাকার এজেন্ট নিয়োগ", desc: "প্রতিটি থানা ও মহল্লার দায়িত্বে থাকেন স্থানীয় এজেন্ট।" },
  { title: "মালিকের সাথে চুক্তি", desc: "এজেন্ট বাসায় গিয়ে ব্যবস্থাপনা চুক্তি স্বাক্ষর করেন — লিস্টিংয়ের আগেই।" },
  { title: "ভবন ও ইউনিট যুক্ত", desc: "ভবনের তথ্য ও ছবিসহ প্রতিটি ইউনিট (বাসা, অফিস, দোকান, গ্যারেজ) যুক্ত হয়।" },
  { title: "ভাড়াটিয়া আবেদন", desc: "আগ্রহী ভাড়াটিয়া অনলাইনে আবেদন করেন।" },
  { title: "ডকুমেন্ট যাচাই", desc: "এনআইডি, আয় ও রেফারেন্স যাচাই করা হয়।" },
  { title: "বাসা ভিজিট", desc: "আমাদের এজেন্ট বাসা দেখাতে সঙ্গে যান।" },
  { title: "চুক্তি সম্পন্ন", desc: "আইনসম্মত চুক্তিপত্র প্রস্তুত ও স্বাক্ষর।" },
  { title: "মাসিক ভাড়া পরিচালনা", desc: "প্রতি মাসে আমরা ভাড়া সংগ্রহ ও পরিশোধ করি।" },
];

const stats = [
  { n: "৫০+", label: "পরিচালিত সম্পত্তি" },
  { n: "১০০+", label: "সন্তুষ্ট ভাড়াটিয়া" },
  { n: "৯৮%", label: "অকুপেন্সি রেট" },
  { n: "২৪/৭", label: "গ্রাহক সেবা" },
];

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        <Hero />
        <SearchPanel />
        <WhyUs />
        <FeaturedProperties />
        <HowItWorks />
        <TrustStats />
        <CTA />
      </main>
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <img src={heroImg} alt="ঢাকার আধুনিক আবাসিক ভবন" className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div className="hero-gradient absolute inset-0 -z-10" />
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
        <div className="max-w-3xl text-primary-foreground">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
            <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
            নিরাপদ বাড়ি ভাড়া — নিজ এলাকার মানুষ দিয়ে আপনার বাড়ির কাজ
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-[1.15] sm:text-5xl lg:text-6xl">
            শুধু বাসা খুঁজে দিই না —<br />
            <span className="text-accent">সম্পূর্ণ ভাড়া ব্যবস্থাপনা</span> আমরা করি
          </h1>
          <p className="mt-5 max-w-2xl text-base text-white/85 sm:text-lg">
            নিরাপদ বাড়ি ভাড়া — নিজ এলাকার মানুষ দিয়ে আপনার বাড়ির কাজ। যাচাইকৃত ভাড়াটিয়া, আইনসম্মত চুক্তি, বাসা ভিজিট, মাসিক ভাড়া সংগ্রহ ও আইনি সহায়তা।
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/properties" className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lift transition hover:brightness-105">
              <Search className="h-4 w-4" /> বাসা খুঁজুন
            </Link>
            <Link to="/owners/register" className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-inset ring-white/30 backdrop-blur transition hover:bg-white/20">
              <HomeIcon className="h-4 w-4" /> আমার সম্পত্তি যুক্ত করুন
            </Link>
            <a href="#how-it-works" className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white hover:underline">
              আরও জানুন <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function SearchPanel() {
  const navigate = useNavigate();
  const [thana, setThana] = useState("");
  const [area, setArea] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [maxRent, setMaxRent] = useState("");
  const areas = thana ? AREAS_BY_THANA[thana] ?? [] : [];

  const submit = () => {
    navigate({
      to: "/properties",
      search: {
        thana: thana || undefined,
        area: area || undefined,
        bedrooms: bedrooms ? Number(bedrooms) : undefined,
        maxRent: maxRent ? Number(maxRent) : undefined,
      } as any,
    });
  };

  return (
    <section className="relative z-10 mx-auto -mt-16 max-w-6xl px-4 sm:px-6">
      <div className="rounded-3xl bg-surface p-6 shadow-lift ring-1 ring-border sm:p-8">
        <h2 className="mb-1 text-lg font-bold text-foreground">ঢাকায় আপনি কী খুঁজছেন?</h2>
        <p className="mb-4 text-xs text-muted-foreground">শুধু ঢাকা শহরের যাচাইকৃত বাসা</p>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <Field label="থানা" value={thana} onChange={(v) => { setThana(v); setArea(""); }} options={["", ...THANAS]} placeholder="সব থানা" />
          <Field label="এলাকা" value={area} onChange={setArea} options={["", ...areas]} placeholder={thana ? "সব এলাকা" : "প্রথমে থানা"} disabled={!thana} />
          <Field label="বেডরুম" value={bedrooms} onChange={setBedrooms} options={["", "1", "2", "3", "4"]} placeholder="যেকোনো" />
          <Field label="সর্বোচ্চ ভাড়া" value={maxRent} onChange={setMaxRent} options={["", "15000", "20000", "30000", "50000"]} placeholder="যেকোনো" />
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            <MapPin className="mr-1 inline h-3.5 w-3.5" /> {bn(PROPERTIES.length)}+ যাচাইকৃত বাসা — ঢাকা
          </p>
          <button onClick={submit} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:bg-primary/90">
            <Search className="h-4 w-4" /> অনুসন্ধান করুন
          </button>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, options, placeholder, disabled }: { label: string; value: string; onChange: (v: string) => void; options: string[]; placeholder?: string; disabled?: boolean }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      <select disabled={disabled} value={value} onChange={(e) => onChange(e.target.value)} className="h-11 rounded-xl border border-input bg-surface px-3 text-sm text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary-soft disabled:opacity-50">
        {options.map((o) => (
          <option key={o} value={o}>{o === "" ? (placeholder ?? "সব") : o}</option>
        ))}
      </select>
    </label>
  );
}

function WhyUs() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionHeader eyebrow="কেন বাড়িলাগবে" title="কেন আমাদের বেছে নেবেন?" subtitle="আমরা শুধু লিস্টিং সাইট নই — সম্পত্তি ব্যবস্থাপনার সম্পূর্ণ সেবা।" />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="card-lift group rounded-2xl border border-border bg-surface p-6 shadow-soft">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-foreground">{title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturedProperties() {
  const featured = useMemo(() => PROPERTIES.filter((p) => p.featured).slice(0, 6), []);
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeader eyebrow="জনপ্রিয় বাসা" title="সদ্য যুক্ত হওয়া সম্পত্তি" subtitle="যাচাইকৃত ও ব্যবস্থাপনায় থাকা বাসাসমূহ।" align="left" />
        <Link to="/properties" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
          সব দেখুন <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((p) => <PropertyCard key={p.id} p={p} />)}
      </div>
    </section>
  );
}

function HowItWorks() {
  const stepIcons = [MapPin, FileSignature, Building2, UserCheck, ClipboardCheck, CalendarCheck, Scale, Wallet];
  return (
    <section id="how-it-works" className="bg-surface-2 py-20 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="কিভাবে কাজ করে" title="আট ধাপে সম্পূর্ণ প্রক্রিয়া" subtitle="মালিকের সাথে চুক্তি থেকে মাসিক ভাড়া পরিচালনা — সবকিছু আমরাই করি।" />
        <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => {
            const Icon = stepIcons[i];
            return (
              <li key={s.title} className="card-lift rounded-2xl border border-border bg-surface p-6 shadow-soft">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold text-muted-foreground">ধাপ {bn(i + 1)}</span>
                </div>
                <h3 className="mt-3 text-base font-bold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function TrustStats() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="grid gap-4 rounded-3xl bg-primary p-8 text-primary-foreground sm:grid-cols-4 sm:p-10">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-3xl font-bold sm:text-4xl">{s.n}</div>
            <div className="mt-1 text-sm opacity-90">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
      <div className="grid gap-6 rounded-3xl border border-border bg-surface p-8 shadow-soft sm:grid-cols-2 sm:p-12">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">আপনি কি বাড়ির মালিক?</h2>
          <p className="mt-2 text-sm text-muted-foreground">আপনার সম্পত্তি আমাদের ব্যবস্থাপনায় দিন — নিশ্চিন্ত মাসিক আয়।</p>
          <Link to="/owners/register" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            মালিক নিবন্ধন <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">ভাড়াটিয়া খুঁজছেন?</h2>
          <p className="mt-2 text-sm text-muted-foreground">যাচাইকৃত বাসা দেখুন, ভিজিট বুক করুন, আবেদন করুন।</p>
          <Link to="/properties" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:brightness-105">
            বাসা দেখুন <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, subtitle, align = "center" }: { eyebrow: string; title: string; subtitle?: string; align?: "center" | "left" }) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <span className="inline-block rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">{eyebrow}</span>
      <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>
      {subtitle && <p className={`mt-2 text-muted-foreground ${align === "center" ? "mx-auto max-w-2xl" : ""}`}>{subtitle}</p>}
    </div>
  );
}
