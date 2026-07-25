import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell, Crumbs } from "@/components/site-chrome";
import { BookVisitModal } from "@/components/book-visit-modal";
import { PropertyMap } from "@/components/property-map";
import { getProperty, getOwner, getBuilding, getAgent, unitsOfBuilding, bn, mapLinkUrl } from "@/lib/mock-data";
import { useAppStore } from "@/lib/store";
import { useState } from "react";
import {
  MapPin, BedDouble, Bath, Ruler, ShieldCheck, Heart, Share2, Phone, MessageCircle,
  Flag, CalendarCheck, ChevronLeft, ChevronRight, X, Check, ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/properties/$id")({
  loader: ({ params }) => {
    const p = getProperty(params.id);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.title ?? "সম্পত্তি"} — বাড়িলাগবে` }] }),
  component: PropertyDetail,
  errorComponent: ({ error }) => <div className="p-8 text-destructive">{error.message}</div>,
  notFoundComponent: () => (
    <PageShell>
      <div className="mx-auto max-w-3xl p-12 text-center">
        <h1 className="text-3xl font-bold">সম্পত্তি পাওয়া যায়নি</h1>
        <Link to="/properties" className="mt-4 inline-block text-primary underline">সব সম্পত্তি দেখুন</Link>
      </div>
    </PageShell>
  ),
});

function PropertyDetail() {
  const p = Route.useLoaderData();
  const owner = getOwner(p.ownerId);
  const [imgIdx, setImgIdx] = useState(0);
  const [full, setFull] = useState(false);
  const [visitOpen, setVisitOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const favorites = useAppStore((s) => s.favorites);
  const toggle = useAppStore((s) => s.toggleFavorite);
  const isFav = favorites.includes(p.id);

  const next = () => setImgIdx((i) => (i + 1) % p.images.length);
  const prev = () => setImgIdx((i) => (i - 1 + p.images.length) % p.images.length);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: p.title, url });
      else { await navigator.clipboard.writeText(url); toast.success("লিংক কপি হয়েছে"); }
    } catch {}
  };

  return (
    <PageShell>
      <Crumbs items={[{ label: "হোম", to: "/" }, { label: "বাসা খুঁজুন", to: "/properties" }, { label: p.title }]} />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="relative overflow-hidden rounded-2xl border border-border bg-surface">
              <img src={p.images[imgIdx]} alt={p.title} className="h-80 w-full cursor-zoom-in object-cover sm:h-[480px]" onClick={() => setFull(true)} />
              <button onClick={prev} className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-surface/95 shadow"><ChevronLeft /></button>
              <button onClick={next} className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-surface/95 shadow"><ChevronRight /></button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs text-white">{bn(imgIdx + 1)} / {bn(p.images.length)}</div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {p.images.map((src: string, i: number) => (
                <button key={i} onClick={() => setImgIdx(i)} className={`overflow-hidden rounded-xl border-2 ${i === imgIdx ? "border-primary" : "border-transparent"}`}>
                  <img src={src} className="h-24 w-full object-cover" alt="" />
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold">{p.title}</h1>
                  <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-4 w-4" /> {p.address}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.verified && <Badge tone="secondary"><ShieldCheck className="h-3 w-3" /> যাচাইকৃত</Badge>}
                    <Badge tone="muted">{p.type}</Badge>
                    <Badge tone={p.available ? "primary" : "destructive"}>{p.available ? "ফাঁকা" : "ভাড়া হয়েছে"}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">৳{bn(p.rent.toLocaleString("en-US"))}</div>
                  <div className="text-xs text-muted-foreground">প্রতি মাস</div>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-5 text-sm">
                <Stat icon={BedDouble} label="বেডরুম" value={`${bn(p.bedrooms)} টি`} />
                <Stat icon={Bath} label="বাথরুম" value={`${bn(p.bathrooms)} টি`} />
                <Stat icon={Ruler} label="আকার" value={`${bn(p.sqft)} sqft`} />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                <Stat icon={Ruler} label="তলা" value={p.floor === 0 ? "নিচতলা" : `${bn(p.floor)} তলা`} />
                <Stat icon={Ruler} label="প্রধান সড়ক থেকে" value={`${bn(p.roadDistance)} মিটার`} />
                <Stat icon={Ruler} label="ভবন" value={getBuilding(p.buildingId)?.name ?? "—"} />
              </div>
              {(() => {
                const b = getBuilding(p.buildingId);
                if (!b) return null;
                const others = unitsOfBuilding(b.id).filter((u) => u.id !== p.id);
                return (
                  <div className="mt-5 rounded-xl border border-border p-4">
                    <div className="text-sm font-semibold">{b.name} — এই ভবনের অন্যান্য ইউনিট</div>
                    <div className="text-xs text-muted-foreground">{bn(b.floors)} তলা · মোট {bn(b.unitIds.length)} ইউনিট · এলাকার এজেন্ট: {getAgent(b.agentId)?.name}</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {others.length === 0 ? <span className="text-xs text-muted-foreground">অন্য কোনো ইউনিট নেই</span> : others.map((u) => (
                        <Link key={u.id} to="/properties/$id" params={{ id: u.id }} className="rounded-lg border border-border px-3 py-1.5 text-xs hover:border-primary hover:text-primary">
                          {u.type} · {u.floor === 0 ? "নিচতলা" : `${bn(u.floor)} তলা`} · ৳{bn(u.rent.toLocaleString("en-US"))} {u.available ? "" : "(ভাড়া হয়েছে)"}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })()}
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
              <div className="mt-3 text-xs text-muted-foreground">উপলব্ধ: {new Date(p.availableFrom).toLocaleDateString("bn-BD")}</div>
            </div>

            <Section title="সুবিধা">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {p.amenities.map((a: string) => (
                  <div key={a} className="flex items-center gap-2 rounded-lg bg-primary-soft px-3 py-2 text-sm text-primary"><Check className="h-4 w-4" /> {a}</div>
                ))}
              </div>
            </Section>

            <Section title="ভাড়ার নিয়ম">
              <ul className="space-y-2 text-sm">
                {p.rules.map((r: string) => <li key={r} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> {r}</li>)}
              </ul>
            </Section>

            <Section title="অবস্থান">
              <div className="flex items-center gap-2 rounded-lg bg-muted p-3 text-sm">
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                <span className="flex-1 font-medium">{p.address}</span>
                <a
                  href={mapLinkUrl(`${p.address}, Dhaka, Bangladesh`)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  ম্যাপে দেখুন <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <div className="mt-3">
                <PropertyMap lat={p.lat} lng={p.lng} title={p.title} address={p.address} />
              </div>
              <div className="mt-3 text-sm text-muted-foreground">নিকটস্থ: স্কুল ৫ মিনিট • বাজার ৩ মিনিট • হাসপাতাল ৮ মিনিট</div>
            </Section>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-border bg-surface p-5 shadow-soft">
              <h3 className="font-bold">দ্রুত পদক্ষেপ</h3>
              <div className="mt-4 space-y-2">
                <button onClick={() => setVisitOpen(true)} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"><CalendarCheck className="h-4 w-4" /> ভিজিট বুক করুন</button>
                <Link to="/apply/$propertyId" params={{ propertyId: p.id }} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-2.5 text-sm font-semibold text-accent-foreground hover:brightness-105">আবেদন করুন</Link>
                <div className="grid grid-cols-2 gap-2">
                  <a href={`tel:+880${(owner?.phoneEn ?? "").slice(1)}`} className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border py-2 text-sm font-semibold hover:bg-muted"><Phone className="h-4 w-4" /> কল</a>
                  <a href={`https://wa.me/880${(owner?.phoneEn ?? "").slice(1)}?text=${encodeURIComponent(`বাড়িলাগবে থেকে ${p.title} সম্পর্কে জানতে চাই।`)}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border py-2 text-sm font-semibold hover:bg-muted"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
                  <button onClick={() => { toggle(p.id); toast.success(isFav ? "সরানো হয়েছে" : "ফেভারিট"); }} className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border py-2 text-sm font-semibold hover:bg-muted"><Heart className={`h-4 w-4 ${isFav ? "fill-destructive text-destructive" : ""}`} /> সেভ</button>
                  <button onClick={share} className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border py-2 text-sm font-semibold hover:bg-muted"><Share2 className="h-4 w-4" /> শেয়ার</button>
                </div>
                <button onClick={() => setReportOpen(true)} className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-border py-2 text-xs font-medium text-muted-foreground hover:bg-muted"><Flag className="h-3.5 w-3.5" /> লিস্টিং রিপোর্ট</button>
              </div>
            </div>

            {owner && (
              <div className="rounded-2xl border border-border bg-surface p-5 shadow-soft">
                <h3 className="font-bold">মালিকের তথ্য</h3>
                <div className="mt-3 flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-primary text-lg font-bold text-primary-foreground">{owner.name[0]}</div>
                  <div>
                    <div className="font-semibold">{owner.name}</div>
                    <div className="text-xs text-muted-foreground">{owner.phone}</div>
                  </div>
                </div>
                <div className="mt-3 text-xs text-muted-foreground">সদস্য {new Date(owner.joinedAt).toLocaleDateString("bn-BD")} থেকে</div>
              </div>
            )}
          </aside>
        </div>
      </div>

      {full && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/90 p-4" onClick={() => setFull(false)}>
          <button className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white"><X /></button>
          <img src={p.images[imgIdx]} className="max-h-full max-w-full object-contain" alt="" />
        </div>
      )}

      <BookVisitModal open={visitOpen} onClose={() => setVisitOpen(false)} propertyId={p.id} propertyTitle={p.title} />
      <ReportDialog open={reportOpen} onClose={() => setReportOpen(false)} />
    </PageShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}
function Stat({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted p-3">
      <Icon className="h-5 w-5 text-primary" />
      <div className="mt-2 text-xs text-muted-foreground">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}
function Badge({ children, tone }: { children: React.ReactNode; tone: "primary" | "secondary" | "muted" | "destructive" }) {
  const cls = {
    primary: "bg-primary-soft text-primary",
    secondary: "bg-secondary/15 text-secondary",
    muted: "bg-muted text-muted-foreground",
    destructive: "bg-destructive/15 text-destructive",
  }[tone];
  return <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${cls}`}>{children}</span>;
}
function ReportDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [reason, setReason] = useState("");
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <DialogHeader><DialogTitle>লিস্টিং রিপোর্ট</DialogTitle></DialogHeader>
        <Textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="সমস্যা বিবরণ দিন..." rows={4} />
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>বাতিল</Button>
          <Button onClick={() => { toast.success("রিপোর্ট পাঠানো হয়েছে"); onClose(); setReason(""); }}>জমা দিন</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
