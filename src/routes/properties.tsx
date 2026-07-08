import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/placeholder-page";

export const Route = createFileRoute("/properties")({
  head: () => ({ meta: [{ title: "ভাড়া বাসা — বাড়িবন্ধু" }] }),
  component: () => (
    <PlaceholderPage
      title="ভাড়া বাসা"
      description="যাচাইকৃত সম্পত্তির সম্পূর্ণ তালিকা শীঘ্রই আসছে।"
    />
  ),
});
