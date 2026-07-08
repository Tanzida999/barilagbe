import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/placeholder-page";

export const Route = createFileRoute("/owners")({
  head: () => ({ meta: [{ title: "বাড়ির মালিক — বাড়িবন্ধু" }] }),
  component: () => (
    <PlaceholderPage
      title="বাড়ির মালিক"
      description="আপনার সম্পত্তি আমাদের ব্যবস্থাপনায় দিন — নিশ্চিন্ত মাসিক আয়।"
    />
  ),
});
