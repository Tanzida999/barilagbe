import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Search, Home as HomeIcon, MapPin, BedDouble, Bath, Ruler, ShieldCheck,
  UserCheck, Scale, Wallet, CalendarCheck, Headphones, ArrowRight,
  CheckCircle2, Building2, FileSignature, ClipboardCheck,
} from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import heroImg from "@/assets/hero-skyline.jpg";
import p1 from "@/assets/property-1.jpg";
import p2 from "@/assets/property-2.jpg";
import p3 from "@/assets/property-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "বাড়িবন্ধু — শুধু বাসা খোঁজা নয়, সম্পূর্ণ ভাড়া ব্যবস্থাপনা" },
      {
        name: "description",
        content:
          "বাংলাদেশের প্রথম সম্পূর্ণ ভাড়া ব্যবস্থাপনা প্ল্যাটফর্ম। যাচাইকৃত বাসা, ভাড়াটিয়া, ভিজিট, চুক্তি ও মাসিক ভাড়া — সবকিছু এক জায়গায়।",
      },
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
  { n: "১", title: "মালিকের সাথে চুক্তি", desc: "বাড়ির মালিক আমাদের সাথে ব্যবস্থাপনা চুক্তি করেন।" },
  { n: "২", title: "লিস্টিং তৈরি", desc: "আমরা পেশাদার ছবি তুলে লিস্টিং প্রস্তুত করি।" },
  { n: "৩", title: "ভাড়াটিয়া আবেদন", desc: "আগ্রহী ভাড়াটিয়া অনলাইনে আবেদন করেন।" },
  { n: "৪", title: "ডকুমেন্ট যাচাই", desc: "এনআইডি, আয় ও রেফারেন্স যাচাই করা হয়।" },
  { n: "৫", title: "বাসা ভিজিট", desc: "আমাদের এজেন্ট বাসা দেখাতে সঙ্গে যান।" },
  { n: "৬", title: "চুক্তি সম্পন্ন", desc: "আইনসম্মত চুক্তিপত্র প্রস্তুত ও স্বাক্ষর।" },
  { n: "৭", title: "মাসিক ভাড়া পরিচালনা", desc: "প্রতি মাসে আমরা ভাড়া সংগ্রহ ও পরিশোধ করি।" },
];

const properties = [
  { img: p1, title: "৩ বেডরুম ফ্ল্যাট", area: "ধানমন্ডি, ঢাকা", rent: "২৫,০০০", sqft: "১২০০", bed: "৩", bath: "২" },
  { img: p2, title: "২ বেডরুম ফ্ল্যাট", area: "উত্তরা, ঢাকা", rent: "১৮,৫০০", sqft: "৯৫০", bed: "২", bath: "২" },
  { img: p3, title: "১ বেডরুম স্টুডিও", area: "বনানী, ঢাকা", rent: "১৪,০০০", sqft: "৭০০", bed: "১", bath: "১" },
];

const stats = [
  { n: "৫০০+", label: "পরিচালিত সম্পত্তি" },
  { n: "৩০০০+", label: "সন্তুষ্ট ভাড়াটিয়া" },
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
      <img
        src={heroImg}
        alt="ঢাকার আধুনিক আবাসিক ভবন"
        width={1920}
        height={1080}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="hero-gradient absolute inset-0 -z-10" />
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
        <div className="max-w-3xl text-primary-foreground">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
            <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
            বাংলাদেশের প্রথম সম্পূর্ণ ভাড়া ব্যবস্থাপনা প্ল্যাটফর্ম
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-[1.15] sm:text-5xl lg:text-6xl">
            শুধু বাসা খুঁজে দিই না —<br />
            <span className="text-accent">সম্পূর্ণ ভাড়া ব্যবস্থাপনা</span> আমরা করি
          </h1>
          <p className="mt-5 max-w-2xl text-base text-white/85 sm:text-lg">
            যাচাইকৃত ভাড়াটিয়া, আইনসম্মত চুক্তি, বাসা ভিজিট, মাসিক ভাড়া সংগ্রহ ও আইনি
            সহায়তা — মালিক ও ভাড়াটিয়া উভয়ের জন্য নিশ্চিন্ত সমাধান।
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lift transition hover:brightness-105"
            >
              <Search className="h-4 w-4" /> বাসা খুঁজুন
            </Link>
            <Link
              to="/owners"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-inset ring-white/30 backdrop-blur transition hover:bg-white/20"
            >
              <HomeIcon className="h-4 w-4" /> আমার সম্পত্তি যুক্ত করুন
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function SearchPanel() {
  const types = ["ভাড়া", "বাড়ি", "ফ্ল্যাট", "অফিস"];
  return (
    <section className="relative z-10 mx-auto -mt-16 max-w-6xl px-4 sm:px-6">
      <div className="rounded-3xl bg-surface p-6 shadow-lift ring-1 ring-border sm:p-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-foreground">আপনি কী খুঁজছেন?</h2>
          <div className="flex flex-wrap gap-2">
            {types.map((t, i) => (
              <button
                key={t}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  i === 0
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-primary-soft hover:text-primary"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          <Field label="জেলা" defaultValue="ঢাকা" options={["ঢাকা", "চট্টগ্রাম", "সিলেট", "রাজশাহী"]} />
          <Field label="থানা" defaultValue="ধানমন্ডি" options={["ধানমন্ডি", "উত্তরা", "গুলশান", "বনানী"]} />
          <Field label="এলাকা" defaultValue="সব" options={["সব", "রোড ১১", "রোড ২৭", "সাত মসজিদ"]} />
          <Field label="বাজেট (টাকা)" defaultValue="২০-৩০ হাজার" options={["১০-১৫ হাজার", "১৫-২০ হাজার", "২০-৩০ হাজার", "৩০+ হাজার"]} />
          <Field label="বেডরুম" defaultValue="৩" options={["১", "২", "৩", "৪+"]} />
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            <MapPin className="mr-1 inline h-3.5 w-3.5" />
            আপনার এলাকার আশেপাশে ২০০+ যাচাইকৃত বাসা
          </p>
          <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:bg-primary/90">
            <Search className="h-4 w-4" /> অনুসন্ধান করুন
          </button>
        </div>

        {/* Map placeholder */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-border">
          <div
            className="relative h-60 w-full bg-gradient-to-br from-primary-soft to-surface-2"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 40%, oklch(0.85 0.06 187) 0, transparent 40%), radial-gradient(circle at 70% 60%, oklch(0.9 0.04 149) 0, transparent 45%)",
            }}
          >
            <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,oklch(0.9_0.01_240)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.9_0.01_240)_1px,transparent_1px)] [background-size:32px_32px]" />
            {[
              { l: "22%", t: "40%" }, { l: "48%", t: "55%" }, { l: "70%", t: "30%" }, { l: "60%", t: "70%" },
            ].map((p, i) => (
              <div
                key={i}
                className="absolute grid -translate-x-1/2 -translate-y-full place-items-center rounded-full bg-primary p-2 text-primary-foreground shadow-lift"
                style={{ left: p.l, top: p.t }}
              >
                <MapPin className="h-4 w-4" />
              </div>
            ))}
            <div className="absolute bottom-3 right-3 rounded-lg bg-surface/95 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-soft">
              Google Map • সরাসরি দেখুন
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, defaultValue, options }: { label: string; defaultValue: string; options: string[] }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      <select
        defaultValue={defaultValue}
        className="h-11 rounded-xl border border-input bg-surface px-3 text-sm text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary-soft"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function WhyUs() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionHeader
        eyebrow="কেন বাড়িবন্ধু"
        title="কেন আমাদের বেছে নেবেন?"
        subtitle="আমরা শুধু লিস্টিং সাইট নই — সম্পত্তি ব্যবস্থাপনার সম্পূর্ণ সেবা।"
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="card-lift group rounded-2xl border border-border bg-surface p-6 shadow-soft"
          >
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
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeader
          eyebrow="জনপ্রিয় বাসা"
          title="সদ্য যুক্ত হওয়া সম্পত্তি"
          subtitle="যাচাইকৃত ও ব্যবস্থাপনায় থাকা বাসাসমূহ।"
          align="left"
        />
        <Link
          to="/properties"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          সব দেখুন <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((p) => (
          <article
            key={p.title}
            className="card-lift overflow-hidden rounded-2xl border border-border bg-surface shadow-soft"
          >
            <div className="relative">
              <img src={p.img} alt={p.title} width={800} height={600} loading="lazy" className="h-56 w-full object-cover" />
              <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-secondary/95 px-2.5 py-1 text-[11px] font-semibold text-secondary-foreground shadow">
                <ShieldCheck className="h-3 w-3" /> যাচাইকৃত
              </span>
              <span className="absolute right-3 top-3 rounded-full bg-surface/95 px-2.5 py-1 text-[11px] font-semibold text-foreground shadow">
                Featured
              </span>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate text-base font-bold text-foreground">{p.title}</h3>
                  <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" /> {p.area}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-lg font-bold text-primary">৳{p.rent}</div>
                  <div className="text-[11px] text-muted-foreground">প্রতি মাস</div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-4 border-t border-border pt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><BedDouble className="h-4 w-4" /> {p.bed} বেড</span>
                <span className="flex items-center gap-1"><Bath className="h-4 w-4" /> {p.bath} বাথ</span>
                <span className="flex items-center gap-1"><Ruler className="h-4 w-4" /> {p.sqft} sqft</span>
              </div>

              <Link
                to="/properties"
                className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary-soft py-2.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
              >
                বিস্তারিত দেখুন <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const stepIcons = [FileSignature, Building2, UserCheck, ClipboardCheck, CalendarCheck, Scale, Wallet];
  return (
    <section className="bg-surface-2 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="কিভাবে কাজ করে"
          title="সাত ধাপে সম্পূর্ণ প্রক্রিয়া"
          subtitle="মালিকের সাথে চুক্তি থেকে মাসিক ভাড়া পরিচালনা — সবকিছু আমরাই করি।"
        />

        <div className="relative mt-14">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border md:block" />
          <ol className="space-y-8 md:space-y-14">
            {steps.map((s, i) => {
              const Icon = stepIcons[i];
              const rightSide = i % 2 === 1;
              return (
                <li
                  key={s.n}
                  className={`relative grid gap-4 md:grid-cols-2 md:gap-16 ${rightSide ? "" : ""}`}
                >
                  <div className={`md:${rightSide ? "col-start-2" : "col-start-1"}`}>
                    <div className={`card-lift rounded-2xl border border-border bg-surface p-6 shadow-soft ${rightSide ? "md:ml-0" : ""}`}>
                      <div className="flex items-center gap-3">
                        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-accent">ধাপ {s.n}</div>
                          <h3 className="truncate text-base font-bold text-foreground">{s.title}</h3>
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 top-6 hidden h-4 w-4 -translate-x-1/2 rounded-full bg-accent ring-4 ring-surface-2 md:block" />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

function TrustStats() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="rounded-3xl bg-primary p-8 text-primary-foreground shadow-lift sm:p-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-bold text-accent sm:text-5xl">{s.n}</div>
              <div className="mt-2 text-sm font-medium text-white/85">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
      <div className="grid gap-6 rounded-3xl border border-border bg-surface p-8 shadow-soft md:grid-cols-2 md:p-12">
        <div>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            আপনার সম্পত্তি আমাদের হাতে দিন — <span className="text-primary">নিশ্চিন্তে থাকুন</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            ভাড়াটিয়া খুঁজে দেওয়া থেকে মাসিক ভাড়া তুলে দেওয়া — প্রতিটি কাজ আমরাই করবো।
            আপনি শুধু ব্যাংকে টাকা জমা হওয়া দেখবেন।
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-3">
          <Link
            to="/owners"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:bg-primary/90"
          >
            মালিক হিসেবে যুক্ত হন
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
          >
            আমাদের সাথে কথা বলুন
          </Link>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow, title, subtitle, align = "center",
}: { eyebrow: string; title: string; subtitle?: string; align?: "center" | "left" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span className="text-xs font-bold uppercase tracking-widest text-accent">{eyebrow}</span>
      <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
