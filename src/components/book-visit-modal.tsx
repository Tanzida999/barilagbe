import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useAppStore } from "@/lib/store";
import { getProperty, needsAdvance, advanceAmount, bn } from "@/lib/mock-data";
import { z } from "zod";

const schema = z.object({
  date: z.string().min(1, "তারিখ দিন"),
  time: z.string().min(1, "সময় দিন"),
  name: z.string().trim().min(2, "নাম দিন").max(80),
  phone: z.string().trim().min(11, "সঠিক ফোন নম্বর দিন").max(20),
});

export function BookVisitModal({
  open,
  onClose,
  propertyId,
  propertyTitle,
}: {
  open: boolean;
  onClose: () => void;
  propertyId: string;
  propertyTitle: string;
}) {
  const addVisit = useAppStore((s) => s.addVisit);
  const paidAdvances = useAppStore((s) => s.paidAdvances);
  const payAdvance = useAppStore((s) => s.payAdvance);
  const property = getProperty(propertyId);
  const rent = property?.rent ?? 0;
  const advanceRequired = needsAdvance(rent);
  const advance = advanceAmount(rent);
  const advancePaid = paidAdvances.includes(propertyId);
  const [paying, setPaying] = useState(false);

  const doPayAdvance = async () => {
    setPaying(true);
    await new Promise((r) => setTimeout(r, 600));
    payAdvance(propertyId);
    setPaying(false);
    toast.success("অগ্রিম পরিশোধ হয়েছে", { description: `৳${bn(advance.toLocaleString("en-US"))} জমা হয়েছে।` });
  };
  const [form, setForm] = useState({ date: "", time: "১০:০০", name: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const res = schema.safeParse(form);
    if (!res.success) {
      const errs: Record<string, string> = {};
      res.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    if (advanceRequired && !advancePaid) {
      toast.error("আগে অগ্রিম পরিশোধ করুন");
      return;
    }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    addVisit({
      id: `vis-${Date.now()}`,
      propertyId,
      visitorName: form.name,
      phone: form.phone,
      date: form.date,
      time: form.time,
      status: "upcoming",
    });
    setLoading(false);
    toast.success("ভিজিট বুক করা হয়েছে", { description: `${propertyTitle} — ${form.date} ${form.time}` });
    onClose();
    setForm({ date: "", time: "১০:০০", name: "", phone: "" });
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>বাসা ভিজিট বুক করুন</DialogTitle>
        </DialogHeader>
        {advanceRequired && (
          <div className={`rounded-xl border p-3 text-sm ${advancePaid ? "border-secondary/40 bg-secondary/10" : "border-accent/40 bg-accent/10"}`}>
            {advancePaid ? (
              <span className="font-semibold text-secondary">অগ্রিম পরিশোধিত ✓ এখন ভিজিট নিশ্চিত করুন।</span>
            ) : (
              <>
                <p className="font-semibold">এই ইউনিটে ভিজিটের আগে অগ্রিম দিতে হবে</p>
                <p className="mt-1 text-muted-foreground">
                  ভাড়া ৳{bn(rent.toLocaleString("en-US"))} — ৳১৫,০০০ এর কম হওয়ায় ৳{bn(advance.toLocaleString("en-US"))} অগ্রিম প্রযোজ্য (ভাড়া নিলে সমন্বয় হবে)।
                </p>
                <Button size="sm" className="mt-2" onClick={doPayAdvance} disabled={paying}>
                  {paying ? "প্রক্রিয়াধীন..." : `৳${bn(advance.toLocaleString("en-US"))} অগ্রিম দিন`}
                </Button>
              </>
            )}
          </div>
        )}
        <div className="grid gap-3">
          <div>
            <Label>তারিখ</Label>
            <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            {errors.date && <p className="mt-1 text-xs text-destructive">{errors.date}</p>}
          </div>
          <div>
            <Label>সময়</Label>
            <select
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="mt-1 h-10 w-full rounded-md border border-input bg-surface px-3 text-sm"
            >
              {["১০:০০", "১১:৩০", "০২:০০", "০৩:৩০", "০৫:০০"].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <Label>নাম</Label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="আপনার নাম" />
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
          </div>
          <div>
            <Label>ফোন</Label>
            <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="০১৭xxxxxxxx" />
            {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>বাতিল</Button>
          <Button onClick={submit} disabled={loading || (advanceRequired && !advancePaid)}>
            {loading ? "প্রক্রিয়াধীন..." : "নিশ্চিত করুন"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
