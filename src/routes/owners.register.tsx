import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageShell, Crumbs } from "@/components/site-chrome";
import { useState } from "react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check, Upload, PartyPopper } from "lucide-react";

export const Route = createFileRoute("/owners/register")({
  head: () => ({ meta: [{ title: "মালিক নিবন্ধন — বাড়িলাগবে" }] }),
  component: OwnerRegisterPage,
});

const steps = ["মালিকের তথ্য", "সম্পত্তির বিবরণ", "ব্যাংক তথ্য", "চুক্তি আপলোড"];
const schemas = [
  z.object({ name: z.string().min(2), phone: z.string().min(11), email: z.string().email(), nid: z.string().min(10) }),
  z.object({ propAddress: z.string().min(5), propType: z.string().min(2), propRent: z.string().min(1), propBedrooms: z.string().min(1) }),
  z.object({ bank: z.string().min(2), accountName: z.string().min(2), accountNo: z.string().min(6) }),
  z.object({ agreement: z.string().min(1) }),
];

function OwnerRegisterPage() {
  const navigate = useNavigate();
  const setRole = useAppStore((s) => s.setRole);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [data, setData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const upd = (k: string, v: string) => setData((d) => ({ ...d, [k]: v }));
  const validate = () => {
    const r = schemas[step].safeParse(data);
    if (!r.success) {
      const e: Record<string, string> = {};
      r.error.issues.forEach((i) => (e[i.path[0] as string] = i.message));
      setErrors(e);
      return false;
    }
    setErrors({});
    return true;
  };
  const submit = async () => {
    if (!validate()) return;
    await new Promise((r) => setTimeout(r, 600));
    setRole("owner");
    setDone(true);
    toast.success("সফলভাবে নিবন্ধন হয়েছে");
  };

  if (done) {
    return (
      <PageShell>
        <div className="mx-auto max-w-2xl p-12 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-secondary text-secondary-foreground">
            <PartyPopper className="h-8 w-8" />
          </div>
          <h1 className="mt-6 text-3xl font-bold">অভিনন্দন!</h1>
          <p className="mt-2 text-muted-foreground">আপনার নিবন্ধন সফল হয়েছে। আমাদের এজেন্ট শীঘ্রই আপনার সাথে যোগাযোগ করবে।</p>
          <Button className="mt-6" onClick={() => navigate({ to: "/dashboard/owner" })}>মালিক ড্যাশবোর্ডে যান</Button>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <Crumbs items={[{ label: "হোম", to: "/" }, { label: "মালিক", to: "/owners" }, { label: "নিবন্ধন" }]} />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
          <div className="mb-6 flex items-center gap-2">
            {steps.map((s, i) => (
              <div key={s} className="flex-1">
                <div className={`h-1.5 rounded-full ${i <= step ? "bg-primary" : "bg-muted"}`} />
                <div className="mt-1 text-[11px]">{s}</div>
              </div>
            ))}
          </div>

          {step === 0 && (<div className="space-y-3">
            <F label="পূর্ণ নাম" k="name" v={data.name} e={errors.name} upd={upd} />
            <F label="ফোন" k="phone" v={data.phone} e={errors.phone} upd={upd} />
            <F label="ইমেইল" k="email" v={data.email} e={errors.email} upd={upd} />
            <F label="NID" k="nid" v={data.nid} e={errors.nid} upd={upd} />
          </div>)}
          {step === 1 && (<div className="space-y-3">
            <F label="সম্পত্তির ঠিকানা" k="propAddress" v={data.propAddress} e={errors.propAddress} upd={upd} />
            <F label="ধরন (ফ্ল্যাট/বাড়ি/অফিস)" k="propType" v={data.propType} e={errors.propType} upd={upd} />
            <F label="মাসিক ভাড়া (৳)" k="propRent" v={data.propRent} e={errors.propRent} upd={upd} />
            <F label="বেডরুম সংখ্যা" k="propBedrooms" v={data.propBedrooms} e={errors.propBedrooms} upd={upd} />
          </div>)}
          {step === 2 && (<div className="space-y-3">
            <F label="ব্যাংকের নাম" k="bank" v={data.bank} e={errors.bank} upd={upd} />
            <F label="অ্যাকাউন্টের নাম" k="accountName" v={data.accountName} e={errors.accountName} upd={upd} />
            <F label="অ্যাকাউন্ট নম্বর" k="accountNo" v={data.accountNo} e={errors.accountNo} upd={upd} />
          </div>)}
          {step === 3 && (
            <label className={`grid cursor-pointer place-items-center gap-2 rounded-xl border-2 border-dashed p-10 ${data.agreement ? "border-primary bg-primary-soft" : "border-border"}`}>
              <Upload className="h-8 w-8 text-primary" />
              <div className="font-semibold">ব্যবস্থাপনা চুক্তি আপলোড</div>
              <div className="text-xs text-muted-foreground">{data.agreement || "ক্লিক করে ফাইল দিন"}</div>
              <input type="file" className="hidden" onChange={(e) => upd("agreement", e.target.files?.[0]?.name || "")} />
              {errors.agreement && <p className="text-xs text-destructive">{errors.agreement}</p>}
            </label>
          )}

          <div className="mt-6 flex items-center justify-between">
            <Button variant="outline" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}><ArrowLeft className="h-4 w-4" /> পূর্ব</Button>
            {step < steps.length - 1 ? (
              <Button onClick={() => validate() && setStep((s) => s + 1)}>পরবর্তী <ArrowRight className="h-4 w-4" /></Button>
            ) : (
              <Button onClick={submit}><Check className="h-4 w-4" /> সাবমিট</Button>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function F({ label, k, v, e, upd }: { label: string; k: string; v?: string; e?: string; upd: (k: string, v: string) => void }) {
  return (
    <div>
      <Label>{label}</Label>
      <Input value={v ?? ""} onChange={(ev) => upd(k, ev.target.value)} />
      {e && <p className="mt-1 text-xs text-destructive">{e}</p>}
    </div>
  );
}
