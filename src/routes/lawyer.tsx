import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Crumbs } from "@/components/site-chrome";
import { Scale, Phone, FileText, Mail, ShieldCheck, Clock } from "lucide-react";

export const Route = createFileRoute("/lawyer")({
  head: () => ({
    meta: [
      { title: "আইনি সহায়তা — বাড়িলাগবে" },
      { name: "description", content: "বাড়ি ভাড়া সংক্রান্ত আইনি নোটিশ, চুক্তিপত্র ও অভিজ্ঞ অ্যাডভোকেটের পরামর্শ।" },
      { property: "og:title", content: "আইনি সহায়তা — বাড়িলাগবে" },
      { property: "og:description", content: "বাড়ি ভাড়া সংক্রান্ত আইনি নোটিশ, চুক্তিপত্র ও অ্যাডভোকেট সেবা।" },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LawyerPage,
});

const services = [
  { icon: FileText, title: "চুক্তিপত্র তৈরি", desc: "মালিক ও ভাড়াটিয়ার জন্য আইনসম্মত বাড়ি ভাড়া চুক্তিপত্র।" },
  { icon: Scale, title: "আইনি নোটিশ", desc: "বকেয়া ভাড়া, উচ্ছেদ বা বিরোধের ক্ষেত্রে দ্রুত নোটিশ প্রস্তুত।" },
  { icon: ShieldCheck, title: "মধ্যস্থতা", desc: "দুই পক্ষের মধ্যে সমঝোতা ও বিরোধ নিষ্পত্তি।" },
  { icon: Clock, title: "জরুরি সেবা", desc: "জটিল মামলা বা জরুরি পরামর্শের জন্য দ্রুত যোগাযোগ।" },
];

const contacts = [
  { label: "ফোন", value: "০৯৬১১-২৩৪৫৬৭", href: "tel:09611234567" },
  { label: "ইমেইল", value: "legal@barilagbe.com.bd", href: "mailto:legal@barilagbe.com.bd" },
  { label: "কার্যালয়", value: "ঢাকা, বাংলাদেশ", href: null },
];

function LawyerPage() {
  return (
    <PageShell>
      <Crumbs items={[{ label: "হোম", to: "/" }, { label: "আইনি সহায়তা" }]} />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="text-4xl font-bold">আইনি সহায়তা</h1>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          বাড়ি ভাড়া নিয়ে যেকোনো ঝামেলা বা বিরোধে আমাদের অভিজ্ঞ আইনজীবী দল আপনার পাশে। চুক্তিপত্র থেকে শুরু করে আইনি নোটিশ ও মামলা পরামর্শ সবই একই জায়গায়।
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div key={s.title} className="card-lift rounded-2xl border border-border bg-surface p-6 shadow-soft">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-bold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
            <h2 className="text-2xl font-bold">কখন আইনি সহায়তা নেবেন?</h2>
            <ul className="mt-4 space-y-3 text-muted-foreground">
              <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />ভাড়া বকেয়া বা অনিয়মিত পরিশোধ হলে।</li>
              <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />বাসা ছাড়ার নোটিশ বা উচ্ছেদ নিয়ে বিরোধ হলে।</li>
              <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />মালিক ক্ষতিপূরণ দিচ্ছেন না বা ভাড়া বাড়ানো নিয়ে বিরোধ হলে।</li>
              <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />লিখিত চুক্তিপত্র ছাড়া বাসা ভাড়া নিচ্ছেন বা দিচ্ছেন।</li>
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">
              দ্রষ্টব্য: এটি সাধারণ তথ্য। নির্দিষ্ট আইনি বিষয়ে অবশ্যই অ্যাডভোকেটের পরামর্শ নিন।
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
            <h2 className="text-xl font-bold">যোগাযোগ</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {contacts.map((c) => (
                <li key={c.label} className="flex items-start gap-3">
                  {c.label === "ফোন" && <Phone className="mt-0.5 h-4 w-4 text-primary" />}
                  {c.label === "ইমেইল" && <Mail className="mt-0.5 h-4 w-4 text-primary" />}
                  {c.label === "কার্যালয়" && <Scale className="mt-0.5 h-4 w-4 text-primary" />}
                  <div>
                    <span className="block text-xs font-semibold text-muted-foreground">{c.label}</span>
                    {c.href ? (
                      <a href={c.href} className="font-medium text-foreground hover:text-primary">{c.value}</a>
                    ) : (
                      <span className="font-medium text-foreground">{c.value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:bg-primary/90"
            >
              বিস্তারিত জানতে লিখুন
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
