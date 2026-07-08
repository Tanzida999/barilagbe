import { Link } from "@tanstack/react-router";
import { BedDouble, Bath, Ruler, MapPin, ShieldCheck, Heart, Share2, CalendarCheck, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useAppStore } from "@/lib/store";
import { bn, type Property } from "@/lib/mock-data";
import { useState } from "react";
import { BookVisitModal } from "./book-visit-modal";

export function PropertyCard({ p, variant = "grid" }: { p: Property; variant?: "grid" | "list" }) {
  const favorites = useAppStore((s) => s.favorites);
  const toggle = useAppStore((s) => s.toggleFavorite);
  const isFav = favorites.includes(p.id);
  const [open, setOpen] = useState(false);

  const share = async () => {
    const url = `${window.location.origin}/properties/${p.id}`;
    try {
      if (navigator.share) await navigator.share({ title: p.title, url });
      else {
        await navigator.clipboard.writeText(url);
        toast.success("লিংক কপি হয়েছে");
      }
    } catch {}
  };

  return (
    <article
      className={`card-lift overflow-hidden rounded-2xl border border-border bg-surface shadow-soft ${
        variant === "list" ? "grid gap-0 sm:grid-cols-[280px_1fr]" : ""
      }`}
    >
      <div className="relative">
        <Link to="/properties/$id" params={{ id: p.id }}>
          <img
            src={p.images[0]}
            alt={p.title}
            loading="lazy"
            className={`w-full object-cover ${variant === "list" ? "h-full min-h-48" : "h-52"}`}
          />
        </Link>
        {p.verified && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-secondary/95 px-2.5 py-1 text-[11px] font-semibold text-secondary-foreground shadow">
            <ShieldCheck className="h-3 w-3" /> যাচাইকৃত
          </span>
        )}
        {!p.available && (
          <span className="absolute right-3 top-3 rounded-full bg-destructive/95 px-2.5 py-1 text-[11px] font-semibold text-destructive-foreground shadow">
            ভাড়া হয়ে গেছে
          </span>
        )}
        <button
          onClick={() => {
            toggle(p.id);
            toast.success(isFav ? "ফেভারিট থেকে সরানো হয়েছে" : "ফেভারিট যুক্ত হয়েছে");
          }}
          className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-surface/95 shadow-soft transition hover:bg-surface"
          aria-label="ফেভারিট"
        >
          <Heart className={`h-4 w-4 ${isFav ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
        </button>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link to="/properties/$id" params={{ id: p.id }}>
              <h3 className="truncate text-base font-bold text-foreground hover:text-primary">{p.title}</h3>
            </Link>
            <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" /> {p.address}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <div className="text-lg font-bold text-primary">৳{bn(p.rent.toLocaleString("en-US"))}</div>
            <div className="text-[11px] text-muted-foreground">প্রতি মাস</div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-4 border-t border-border pt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><BedDouble className="h-4 w-4" /> {bn(p.bedrooms)} বেড</span>
          <span className="flex items-center gap-1"><Bath className="h-4 w-4" /> {bn(p.bathrooms)} বাথ</span>
          <span className="flex items-center gap-1"><Ruler className="h-4 w-4" /> {bn(p.sqft)} sqft</span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link
            to="/properties/$id"
            params={{ id: p.id }}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary-soft py-2 text-xs font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            বিস্তারিত <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary py-2 text-xs font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            <CalendarCheck className="h-3.5 w-3.5" /> ভিজিট বুক
          </button>
          <Link
            to="/apply/$propertyId"
            params={{ propertyId: p.id }}
            className="inline-flex items-center justify-center rounded-xl border border-border py-2 text-xs font-semibold text-foreground hover:bg-muted"
          >
            আবেদন করুন
          </Link>
          <button
            onClick={share}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border py-2 text-xs font-semibold text-foreground hover:bg-muted"
          >
            <Share2 className="h-3.5 w-3.5" /> শেয়ার
          </button>
        </div>
      </div>

      <BookVisitModal open={open} onClose={() => setOpen(false)} propertyId={p.id} propertyTitle={p.title} />
    </article>
  );
}
