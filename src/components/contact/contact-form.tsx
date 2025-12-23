"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { locationOptions, propertyTypeOptions } from "@/data/sample-data";
import { useTranslations } from "@/components/providers/locale-provider";

const contactSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .refine((value) => value === "" || value.length >= 7, {
      message: "Enter a valid phone number.",
    }),
  location: z.string(),
  propertyType: z.string(),
  message: z.string().min(10, "Please share a little more detail."),
});

type ContactFields = z.infer<typeof contactSchema>;

type ContactFormProps = {
  listingTitle?: string;
  listingId?: string;
  location?: string;
  propertyType?: string;
};

export function ContactForm({ listingTitle, listingId, location, propertyType }: ContactFormProps = {}) {
  const t = useTranslations();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFields>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      location: location || (locationOptions[0]?.value ?? ""),
      propertyType: propertyType || (propertyTypeOptions[0]?.value ?? ""),
      message: listingTitle 
        ? `I'm interested in scheduling a viewing for: ${listingTitle}${listingId ? ` (ID: ${listingId})` : ""}`
        : "",
    },
  });

  async function onSubmit(values: ContactFields) {
    try {
      // Save to Supabase if configured
      const { getSupabaseClient } = await import("@/lib/supabase/client");
      const supabase = getSupabaseClient();
      
      if (supabase) {
        const { error } = await (supabase.from("contact_submissions") as any).insert({
          full_name: values.fullName,
          email: values.email,
          phone: values.phone || null,
          location: values.location || null,
          property_type: values.propertyType || null,
          message: values.message,
          status: "new",
          // Store listing reference if available
          ...(listingId && { listing_id: listingId }),
        });

        if (error) {
          console.error("Error saving contact submission:", error);
          // Still show success to user even if DB save fails
        }
      }

      // Simulate delay for UX
      await new Promise((resolve) => setTimeout(resolve, 600));
      console.info("Contact inquiry submitted", values);
      setIsSubmitted(true);
      reset({
        fullName: "",
        email: "",
        phone: "",
        location: locationOptions[0]?.value ?? "",
        propertyType: propertyTypeOptions[0]?.value ?? "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      // Still show success to user
      setIsSubmitted(true);
    }
  }

  return (
    <div className="rounded-3xl border border-soft bg-white p-8 shadow-[0_25px_60px_-45px_rgba(0,0,0,0.55)]">
      <form className="grid gap-5 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="md:col-span-1">
          <label className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            {t.forms.contact.fullName}
            <input
              {...register("fullName")}
              className="mt-2 h-12 w-full rounded-full border border-soft bg-white px-4 text-sm text-neutral-800 transition focus:border-neutral-400 focus:outline-none"
              placeholder="Elise Morgan"
            />
            {errors.fullName && (
              <p className="mt-2 text-xs text-red-600">{errors.fullName.message}</p>
            )}
          </label>
        </div>

        <div className="md:col-span-1">
          <label className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            {t.forms.contact.email}
            <input
              {...register("email")}
              type="email"
              className="mt-2 h-12 w-full rounded-full border border-soft bg-white px-4 text-sm text-neutral-800 transition focus:border-neutral-400 focus:outline-none"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-2 text-xs text-red-600">{errors.email.message}</p>
            )}
          </label>
        </div>

        <div className="md:col-span-1">
          <label className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            {t.forms.contact.phone}
            <input
              {...register("phone")}
              className="mt-2 h-12 w-full rounded-full border border-soft bg-white px-4 text-sm text-neutral-800 transition focus:border-neutral-400 focus:outline-none"
              placeholder="+420 603 455 218"
            />
            {errors.phone && (
              <p className="mt-2 text-xs text-red-600">{errors.phone.message}</p>
            )}
          </label>
        </div>

        <div className="md:col-span-1">
          <label className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            {t.forms.contact.market}
            <select
              {...register("location")}
              className="mt-2 h-12 w-full rounded-full border border-soft bg-white px-4 text-sm text-neutral-800 transition focus:border-neutral-400 focus:outline-none"
            >
              {locationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="md:col-span-1">
          <label className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            {t.forms.contact.propertyInterest}
            <select
              {...register("propertyType")}
              className="mt-2 h-12 w-full rounded-full border border-soft bg-white px-4 text-sm text-neutral-800 transition focus:border-neutral-400 focus:outline-none"
            >
              {propertyTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="md:col-span-2">
          <label className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            {t.forms.contact.message}
            <textarea
              {...register("message")}
              rows={5}
              className="mt-2 w-full rounded-3xl border border-soft bg-white px-4 py-3 text-sm text-neutral-800 transition focus:border-neutral-400 focus:outline-none"
              placeholder="Sdílejte své plány, časový rámec a zásadní požadavky."
            />
            {errors.message && (
              <p className="mt-2 text-xs text-red-600">{errors.message.message}</p>
            )}
          </label>
        </div>

        <div className="md:col-span-2 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            className="btn-primary text-sm"
            disabled={isSubmitting}
          >
            {isSubmitting ? t.forms.contact.sending : t.forms.contact.submit}
          </button>
          {isSubmitted && !isSubmitting && (
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1d4ed8]">
              {t.forms.contact.success}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

