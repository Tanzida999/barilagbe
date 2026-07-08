import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/placeholder-page";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "আমাদের সম্পর্কে — বাড়িবন্ধু" }] }),
  component: () => <PlaceholderPage title="আমাদের সম্পর্কে" description="বাড়িবন্ধুর গল্প শীঘ্রই।" />,
});
