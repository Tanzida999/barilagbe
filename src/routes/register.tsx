import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/placeholder-page";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "রেজিস্টার — বাড়িবন্ধু" }] }),
  component: () => (
    <PlaceholderPage title="রেজিস্টার" description="নতুন অ্যাকাউন্ট তৈরির অপশন শীঘ্রই।" />
  ),
});
