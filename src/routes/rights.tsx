import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Crumbs } from "@/components/site-chrome";
import { Scale, Home, Users, FileText, AlertTriangle, HandCoins } from "lucide-react";

export const Route = createFileRoute("/rights")({
  head: () => ({
    meta: [
      { title: "বাড়িওয়ালা ও ভাড়াটিয়ার অধিকার — বাড়িলাগবে" },
      { name: "description", content: "বাড়ি ভাড়া আইন অনুযায়ী মালিক ও ভাড়াটিয়ার অধিকার, দায়িত্ব ও করণীয় সহজ বাংলায়।" },
      { property: "og:title", content: "বাড়িওয়ালা ও ভাড়াটিয়ার অধিকার — বাড়িলাগবে" },
      { property: "og:description", content: "মালিক ও ভাড়াটিয়ার অধিকার, দায়িত্ব ও আইনি করণীয় সহজ বাংলায়।" },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RightsPage,
});

const ownerRights = [
  "সময়মতো ভাড়া পাওয়ার অধিকার।",
  "লিখিত চুক্তি করার অধিকার।",
  "ভাড়াটিয়ার পরিচয় ও কাগজপত্র যাচাইয়ের অধিকার।",
  "বাসার ক্ষতি হলে ক্ষতিপূরণ চাওয়ার অধিকার।",
  "যুক্তিসঙ্গত নোটিশ দিয়ে বাসা পরিদর্শনের অধিকার।",
];
const ownerDuties = [
  "ভাড়ার রসিদ দেওয়া বাধ্যতামূলক।",
  "অগ্রিম হিসেবে সাধারণত এক মাসের বেশি ভাড়া নেওয়া উচিত নয়।",
  "বড় মেরামত ও পানি-বিদ্যুৎ লাইনের ব্যবস্থা করা।",
  "বাড়ানোর আগে যথাযথ নোটিশ দেওয়া; দুই বছরের মধ্যে বারবার ভাড়া না বাড়ানো।",
];
const tenantRights = [
  "শান্তিপূর্ণভাবে বসবাসের অধিকার।",
  "প্রতিটি ভাড়ার লিখিত রসিদ পাওয়ার অধিকার।",
  "অন্যায্য ভাড়া বৃদ্ধির বিরুদ্ধে অভিযোগ করার অধিকার।",
  "নোটিশ ছাড়া উচ্ছেদ না হওয়ার অধিকার।",
  "মৌলিক সেবা (পানি, বিদ্যুৎ, গ্যাস) পাওয়ার অধিকার।",
];
const tenantDuties = [
  "প্রতি মাসের নির্ধারিত তারিখে ভাড়া পরিশোধ।",
  "বাসার যত্ন নেওয়া ও ইচ্ছাকৃত ক্ষতি না করা।",
  "প্রতিবেশীর শান্তি বজায় রাখা।",
  "বাসা ছাড়ার আগে চুক্তি অনুযায়ী নোটিশ দেওয়া।",
];

const steps = [
  { icon: FileText, title: "লিখিত চুক্তি", desc: "ভাড়া, অগ্রিম, নোটিশের সময় ও দায়িত্ব স্পষ্টভাবে লিখুন। দুই পক্ষ ও সাক্ষীর স্বাক্ষর নিন।" },
  { icon: HandCoins, title: "ভাড়ার রসিদ", desc: "প্রতি মাসে রসিদ রাখুন — বিরোধ হলে এটিই প্রধান প্রমাণ।" },
  { icon: AlertTriangle, title: "বকেয়া হলে", desc: "প্রথমে লিখিত তাগাদা, এরপর আইনি নোটিশ। নোটিশ ছাড়া জোর করে উচ্ছেদ আইনসম্মত নয়।" },
  { icon: Scale, title: "বিরোধ নিষ্পত্তি", desc: "সমঝোতা না হলে ভাড়া নিয়ন্ত্রক বা আদালতের সহায়তা নিন। আমরা আইনজীবীর সাথে যুক্ত করে দিই।" },
];

function RightsPage() {
  return (
    <PageShell>
      <Crumbs items={[{ label: "হোম", to: "/" }, { label: "আইন ও অধিকার" }]} />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="text-4xl font-bold">মালিক ও ভাড়াটিয়ার অধিকার</h1>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          বাড়ি ভাড়া নিয়ে বেশিরভাগ ঝামেলা হয় না জানার কারণে। নিচে সহজ বাংলায় দুই পক্ষের অধিকার ও দায়িত্ব দেওয়া হলো।
        </p>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <Panel icon={Home} title="বাড়ির মালিকের অধিকার" items={ownerRights} tone="primary" />
          <Panel icon={Users} title="ভাড়াটিয়ার অধিকার" items={tenantRights} tone="secondary" />
          <Panel icon={Home} title="মালিকের দায়িত্ব" items={ownerDuties} tone="accent" />
          <Panel icon={Users} title="ভাড়াটিয়ার দায়িত্ব" items={tenantDuties} tone="accent" />
        </div>

        <h2 className="mt-14 text-2xl font-bold">ঝামেলা এড়াতে করণীয়</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.title} className="card-lift rounded-2xl border border-border bg-surface p-6 shadow-soft">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary"><s.icon className="h-5 w-5" /></div>
              <h3 className="mt-3 font-bold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 rounded-2xl border border-border bg-muted p-5 text-sm text-muted-foreground">
          দ্রষ্টব্য: এই পাতাটি শুধুমাত্র সাধারণ তথ্যের জন্য, আইনি পরামর্শ নয়। নির্দিষ্ট সমস্যায় আইনজীবীর পরামর্শ নিন।
        </p>
      </div>
    </PageShell>
  );
}

function Panel({ icon: Icon, title, items, tone }: { icon: any; title: string; items: string[]; tone: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
      <div className="flex items-center gap-3">
        <div className={`grid h-10 w-10 place-items-center rounded-xl ${tone === "secondary" ? "bg-secondary/15 text-secondary" : tone === "accent" ? "bg-accent/20 text-accent-foreground" : "bg-primary-soft text-primary"}`}>
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="font-bold">{title}</h2>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {items.map((it) => (
          <li key={it} className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{it}</li>
        ))}
      </ul>
    </div>
  );
}
