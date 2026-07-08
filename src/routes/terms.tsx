import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/placeholder-page";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "শর্তাবলী — বাড়িবন্ধু" }] }),
  component: () => <PlaceholderPage title="শর্তাবলী" description="ব্যবহারের শর্তাবলী শীঘ্রই।" />,
});
