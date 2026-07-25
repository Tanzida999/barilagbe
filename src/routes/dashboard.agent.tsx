import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  AGENTS, BUILDINGS, PROPERTIES, TENANTS, buildingSummary, unitsOfBuilding, getTenantPrivate, bn, mapEmbedUrl,
} from "@/lib/mock-data";
import { useAppStore } from "@/lib/store";
import { EmptyState } from "@/components/empty-state";
import { MapPin, Building2, CalendarCheck, Wallet, FileSignature, Phone, Lock } from "lucide-react";

export const Route = createFileRoute("/dashboard/agent")({
  head: () => ({
    meta: [
      { title: "এজেন্ট ড্যাশবোর্ড — বাড়িলাগবে" },
      { name: "description", content: "নিজ এলাকার ভবন, ভিজিট ও কমিশন এক জায়গায় দেখুন।" },
      { property: "og:title", content: "এজেন্ট ড্যাশবোর্ড — বাড়িলাগবে" },
      { property: "og:description", content: "নিজ এলাকার ভবন, ভিজিট ও কমিশন এক জায়গায় দেখুন।" },
    ],
  }),
  component: AgentDash,
});

function AgentDash() {
  const visits = useAppStore((s) => s.visits);
  const role = useAppStore((s) => s.role);
  const [agentId, setAgentId] = useState(AGENTS[0].id);
  const agent = AGENTS.find((a) => a.id === agentId)!;

  const buildings = BUILDINGS.filter((b) => b.agentId === agent.id);
  const unitIds = new Set(buildings.flatMap((b) => b.unitIds));
  const units = PROPERTIES.filter((p) => unitIds.has(p.id));
  const rented = units.filter((u) => !u.available);
  const pendingVisits = visits.filter((v) => unitIds.has(v.propertyId) && v.status === "upcoming");
  const commission = rented.reduce((sum, u) => sum + (u.rent * agent.commissionRate) / 100, 0);

  const cards = [
    { icon: Building2, label: "আমার ভবন", value: bn(buildings.length) },
    { icon: MapPin, label: "মোট ইউনিট", value: bn(units.length) },
    { icon: CalendarCheck, label: "অপেক্ষমাণ ভিজিট", value: bn(pendingVisits.length) },
    { icon: Wallet, label: "কমিশন (মাসিক)", value: `৳${bn(Math.round(commission).toLocaleString("en-US"))}` },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">এজেন্ট ড্যাশবোর্ড</h1>
        <select
          value={agentId}
          onChange={(e) => setAgentId(e.target.value)}
          className="h-9 rounded-lg border border-input bg-surface px-2 text-sm"
          title="এজেন্ট বাছাই"
        >
          {AGENTS.map((a) => (
            <option key={a.id} value={a.id}>{a.name} — {a.thana}</option>
          ))}
        </select>
      </div>

      <div className="rounded-2xl border border-border bg-primary-soft p-4 text-sm text-primary">
        <strong>{agent.name}</strong> — দায়িত্বপ্রাপ্ত এলাকা: {agent.thana} ({agent.mohallas.join(", ")}) · কমিশন {bn(agent.commissionRate)}%
        <a href={`tel:${agent.phoneEn}`} className="ml-2 inline-flex items-center gap-1 font-semibold hover:underline">
          <Phone className="h-3.5 w-3.5" /> {agent.phone}
        </a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="card-lift rounded-2xl border border-border bg-surface p-5 shadow-soft">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary"><c.icon className="h-5 w-5" /></div>
            <div className="mt-3 text-2xl font-bold">{c.value}</div>
            <div className="text-xs text-muted-foreground">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-soft">
        <div className="flex items-center justify-between p-5">
          <h2 className="font-bold">আমার এলাকার মানচিত্র</h2>
          <span className="text-xs text-muted-foreground">{agent.thana}, ঢাকা</span>
        </div>
        <iframe
          title={`এলাকা মানচিত্র: ${agent.thana}`}
          key={agent.thana}
          src={mapEmbedUrl(`${agent.thana}, Dhaka, Bangladesh`)}
          className="h-72 w-full sm:h-96"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
        <h2 className="font-bold">আমার কাজের ধাপ</h2>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "এলাকা বরাদ্দ", d: "থানা ও মহল্লা অনুযায়ী দায়িত্ব।" },
            { t: "মালিকের সাথে দেখা", d: "সরাসরি বাসায় গিয়ে কথা বলা।" },
            { t: "ব্যবস্থাপনা চুক্তি", d: "লিস্টিং তৈরির আগেই চুক্তি স্বাক্ষর।" },
            { t: "ভবন ও ছবি যুক্ত", d: "ইউনিটসহ ভবনের তথ্য আপলোড।" },
          ].map((s, i) => (
            <li key={s.t} className="rounded-xl border border-border p-4">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">{bn(i + 1)}</div>
              <div className="mt-2 text-sm font-bold">{s.t}</div>
              <p className="text-xs text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
        <h2 className="font-bold">আমার এলাকার ভবন</h2>
        {buildings.length === 0 ? <EmptyState title="কোনো ভবন নেই" /> : (
          <div className="mt-4 space-y-4">
            {buildings.map((b) => {
              const s = buildingSummary(b.id);
              return (
                <div key={b.id} className="rounded-xl border border-border p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="font-semibold">{b.name}</div>
                      <div className="text-xs text-muted-foreground">{b.address} · {bn(b.floors)} তলা</div>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="rounded-full bg-secondary/20 px-2 py-0.5 font-semibold text-secondary">ভাড়া {bn(s.rented)}</span>
                      <span className="rounded-full bg-accent/20 px-2 py-0.5 font-semibold text-accent-foreground">ফাঁকা {bn(s.vacant)}</span>
                      <span className="inline-flex items-center gap-1 text-muted-foreground"><FileSignature className="h-3.5 w-3.5" /> চুক্তি {new Date(b.agreementSignedAt).toLocaleDateString("bn-BD")}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {unitsOfBuilding(b.id).map((u) => (
                      <Link key={u.id} to="/properties/$id" params={{ id: u.id }} className="rounded-lg border border-border px-3 py-1.5 text-xs hover:border-primary hover:text-primary">
                        {u.type} · {bn(u.floor)} তলা · ৳{bn(u.rent.toLocaleString("en-US"))}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <PrivateTenants role={role} unitIds={unitIds} />

      <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
        <h2 className="font-bold">অপেক্ষমাণ ভিজিট</h2>
        {pendingVisits.length === 0 ? <EmptyState title="কোনো ভিজিট নেই" description="নতুন ভিজিট রিকোয়েস্ট এলে এখানে দেখাবে।" /> : (
          <ul className="mt-4 space-y-2">
            {pendingVisits.map((v) => (
              <li key={v.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border p-3 text-sm">
                <span className="font-medium">{v.visitorName} · {v.phone}</span>
                <span className="text-muted-foreground">{v.date} — {v.time}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/** গোপন ভাড়াটিয়া তথ্য — শুধু অ্যাডমিন, এজেন্ট ও আইনজীবী দেখতে পান। */
function PrivateTenants({ role, unitIds }: { role: string; unitIds: Set<string> }) {
  const allowed = role === "admin" || role === "agent";
  const tenants = TENANTS.filter((t) => t.propertyId && unitIds.has(t.propertyId)).slice(0, 6);

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
      <div className="flex items-center gap-2">
        <Lock className="h-4 w-4 text-primary" />
        <h2 className="font-bold">ভাড়াটিয়ার গোপন প্রোফাইল</h2>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">এই তথ্য শুধু অ্যাডমিন, এজেন্ট ও আইনজীবী দেখতে পান — ভাড়াটিয়া বা সাধারণ ব্যবহারকারীর জন্য নয়।</p>
      {!allowed ? (
        <div className="mt-4 rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          দেখার অনুমতি নেই। উপরের ভূমিকা থেকে “এজেন্ট” বা “অ্যাডমিন” নির্বাচন করুন।
        </div>
      ) : tenants.length === 0 ? (
        <EmptyState title="এই এলাকায় কোনো সক্রিয় ভাড়াটিয়া নেই" />
      ) : (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {tenants.map((t) => {
            const pvt = getTenantPrivate(t.id, role)!;
            return (
              <div key={t.id} className="flex gap-3 rounded-xl border border-border p-3">
                <img src={pvt.photo} alt={`${t.name} এর ছবি`} className="h-16 w-16 shrink-0 rounded-lg object-cover" loading="lazy" />
                <div className="min-w-0 text-sm">
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">এনআইডি: {pvt.nid} {pvt.nidVerified ? "✓ যাচাইকৃত" : "· অযাচাইকৃত"}</div>
                  <div className="text-xs text-muted-foreground">স্থায়ী ঠিকানা: {pvt.permanentAddress}</div>
                  <div className="text-xs text-muted-foreground">জরুরি যোগাযোগ: {pvt.emergencyContact}</div>
                  <div className="mt-1 text-xs text-muted-foreground">পূর্ব ইতিহাস: {pvt.history[0].property} ({pvt.history[0].from}–{pvt.history[0].to}) — {pvt.history[0].note}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
