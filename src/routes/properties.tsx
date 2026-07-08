import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PageShell, Crumbs } from "@/components/site-chrome";
import { PropertyCard } from "@/components/property-card";
import { EmptyState, SkeletonCard } from "@/components/empty-state";
import {
  PROPERTIES,
  THANAS,
  AREAS_BY_THANA,
  PROPERTY_TYPES,
  bn,
  mapEmbedUrl,
} from "@/lib/mock-data";
import { useAppStore } from "@/lib/store";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, SlidersHorizontal, Grid3x3, List, Map as MapIcon, Bookmark, X, MapPin } from "lucide-react";
import { z } from "zod";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { toast } from "sonner";

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
  thana: fallback(z.string(), "").default(""),
  area: fallback(z.string(), "").default(""),
  type: fallback(z.string(), "").default(""),
  bedrooms: fallback(z.number(), 0).default(0),
  bathrooms: fallback(z.number(), 0).default(0),
  minRent: fallback(z.number(), 0).default(0),
  maxRent: fallback(z.number(), 0).default(0),
  minSqft: fallback(z.number(), 0).default(0),
  parking: fallback(z.boolean(), false).default(false),
  verified: fallback(z.boolean(), false).default(false),
  available: fallback(z.boolean(), false).default(false),
  sort: fallback(z.string(), "newest").default("newest"),
  view: fallback(z.string(), "grid").default("grid"),
  page: fallback(z.number(), 1).default(1),
});

export const Route = createFileRoute("/properties")({
  head: () => ({ meta: [{ title: "ঢাকায় বাসা খুঁজুন — বাড়িলাগবে" }] }),
  validateSearch: zodValidator(searchSchema),
  component: SearchPage,
  errorComponent: ({ error }) => <div className="p-8">{error.message}</div>,
});

const PER_PAGE = 9;

// Lowercase-search index so filter runs are O(n) with cheap includes.
const INDEX = PROPERTIES.map((p) => ({
  p,
  hay: (p.title + " " + p.address + " " + p.thana + " " + p.area).toLowerCase(),
}));

function SearchPage() {
  const params = Route.useSearch();
  const navigate = useNavigate({ from: "/properties" });
  const [loading, setLoading] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const saveSearch = useAppStore((s) => s.saveSearch);

  // Debounced text input so typing doesn't spam URL updates.
  const [qLocal, setQLocal] = useState(params.q);
  const qDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => setQLocal(params.q), [params.q]);
  const onQChange = (v: string) => {
    setQLocal(v);
    if (qDebounceRef.current) clearTimeout(qDebounceRef.current);
    qDebounceRef.current = setTimeout(() => {
      navigate({ search: (prev: any) => ({ ...prev, q: v, page: 1 }) as any });
    }, 250);
  };

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 150);
    return () => clearTimeout(t);
  }, [JSON.stringify(params)]);

  const set = (patch: Partial<typeof params>) =>
    navigate({ search: (prev: any) => ({ ...prev, ...patch, page: 1 }) as any });

  const areaOptions = params.thana ? AREAS_BY_THANA[params.thana] ?? [] : [];

  const filtered = useMemo(() => {
    const q = params.q.trim().toLowerCase();
    let arr = INDEX.filter(({ p, hay }) => {
      if (q && !hay.includes(q)) return false;
      if (params.thana && p.thana !== params.thana) return false;
      if (params.area && p.area !== params.area) return false;
      if (params.type && p.type !== params.type) return false;
      if (params.bedrooms && p.bedrooms < params.bedrooms) return false;
      if (params.bathrooms && p.bathrooms < params.bathrooms) return false;
      if (params.minRent && p.rent < params.minRent) return false;
      if (params.maxRent && p.rent > params.maxRent) return false;
      if (params.minSqft && p.sqft < params.minSqft) return false;
      if (params.parking && !p.parking) return false;
      if (params.verified && !p.verified) return false;
      if (params.available && !p.available) return false;
      return true;
    }).map((x) => x.p);
    switch (params.sort) {
      case "rent_asc": arr = [...arr].sort((a, b) => a.rent - b.rent); break;
      case "rent_desc": arr = [...arr].sort((a, b) => b.rent - a.rent); break;
      case "popular": arr = [...arr].sort((a, b) => b.popularity - a.popularity); break;
      case "recent":
      case "newest":
      default: arr = [...arr].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    }
    return arr;
  }, [params]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(params.page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const reset = () => { setQLocal(""); navigate({ search: {} as any }); };
  const doSave = () => {
    const label = window.prompt("সার্চের নাম দিন", `সার্চ ${new Date().toLocaleDateString("bn-BD")}`);
    if (!label) return;
    saveSearch(label, JSON.stringify(params));
    toast.success("সার্চ সংরক্ষিত");
  };

  // Map query: focus on selected area/thana, else all of Dhaka.
  const mapQuery =
    params.area ? `${params.area}, ${params.thana}, Dhaka, Bangladesh`
    : params.thana ? `${params.thana}, Dhaka, Bangladesh`
    : "Dhaka, Bangladesh";

  return (
    <PageShell>
      <Crumbs items={[{ label: "হোম", to: "/" }, { label: "বাসা খুঁজুন" }]} />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={qLocal}
              onChange={(e) => onQChange(e.target.value)}
              placeholder="থানা, এলাকা বা ঠিকানা লিখুন..."
              className="h-11 w-full rounded-xl border border-input bg-surface pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary-soft"
            />
          </div>
          <button onClick={() => setShowFilters((v) => !v)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold hover:bg-muted lg:hidden">
            <SlidersHorizontal className="h-4 w-4" /> ফিল্টার
          </button>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className={`${showFilters ? "block" : "hidden"} lg:block`}>
            <div className="rounded-2xl border border-border bg-surface p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <h3 className="font-bold">ফিল্টার</h3>
                <button onClick={reset} className="text-xs text-primary hover:underline">রিসেট</button>
              </div>
              <div className="mt-4 space-y-3">
                <div className="rounded-lg bg-primary-soft px-3 py-2 text-xs font-semibold text-primary">
                  <MapPin className="mr-1 inline h-3 w-3" /> শহর: ঢাকা
                </div>
                <Select label="থানা" value={params.thana} onChange={(v) => set({ thana: v, area: "" })} options={["", ...THANAS]} />
                <Select label="এলাকা" value={params.area} onChange={(v) => set({ area: v })} options={["", ...areaOptions]} disabled={!params.thana} />
                <Select label="সম্পত্তির ধরন" value={params.type} onChange={(v) => set({ type: v })} options={["", ...PROPERTY_TYPES]} />
                <NumSelect label="বেডরুম (কমপক্ষে)" value={params.bedrooms} onChange={(v) => set({ bedrooms: v })} options={[0, 1, 2, 3, 4]} />
                <NumSelect label="বাথরুম (কমপক্ষে)" value={params.bathrooms} onChange={(v) => set({ bathrooms: v })} options={[0, 1, 2, 3]} />
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">সর্বোচ্চ ভাড়া: ৳{bn((params.maxRent || 60000).toLocaleString("en-US"))}</label>
                  <input type="range" min={0} max={60000} step={1000} value={params.maxRent || 60000} onChange={(e) => set({ maxRent: Number(e.target.value) })} className="mt-2 w-full accent-primary" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">সর্বনিম্ন sqft: {bn(params.minSqft)}</label>
                  <input type="range" min={0} max={2500} step={100} value={params.minSqft} onChange={(e) => set({ minSqft: Number(e.target.value) })} className="mt-2 w-full accent-primary" />
                </div>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={params.parking} onChange={(e) => set({ parking: e.target.checked })} className="accent-primary" /> পার্কিং</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={params.verified} onChange={(e) => set({ verified: e.target.checked })} className="accent-primary" /> শুধু যাচাইকৃত</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={params.available} onChange={(e) => set({ available: e.target.checked })} className="accent-primary" /> শুধু ফাঁকা</label>
              </div>
              <button onClick={doSave} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border py-2 text-sm font-semibold hover:bg-muted">
                <Bookmark className="h-4 w-4" /> সার্চ সংরক্ষণ
              </button>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground"><strong className="text-foreground">{bn(filtered.length)}</strong> টি বাসা পাওয়া গেছে</p>
              <div className="flex flex-wrap items-center gap-2">
                <select value={params.sort} onChange={(e) => set({ sort: e.target.value })} className="h-9 rounded-lg border border-input bg-surface px-2 text-sm">
                  <option value="newest">সবচেয়ে নতুন</option>
                  <option value="recent">সদ্য যুক্ত</option>
                  <option value="rent_asc">কম ভাড়া</option>
                  <option value="rent_desc">বেশি ভাড়া</option>
                  <option value="popular">জনপ্রিয়</option>
                </select>
                <div className="flex overflow-hidden rounded-lg border border-border">
                  <button onClick={() => set({ view: "grid" })} className={`grid h-9 w-9 place-items-center ${params.view === "grid" ? "bg-primary text-primary-foreground" : "bg-surface hover:bg-muted"}`}><Grid3x3 className="h-4 w-4" /></button>
                  <button onClick={() => set({ view: "list" })} className={`grid h-9 w-9 place-items-center ${params.view === "list" ? "bg-primary text-primary-foreground" : "bg-surface hover:bg-muted"}`}><List className="h-4 w-4" /></button>
                </div>
                <button onClick={() => setShowMap((v) => !v)} className={`inline-flex h-9 items-center gap-1.5 rounded-lg border border-border px-3 text-sm font-medium ${showMap ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
                  <MapIcon className="h-4 w-4" /> ম্যাপ
                </button>
              </div>
            </div>

            {showMap && (
              <div className="mt-4 overflow-hidden rounded-2xl border border-border">
                <iframe
                  title={`মানচিত্র: ${mapQuery}`}
                  key={mapQuery}
                  src={mapEmbedUrl(mapQuery)}
                  className="h-72 w-full sm:h-96"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="flex flex-wrap gap-2 border-t border-border bg-surface p-3">
                  {pageItems.slice(0, 6).map((p) => (
                    <Link key={p.id} to="/properties/$id" params={{ id: p.id }} className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary hover:bg-primary hover:text-primary-foreground">
                      <MapPin className="h-3 w-3" /> {p.area}, {p.thana}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6">
              {loading ? (
                <div className={`grid gap-6 ${params.view === "grid" ? "sm:grid-cols-2 lg:grid-cols-3" : ""}`}>
                  {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
                </div>
              ) : pageItems.length === 0 ? (
                <EmptyState icon={Search} title="কোনো বাসা পাওয়া যায়নি" description="ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।" action={<button onClick={reset} className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"><X className="h-4 w-4" /> ফিল্টার রিসেট</button>} />
              ) : (
                <div className={`grid gap-6 ${params.view === "grid" ? "sm:grid-cols-2 lg:grid-cols-3" : ""}`}>
                  {pageItems.map((p) => <PropertyCard key={p.id} p={p} variant={params.view as any} />)}
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button key={n} onClick={() => navigate({ search: (prev: any) => ({ ...prev, page: n }) as any })} className={`grid h-9 w-9 place-items-center rounded-lg text-sm font-semibold ${n === currentPage ? "bg-primary text-primary-foreground" : "border border-border bg-surface hover:bg-muted"}`}>
                    {bn(n)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function Select({ label, value, onChange, options, disabled }: { label: string; value: string; onChange: (v: string) => void; options: string[]; disabled?: boolean }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      <select disabled={disabled} value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 h-10 w-full rounded-lg border border-input bg-surface px-2 text-sm disabled:opacity-50">
        {options.map((o) => <option key={o} value={o}>{o === "" ? "সব" : o}</option>)}
      </select>
    </label>
  );
}
function NumSelect({ label, value, onChange, options }: { label: string; value: number; onChange: (v: number) => void; options: number[] }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      <select value={value} onChange={(e) => onChange(Number(e.target.value))} className="mt-1 h-10 w-full rounded-lg border border-input bg-surface px-2 text-sm">
        {options.map((o) => <option key={o} value={o}>{o === 0 ? "যেকোনো" : bn(o) + "+"}</option>)}
      </select>
    </label>
  );
}
