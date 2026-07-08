import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Crumbs } from "@/components/site-chrome";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "শর্তাবলী — বাড়িলাগবে" }] }),
  component: () => (
    <PageShell>
      <Crumbs items={[{ label: "হোম", to: "/" }, { label: "শর্তাবলী" }]} />
      <div className="prose mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-bold">শর্তাবলী</h1>
        <p className="mt-4 text-muted-foreground">বাড়িলাগবে ব্যবহার করে আপনি আমাদের সেবার শর্তাবলী মেনে নিচ্ছেন। প্রতিটি সম্পত্তি লিস্টিং ও ভাড়াটিয়ার তথ্য যাচাই সাপেক্ষে গ্রহণ করা হয়।</p>
        <p className="mt-3 text-muted-foreground">চুক্তিভঙ্গের ক্ষেত্রে আইনসম্মত পদক্ষেপ নেওয়া হবে। বিস্তারিত জানতে যোগাযোগ করুন।</p>
      </div>
    </PageShell>
  ),
});
