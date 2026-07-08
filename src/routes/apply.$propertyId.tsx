import { createFileRoute, useNavigate, notFound, Link } from "@tanstack/react-router";
import { PageShell, Crumbs } from "@/components/site-chrome";
import { getProperty, bn } from "@/lib/mock-data";
import { useAppStore } from "@/lib/store";
import { useState } from "react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Upload, ArrowLeft, ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/apply/$propertyId")({
  loader: ({ params }) => {
    const p = getProperty(params.propertyId);
    if (!p) throw notFound();
    return p;
  },
  head: () => ({ meta: [{ title: "ভাড়া আবেদন — বাড়িলাগবে" }] }),
  component: ApplyPage,
  errorComponent: ({ error }) => <div className="p-8">{error.message}</div>,
  notFoundComponent: () => <div className="p-8">সম্পত্তি পাওয়া যায়নি</div>,
});

const steps = ["ব্যক্তিগত তথ্য", "পেশা", "মাসিক আয়", "ডকুমেন্ট", "রেফারেন্স", "পর্যালোচনা"];

const stepSchemas = [
  z.object({ fullName: z.string().trim().min(2, "নাম দিন"), phone: z.string().min(11), email: z.string().email("সঠিক ইমেইল দিন"), nid: z.string().min(10) }),
  z.object({ occupation: z.string().min(2), employer: z.string().min(2), yearsExperience: z.string() }),
  z.object({ monthlyIncome: z.string().min(1) }),
  z.object({ nidDoc: z.string().min(1, "NID আপলোড করুন"), photo: z.string().min(1, "ছবি আপলোড করুন") }),
  z.object({
    ref1Name: z.string().min(2), ref1Rel: z.string().min(2), ref1Phone: z.string().min(11), ref1Addr: z.string().min(5),
    ref2Name: z.string().min(2), ref2Rel: z.string().min(2), ref2Phone: z.string().min(11), ref2Addr: z.string().min(5),
  }),
  z.object({}),
];

function ApplyPage() {
  const p = Route.useLoaderData();
  const navigate = useNavigate();
  const addApp = useAppStore((s) => s.addApplication);
  const setRole = useAppStore((s) => s.setRole);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const upd = (k: string, v: string) => setData((d) => ({ ...d, [k]: v }));

  const validate = () => {
    const res = stepSchemas[step].safeParse(data);
    if (!res.success) {
      const errs: Record<string, string> = {};
      res.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return false;
    }
    setErrors({});
    return true;
  };

  const next = () => { if (validate()) setStep((s) => Math.min(s + 1, 5)); };
  const back = () => setStep((s) => Math.max(0, s - 1));

  const submit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    addApp({
      id: `app-${Date.now()}`,
      tenantId: `ten-${Date.now()}`,
      propertyId: p.id,
      submittedAt: new Date().toISOString(),
      status: "pending",
      monthlyIncome: Number(data.monthlyIncome || 0),
      employment: data.occupation || "",
    });
    setRole("tenant");
    setSubmitting(false);
    toast.success("আবেদন সফলভাবে জমা হয়েছে");
    navigate({ to: "/dashboard/tenant" });
  };

  return (
    <PageShell>
      <Crumbs items={[{ label: "হোম", to: "/" }, { label: "সম্পত্তি", to: "/properties" }, { label: p.title, to: "/properties/$id" as any }, { label: "আবেদন" }]} />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
          <div className="text-sm text-muted-foreground">আবেদন করছেন: <strong className="text-foreground">{p.title}</strong> • ৳{bn(p.rent.toLocaleString("en-US"))}/মাস</div>
          <div className="mt-4 flex items-center gap-2">
            {steps.map((s, i) => (
              <div key={s} className="flex-1">
                <div className={`h-1.5 rounded-full ${i <= step ? "bg-primary" : "bg-muted"}`} />
                <div className={`mt-1 text-[10px] font-medium ${i === step ? "text-primary" : "text-muted-foreground"}`}>{bn(i + 1)}. {s}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3">
            {step === 0 && (<>
              <Field label="পূর্ণ নাম" value={data.fullName} onChange={(v) => upd("fullName", v)} err={errors.fullName} />
              <Field label="ফোন" value={data.phone} onChange={(v) => upd("phone", v)} err={errors.phone} />
              <Field label="ইমেইল" value={data.email} onChange={(v) => upd("email", v)} err={errors.email} />
              <Field label="NID নম্বর" value={data.nid} onChange={(v) => upd("nid", v)} err={errors.nid} />
            </>)}
            {step === 1 && (<>
              <Field label="পেশা" value={data.occupation} onChange={(v) => upd("occupation", v)} err={errors.occupation} />
              <Field label="প্রতিষ্ঠান / কোম্পানি" value={data.employer} onChange={(v) => upd("employer", v)} err={errors.employer} />
              <Field label="অভিজ্ঞতা (বছর)" value={data.yearsExperience} onChange={(v) => upd("yearsExperience", v)} err={errors.yearsExperience} />
            </>)}
            {step === 2 && (
              <Field label="মাসিক আয় (৳)" value={data.monthlyIncome} onChange={(v) => upd("monthlyIncome", v)} err={errors.monthlyIncome} />
            )}
            {step === 3 && (
              <div className="grid gap-3 sm:grid-cols-3">
                <UploadBox label="NID" name="nidDoc" value={data.nidDoc} onChange={upd} err={errors.nidDoc} />
                <UploadBox label="পাসপোর্ট (ঐচ্ছিক)" name="passport" value={data.passport} onChange={upd} />
                <UploadBox label="ছবি" name="photo" value={data.photo} onChange={upd} err={errors.photo} />
              </div>
            )}
            {step === 4 && (
              <div className="grid gap-4 sm:grid-cols-2">
                {[1, 2].map((i) => (
                  <div key={i} className="rounded-xl border border-border p-4">
                    <h4 className="mb-3 font-bold">রেফারেন্স {bn(i)} (রক্ত সম্পর্কীয়)</h4>
                    <div className="space-y-2">
                      <Field label="নাম" value={data[`ref${i}Name`]} onChange={(v) => upd(`ref${i}Name`, v)} err={errors[`ref${i}Name`]} />
                      <Field label="সম্পর্ক" value={data[`ref${i}Rel`]} onChange={(v) => upd(`ref${i}Rel`, v)} err={errors[`ref${i}Rel`]} />
                      <Field label="ফোন" value={data[`ref${i}Phone`]} onChange={(v) => upd(`ref${i}Phone`, v)} err={errors[`ref${i}Phone`]} />
                      <Field label="ঠিকানা" value={data[`ref${i}Addr`]} onChange={(v) => upd(`ref${i}Addr`, v)} err={errors[`ref${i}Addr`]} />
                    </div>
                  </div>
                ))}
              </div>
            )}
            {step === 5 && (
              <div className="rounded-xl bg-muted p-5">
                <h4 className="font-bold">পর্যালোচনা</h4>
                <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                  {Object.entries(data).filter(([, v]) => v).map(([k, v]) => (
                    <div key={k}><dt className="text-xs text-muted-foreground">{k}</dt><dd className="font-medium">{v}</dd></div>
                  ))}
                </dl>
                <p className="mt-4 text-xs text-muted-foreground">জমা দেওয়ার পর আমাদের এজেন্ট আপনার সাথে ২৪ ঘণ্টার মধ্যে যোগাযোগ করবেন।</p>
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <Button variant="outline" onClick={back} disabled={step === 0}><ArrowLeft className="h-4 w-4" /> পূর্ববর্তী</Button>
            {step < 5 ? (
              <Button onClick={next}>পরবর্তী <ArrowRight className="h-4 w-4" /></Button>
            ) : (
              <Button onClick={submit} disabled={submitting}><Check className="h-4 w-4" /> {submitting ? "জমা দিচ্ছি..." : "চূড়ান্ত জমা"}</Button>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function Field({ label, value, onChange, err }: { label: string; value?: string; onChange: (v: string) => void; err?: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <Input value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
      {err && <p className="mt-1 text-xs text-destructive">{err}</p>}
    </div>
  );
}
function UploadBox({ label, name, value, onChange, err }: { label: string; name: string; value?: string; onChange: (k: string, v: string) => void; err?: string }) {
  return (
    <label className={`grid cursor-pointer place-items-center gap-2 rounded-xl border-2 border-dashed p-6 text-center text-sm hover:bg-muted ${value ? "border-primary bg-primary-soft" : "border-border"}`}>
      <Upload className="h-6 w-6 text-primary" />
      <div className="font-semibold">{label}</div>
      <div className="text-xs text-muted-foreground">{value ? "✓ আপলোড হয়েছে" : "ক্লিক করে ফাইল দিন"}</div>
      <input type="file" className="hidden" onChange={(e) => onChange(name, e.target.files?.[0]?.name || "")} />
      {err && <p className="text-xs text-destructive">{err}</p>}
    </label>
  );
}
