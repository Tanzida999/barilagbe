import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Crumbs } from "@/components/site-chrome";
import { useAppStore } from "@/lib/store";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { User } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "প্রোফাইল — বাড়িলাগবে" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const profile = useAppStore((s) => s.profile);
  const update = useAppStore((s) => s.updateProfile);
  const [form, setForm] = useState(profile);
  const [pw, setPw] = useState({ old: "", new1: "", new2: "" });

  const save = () => {
    update(form);
    toast.success("প্রোফাইল আপডেট হয়েছে");
  };
  const changePw = () => {
    if (pw.new1.length < 6) return toast.error("পাসওয়ার্ড কমপক্ষে ৬ অক্ষর");
    if (pw.new1 !== pw.new2) return toast.error("পাসওয়ার্ড মেলেনি");
    toast.success("পাসওয়ার্ড পরিবর্তিত");
    setPw({ old: "", new1: "", new2: "" });
  };
  const upload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    const r = new FileReader(); r.onload = () => { setForm({ ...form, avatar: String(r.result) }); toast.success("ছবি আপডেট"); }; r.readAsDataURL(f);
  };

  return (
    <PageShell>
      <Crumbs items={[{ label: "হোম", to: "/" }, { label: "প্রোফাইল" }]} />
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-8 sm:px-6">
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
          <div className="flex items-center gap-4">
            {form.avatar ? <img src={form.avatar} alt="" className="h-20 w-20 rounded-full object-cover" /> : (
              <div className="grid h-20 w-20 place-items-center rounded-full bg-primary text-2xl font-bold text-primary-foreground"><User className="h-8 w-8" /></div>
            )}
            <label className="cursor-pointer rounded-lg border border-border px-3 py-1.5 text-sm font-semibold hover:bg-muted">
              ছবি পরিবর্তন <input type="file" accept="image/*" className="hidden" onChange={upload} />
            </label>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div><Label>নাম</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label>ইমেইল</Label><Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            <div><Label>ফোন</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
            <div><Label>ভাষা</Label>
              <select value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value as any })} className="mt-1 h-10 w-full rounded-md border border-input bg-surface px-3 text-sm">
                <option value="bn">বাংলা</option><option value="en">English</option>
              </select>
            </div>
          </div>
          <Button onClick={save} className="mt-5">সংরক্ষণ</Button>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
          <h2 className="font-bold">পাসওয়ার্ড পরিবর্তন</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div><Label>পুরনো</Label><Input type="password" value={pw.old} onChange={(e) => setPw({ ...pw, old: e.target.value })} /></div>
            <div><Label>নতুন</Label><Input type="password" value={pw.new1} onChange={(e) => setPw({ ...pw, new1: e.target.value })} /></div>
            <div><Label>পুনরায়</Label><Input type="password" value={pw.new2} onChange={(e) => setPw({ ...pw, new2: e.target.value })} /></div>
          </div>
          <Button onClick={changePw} variant="outline" className="mt-4">পরিবর্তন করুন</Button>
        </div>
      </div>
    </PageShell>
  );
}
