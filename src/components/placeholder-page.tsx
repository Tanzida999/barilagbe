import { Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { Construction, ArrowLeft } from "lucide-react";

export function PlaceholderPage({ title, description }: { title: string; description: string }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
        <div className="rounded-3xl border border-border bg-surface p-10 text-center shadow-soft">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-primary-soft text-primary">
            <Construction className="h-8 w-8" />
          </div>
          <h1 className="mt-6 text-3xl font-bold text-foreground">{title}</h1>
          <p className="mt-3 text-muted-foreground">{description}</p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft hover:bg-primary/90"
          >
            <ArrowLeft className="h-4 w-4" /> হোমে ফিরে যান
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
