"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Enter your name").max(80),
  code: z.string().min(1),
  phone: z.string().min(6, "Enter a valid number").max(20),
  email: z.string().email("Invalid email").max(120).optional().or(z.literal("")),
  country: z.string().min(1, "Select your country"),
  consultationType: z.string().min(1, "Select a type"),
  platform: z.string().min(1, "Select a platform"),
  date: z.string().min(1, "Choose a date"),
  slot: z.string().min(1, "Choose a slot"),
  concern: z.string().min(5, "Describe your concern").max(2000),
  heard: z.string().optional(),
});

type FormInput = z.infer<typeof schema>;

const codes = ["+91", "+971", "+974", "+965", "+966", "+968", "+973", "+44", "+1"];
const countries = ["India", "UAE", "Qatar", "Kuwait", "Saudi Arabia", "Oman", "Bahrain", "United Kingdom", "United States", "Australia", "Other"];
const types = ["Initial Consultation", "Follow-up Consultation", "Visha Chikitsa Emergency"];
const platforms = ["WhatsApp Video", "Google Meet", "Phone Call"];
const slots = ["8:00–9:00 AM IST", "9:00–10:00 AM IST", "10:00–11:00 AM IST", "11:00 AM–12:00 PM IST", "12:00–1:00 PM IST", "2:00–3:00 PM IST", "3:00–4:00 PM IST", "4:00–5:00 PM IST", "5:00–6:00 PM IST"];
const heardOptions = ["Google", "Facebook", "WhatsApp", "Friend/Family", "YouTube", "Other"];

const tomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
};

export default function TelemedicineForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormInput>({
    resolver: zodResolver(schema),
    defaultValues: { code: "+91" },
  });

  async function onSubmit(d: FormInput) {
    setStatus("sending");
    const message = [
      `Consultation: ${d.consultationType}`,
      `Platform: ${d.platform}`,
      `Preferred: ${d.date} ${d.slot}`,
      d.heard ? `Heard via: ${d.heard}` : "",
      "",
      `Concern: ${d.concern}`,
    ].filter(Boolean).join("\n");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: d.name,
          phone: `${d.code} ${d.phone}`,
          email: d.email || "",
          treatmentInterest: d.consultationType,
          message,
          type: "telemedicine",
          country: d.country,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
      reset({ code: "+91" });
    } catch {
      setStatus("error");
    }
  }

  const field = "w-full rounded-lg border border-primary/20 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary";
  const err = "mt-1 text-xs text-red-600";

  if (status === "ok")
    return (
      <div className="rounded-2xl bg-primary/10 p-8 text-center">
        <p className="font-heading text-xl font-bold text-accent">Request received</p>
        <p className="mt-2 text-muted">
          We will WhatsApp you within 24 hours to confirm your slot. For urgent queries: +91 9447412319
        </p>
      </div>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="text-sm font-semibold text-accent">Full Name *</label>
        <input {...register("name")} className={field} placeholder="Your name" />
        {errors.name && <p className={err}>{errors.name.message}</p>}
      </div>

      <div>
        <label className="text-sm font-semibold text-accent">Phone / WhatsApp *</label>
        <div className="flex gap-2">
          <select {...register("code")} className={`${field} w-24 shrink-0`}>
            {codes.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <input {...register("phone")} className={field} placeholder="Number" />
        </div>
        {errors.phone && <p className={err}>{errors.phone.message}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-accent">Email</label>
          <input {...register("email")} className={field} placeholder="you@example.com" />
          {errors.email && <p className={err}>{errors.email.message}</p>}
        </div>
        <div>
          <label className="text-sm font-semibold text-accent">Country of Residence</label>
          <select {...register("country")} className={field} defaultValue="">
            <option value="" disabled>Select…</option>
            {countries.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.country && <p className={err}>{errors.country.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-accent">Consultation Type</label>
          <select {...register("consultationType")} className={field} defaultValue="">
            <option value="" disabled>Select…</option>
            {types.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.consultationType && <p className={err}>{errors.consultationType.message}</p>}
        </div>
        <div>
          <label className="text-sm font-semibold text-accent">Preferred Platform</label>
          <select {...register("platform")} className={field} defaultValue="">
            <option value="" disabled>Select…</option>
            {platforms.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.platform && <p className={err}>{errors.platform.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-accent">Preferred Date *</label>
          <input type="date" min={tomorrow()} {...register("date")} className={field} />
          {errors.date && <p className={err}>{errors.date.message}</p>}
        </div>
        <div>
          <label className="text-sm font-semibold text-accent">Preferred Time Slot</label>
          <select {...register("slot")} className={field} defaultValue="">
            <option value="" disabled>Select…</option>
            {slots.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.slot && <p className={err}>{errors.slot.message}</p>}
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-accent">Health Concern / Symptoms *</label>
        <textarea {...register("concern")} rows={4} className={field} placeholder="Describe your concern" />
        {errors.concern && <p className={err}>{errors.concern.message}</p>}
      </div>

      <div>
        <label className="text-sm font-semibold text-accent">How did you hear about us?</label>
        <select {...register("heard")} className={field} defaultValue="">
          <option value="">Select…</option>
          {heardOptions.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Request Consultation"}
      </button>

      {status === "error" && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          Something went wrong. Please WhatsApp us at +91 9447412319.
        </p>
      )}
    </form>
  );
}
