import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { z } from "zod";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "রেজিস্টার — বাড়িলাগবে" }] }),
  component: RegisterPage,
});

const schema = z.object({
  name: z.string().min(2, "নাম দিন"),
  email: z.string().email("সঠিক ইমেইল"),
  phone: z.string().min(11, "সঠিক ফোন"),
  password: z.string().min(6, "কমপক্ষে ৬ অক্ষর"),
});

function RegisterPage() {
  const navigate = useNavigate();
  const setRole = useAppStore((s) => s.setRole);
  const updateProfile = useAppStore((s) => s.updateProfile);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [errs, setErrs] = useState<Record<string, string>>({});

  const submit = () => {
    const r = schema.safeParse(form);
    if (!r.success) { const e: Record<string, string> = {}; r.error.issues.forEach((i) => (e[i.path[0] as string] = i.message)); setErrs(e); return; }
    setRole("tenant");
    updateProfile({ name: form.name, email: form.email, phone: form.phone });
    toast.success("রেজিস্ট্রেশন সফল");
    navigate({ to: "/dashboard/tenant" });
  };

  return (
    <PageShell>
      <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-12">
        <div className="w-full rounded-2xl border border-border bg-surface p-8 shadow-soft">
          <h1 className="text-2xl font-bold">নতুন অ্যাকাউন্ট</h1>
          <div className="mt-6 space-y-3">
            <div><Label>নাম</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />{errs.name && <p className="mt-1 text-xs text-destructive">{errs.name}</p>}</div>
            <div><Label>ইমেইল</Label><Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />{errs.email && <p className="mt-1 text-xs text-destructive">{errs.email}</p>}</div>
            <div><Label>ফোন</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />{errs.phone && <p className="mt-1 text-xs text-destructive">{errs.phone}</p>}</div>
            <div><Label>পাসওয়ার্ড</Label><Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />{errs.password && <p className="mt-1 text-xs text-destructive">{errs.password}</p>}</div>
          </div>
          <Button onClick={submit} className="mt-5 w-full">রেজিস্টার</Button>
          <p className="mt-4 text-center text-sm text-muted-foreground">ইতিমধ্যে অ্যাকাউন্ট? <Link to="/login" className="text-primary hover:underline">লগইন</Link></p>
        </div>
      </div>
    </PageShell>
  );
}
