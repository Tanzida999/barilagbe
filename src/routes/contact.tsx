import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Crumbs } from "@/components/site-chrome";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { z } from "zod";
import { Phone, Mail, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "যোগাযোগ — বাড়িলাগবে" }] }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "নাম দিন").max(100),
  email: z.string().email("সঠিক ইমেইল").max(255),
  message: z.string().trim().min(10, "কমপক্ষে ১০ অক্ষর").max(1000),
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const r = schema.safeParse(form);
    if (!r.success) { const e: Record<string, string> = {}; r.error.issues.forEach((i) => (e[i.path[0] as string] = i.message)); setErrs(e); return; }
    setErrs({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    toast.success("বার্তা পাঠানো হয়েছে");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <PageShell>
      <Crumbs items={[{ label: "হোম", to: "/" }, { label: "যোগাযোগ" }]} />
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold">যোগাযোগ করুন</h1>
          <p className="mt-2 text-muted-foreground">যেকোনো প্রশ্ন বা সহায়তার জন্য আমাদের জানান।</p>
          <div className="mt-6 space-y-4 text-sm">
            <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-primary" /> ০৯৬১১-২৩৪৫৬৭</div>
            <div className="flex items-center gap-3"><Mail className="h-5 w-5 text-primary" /> hello@barilagbe.com.bd</div>
            <div className="flex items-center gap-3"><MapPin className="h-5 w-5 text-primary" /> ঢাকা, বাংলাদেশ</div>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
          <div className="space-y-3">
            <div><Label>নাম</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />{errs.name && <p className="mt-1 text-xs text-destructive">{errs.name}</p>}</div>
            <div><Label>ইমেইল</Label><Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />{errs.email && <p className="mt-1 text-xs text-destructive">{errs.email}</p>}</div>
            <div><Label>বার্তা</Label><Textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />{errs.message && <p className="mt-1 text-xs text-destructive">{errs.message}</p>}</div>
          </div>
          <Button onClick={submit} disabled={loading} className="mt-4 w-full">{loading ? "পাঠাচ্ছি..." : "পাঠান"}</Button>
        </div>
      </div>
    </PageShell>
  );
}
