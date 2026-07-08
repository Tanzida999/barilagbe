import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/placeholder-page";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "লগইন — বাড়িবন্ধু" }] }),
  component: () => (
    <PlaceholderPage title="লগইন" description="লগইন সিস্টেম শীঘ্রই যুক্ত হবে।" />
  ),
});
