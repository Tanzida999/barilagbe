import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Crumbs } from "@/components/site-chrome";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({ meta: [{ title: "FAQ — বাড়িলাগবে" }] }),
  component: FAQPage,
});

const faqs = [
  { q: "বাড়িলাগবে কীভাবে কাজ করে?", a: "আমরা যাচাইকৃত সম্পত্তি লিস্ট করি, ভাড়াটিয়ার আবেদন যাচাই করি, চুক্তি করি এবং প্রতি মাসে ভাড়া সংগ্রহ করি।" },
  { q: "সেবা মূল্য কত?", a: "মালিকের জন্য মাসিক ভাড়ার ৭% থেকে ১০% সার্ভিস চার্জ প্রযোজ্য। ভাড়াটিয়ার জন্য সাধারণ সার্চ ও আবেদন ফ্রি।" },
  { q: "ভাড়াটিয়া যাচাই কীভাবে হয়?", a: "এনআইডি যাচাই, দুইজন রক্ত সম্পর্কীয় রেফারেন্স, আয়ের প্রমাণ এবং পূর্ববর্তী ভাড়ার ইতিহাস পরীক্ষা করা হয়।" },
  { q: "বকেয়া ভাড়া হলে কী হয়?", a: "প্রথমে রিমাইন্ডার, দ্বিতীয় ও তৃতীয় সতর্কতা পাঠানো হয়। ৩ মাস বকেয়া হলে আইনি নোটিশ ও অ্যাডভোকেট নিযুক্ত করা হয়।" },
  { q: "কোন এলাকায় সেবা আছে?", a: "বর্তমানে ঢাকা, চট্টগ্রাম, সিলেট ও রাজশাহীতে সেবা চালু আছে। শীঘ্রই সব বিভাগে সম্প্রসারিত হবে।" },
  { q: "বাসা ভিজিট কীভাবে বুক করব?", a: "সম্পত্তির পাতা থেকে 'ভিজিট বুক' বাটনে ক্লিক করে তারিখ ও সময় নির্বাচন করুন। আমাদের এজেন্ট আপনাকে সঙ্গে যাবেন।" },
];

function FAQPage() {
  return (
    <PageShell>
      <Crumbs items={[{ label: "হোম", to: "/" }, { label: "FAQ" }]} />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-bold">সাধারণ প্রশ্ন</h1>
        <p className="mt-2 text-muted-foreground">এখানে বাড়িলাগবে সম্পর্কে সবচেয়ে বেশি জিজ্ঞাসিত প্রশ্নের উত্তর।</p>
        <Accordion type="single" collapsible className="mt-8">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`i-${i}`}>
              <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </PageShell>
  );
}
