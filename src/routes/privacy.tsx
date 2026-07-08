import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/placeholder-page";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "গোপনীয়তা নীতি — বাড়িবন্ধু" }] }),
  component: () => <PlaceholderPage title="গোপনীয়তা নীতি" description="নীতিমালা শীঘ্রই প্রকাশ করা হবে।" />,
});
