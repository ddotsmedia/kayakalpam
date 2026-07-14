"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { contactSchema, treatmentOptions, type ContactInput } from "@/lib/contactSchema";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(data: ContactInput) {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
      reset();
    } catch {
      setStatus("error");
    }
  }

  const field = "w-full rounded-lg border border-primary/20 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary";
  const err = "mt-1 text-xs text-red-600";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="text-sm font-semibold text-accent">Name</label>
        <input {...register("name")} className={field} placeholder="Your name" />
        {errors.name && <p className={err}>{errors.name.message}</p>}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-accent">Phone</label>
          <input {...register("phone")} className={field} placeholder="+91 …" />
          {errors.phone && <p className={err}>{errors.phone.message}</p>}
        </div>
        <div>
          <label className="text-sm font-semibold text-accent">Email (optional)</label>
          <input {...register("email")} className={field} placeholder="you@example.com" />
          {errors.email && <p className={err}>{errors.email.message}</p>}
        </div>
      </div>
      <div>
        <label className="text-sm font-semibold text-accent">Area of Interest</label>
        <select {...register("treatmentInterest")} className={field} defaultValue="">
          <option value="" disabled>
            Select…
          </option>
          {treatmentOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        {errors.treatmentInterest && <p className={err}>{errors.treatmentInterest.message}</p>}
      </div>
      <div>
        <label className="text-sm font-semibold text-accent">Message</label>
        <textarea {...register("message")} rows={4} className={field} placeholder="How can we help?" />
        {errors.message && <p className={err}>{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send Enquiry"}
      </button>

      {status === "ok" && (
        <p className="rounded-lg bg-primary/10 px-4 py-3 text-sm text-primary">
          Thank you — your enquiry has been sent. We will be in touch soon.
        </p>
      )}
      {status === "error" && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          Something went wrong. Please call or WhatsApp us at +91 9447412319.
        </p>
      )}
    </form>
  );
}
