import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";
import { useAppStore, type Role } from "@/lib/store";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "লগইন — বাড়িলাগবে" }] }),
  component: LoginPage,
});

const schema = z.object({ email: z.string().email("সঠিক ইমেইল দিন"), password: z.string().min(6, "কমপক্ষে ৬ অক্ষর") });

function LoginPage() {
  const setRole = useAppStore((s) => s.setRole);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [role, setRoleSel] = useState<Role>("tenant");
  const [errs, setErrs] = useState<Record<string, string>>({});

  const submit = () => {
    const r = schema.safeParse(form);
    if (!r.success) { const e: Record<string, string> = {}; r.error.issues.forEach((i) => (e[i.path[0] as string] = i.message)); setErrs(e); return; }
    setRole(role);
    toast.success("লগইন সফল");
    navigate({ to: role === "owner" ? "/dashboard/owner" : role === "admin" ? "/dashboard/admin" : "/dashboard/tenant" });
  };

  return (
    <PageShell>
      <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-12">
        <div className="w-full rounded-2xl border border-border bg-surface p-8 shadow-soft">
          <h1 className="text-2xl font-bold">লগইন</h1>
          <p className="mt-1 text-sm text-muted-foreground">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
          <div className="mt-6 space-y-3">
            <div>
              <Label>ভূমিকা</Label>
              <div className="mt-1 grid grid-cols-3 gap-2">
                {(["tenant", "owner", "admin"] as Role[]).map((r) => (
                  <button key={r} onClick={() => setRoleSel(r)} className={`rounded-lg border px-3 py-2 text-sm font-semibold ${role === r ? "border-primary bg-primary-soft text-primary" : "border-border"}`}>
                    {r === "tenant" ? "ভাড়াটিয়া" : r === "owner" ? "মালিক" : "অ্যাডমিন"}
                  </button>
                ))}
              </div>
            </div>
            <div><Label>ইমেইল</Label><Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />{errs.email && <p className="mt-1 text-xs text-destructive">{errs.email}</p>}</div>
            <div><Label>পাসওয়ার্ড</Label><Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />{errs.password && <p className="mt-1 text-xs text-destructive">{errs.password}</p>}</div>
          </div>
          <Button onClick={submit} className="mt-5 w-full">লগইন</Button>
          <p className="mt-4 text-center text-sm text-muted-foreground">অ্যাকাউন্ট নেই? <Link to="/register" className="text-primary hover:underline">রেজিস্টার</Link></p>
        </div>
      </div>
    </PageShell>
  );
}
