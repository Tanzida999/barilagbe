import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/placeholder-page";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "যোগাযোগ — বাড়িবন্ধু" }] }),
  component: () => (
    <PlaceholderPage
      title="যোগাযোগ"
      description="আমাদের সাথে যেকোনো সময় যোগাযোগ করুন — ২৪/৭ সহায়তা।"
    />
  ),
});
