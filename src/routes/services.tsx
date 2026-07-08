import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/placeholder-page";

export const Route = createFileRoute("/services")({
  head: () => ({ meta: [{ title: "আমাদের সেবা — বাড়িবন্ধু" }] }),
  component: () => (
    <PlaceholderPage
      title="আমাদের সেবা"
      description="ভাড়াটিয়া যাচাই, চুক্তি, ভিজিট, ভাড়া সংগ্রহ ও আইনি সহায়তা।"
    />
  ),
});
