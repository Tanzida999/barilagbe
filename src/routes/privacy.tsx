import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Crumbs } from "@/components/site-chrome";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "গোপনীয়তা নীতি — বাড়িলাগবে" }] }),
  component: () => (
    <PageShell>
      <Crumbs items={[{ label: "হোম", to: "/" }, { label: "গোপনীয়তা" }]} />
      <div className="prose mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-bold">গোপনীয়তা নীতি</h1>
        <p className="mt-4 text-muted-foreground">আপনার তথ্যের নিরাপত্তা আমাদের কাছে সবচেয়ে গুরুত্বপূর্ণ। আমরা কেবল সেবা প্রদানের জন্য প্রয়োজনীয় তথ্য সংগ্রহ করি এবং তৃতীয় পক্ষের সাথে শেয়ার করি না।</p>
        <p className="mt-3 text-muted-foreground">সকল ডেটা এনক্রিপ্টেড অবস্থায় সংরক্ষিত হয় এবং শুধুমাত্র অনুমোদিত ব্যবহারকারীরা এতে প্রবেশ করতে পারেন।</p>
      </div>
    </PageShell>
  ),
});
