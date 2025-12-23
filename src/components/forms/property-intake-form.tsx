"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  locationOptions,
  priceRangeOptions,
  propertyTypeOptions,
} from "@/data/sample-data";
import { useTranslations } from "@/components/providers/locale-provider";

const propertySchema = z.object({
  ownerName: z.string().min(2, "Please enter the property owner's full name."),
  email: z.string().email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .refine((value) => value === "" || value.length >= 7, {
      message: "Enter a valid phone number.",
    }),
  location: z.string().min(1, "Select a preferred market."),
  propertyType: z.string().min(1, "Select a property category."),
  priceExpectation: z
    .string()
    .trim()
    .min(2, "Share an indicative price expectation."),
  bedrooms: z
    .string()
    .trim()
    .regex(/^\d+$/, "Enter the number of bedrooms.")
    .optional(),
  bathrooms: z
    .string()
    .trim()
    .regex(/^\d+(\.\d)?$/, "Enter the number of bathrooms.")
    .optional(),
  interiorSize: z
    .string()
    .trim()
    .regex(/^\d+(\.\d+)?$/, "Provide the interior size in square feet.")
    .optional(),
  priceBracket: z.string().optional(),
  description: z
    .string()
    .min(30, "Tell us more about the property highlights and positioning."),
  highlights: z
    .string()
    .max(300, "Keep additional highlights within 300 characters.")
    .optional(),
});

type PropertyFields = z.infer<typeof propertySchema>;

export function PropertyIntakeForm() {
  const t = useTranslations();
  const placeholders = t.forms.property.placeholders;
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PropertyFields>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      location: locationOptions[0]?.value ?? "",
      propertyType: propertyTypeOptions[0]?.value ?? "",
      priceBracket: priceRangeOptions.find((range) => range.value === "15-25")?.value,
    },
  });

  async function onSubmit(values: PropertyFields) {
    try {
      // Save to Supabase if configured
      const { getSupabaseClient } = await import("@/lib/supabase/client");
      const supabase = getSupabaseClient();
      
      if (supabase) {
        const { error } = await (supabase.from("property_submissions") as any).insert({
          owner_name: values.ownerName,
          email: values.email,
          phone: values.phone || null,
          location: values.location,
          property_type: values.propertyType,
          price_expectation: values.priceExpectation,
          price_bracket: values.priceBracket || null,
          bedrooms: values.bedrooms || null,
          bathrooms: values.bathrooms || null,
          interior_size: values.interiorSize || null,
          description: values.description,
          highlights: values.highlights || null,
          status: "new",
        });

        if (error) {
          console.error("Error saving property submission:", error);
          // Still show success to user even if DB save fails
        }
      }

      // Simulate delay for UX
      await new Promise((resolve) => setTimeout(resolve, 700));
      console.info("Property submission received", values);
      setIsSubmitted(true);
      reset({
        ownerName: "",
        email: "",
        phone: "",
        location: locationOptions[0]?.value ?? "",
        propertyType: propertyTypeOptions[0]?.value ?? "",
        priceExpectation: "",
        bedrooms: "",
        bathrooms: "",
        interiorSize: "",
        priceBracket: priceRangeOptions.find((range) => range.value === "15-25")?.value,
        description: "",
        highlights: "",
      });
    } catch (error) {
      console.error("Error submitting property form:", error);
      // Still show success to user
      setIsSubmitted(true);
    }
  }

  return (
    <div className="rounded-3xl border border-soft bg-white p-8 shadow-[0_25px_60px_-45px_rgba(0,0,0,0.55)]">
      <form className="grid gap-5 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-neutral-500" suppressHydrationWarning>
            {t.forms.property.owner}
            <input
              {...register("ownerName")}
              className="mt-2 h-12 w-full rounded-full border border-soft bg-white px-4 text-sm text-neutral-800 transition focus:border-neutral-400 focus:outline-none"
              placeholder={placeholders.owner}
            />
            {errors.ownerName && (
              <p className="mt-2 text-xs text-red-600">{errors.ownerName.message}</p>
            )}
          </label>
        </div>

        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-neutral-500" suppressHydrationWarning>
            {t.forms.property.email}
            <input
              {...register("email")}
              type="email"
              className="mt-2 h-12 w-full rounded-full border border-soft bg-white px-4 text-sm text-neutral-800 transition focus:border-neutral-400 focus:outline-none"
              placeholder={placeholders.email}
            />
            {errors.email && (
              <p className="mt-2 text-xs text-red-600">{errors.email.message}</p>
            )}
          </label>
        </div>

        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-neutral-500" suppressHydrationWarning>
            {t.forms.property.phone}
            <input
              {...register("phone")}
              className="mt-2 h-12 w-full rounded-full border border-soft bg-white px-4 text-sm text-neutral-800 transition focus:border-neutral-400 focus:outline-none"
              placeholder={placeholders.phone}
            />
            {errors.phone && (
              <p className="mt-2 text-xs text-red-600">{errors.phone.message}</p>
            )}
          </label>
        </div>

        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            {t.forms.property.market}
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
            {errors.location && (
              <p className="mt-2 text-xs text-red-600">{errors.location.message}</p>
            )}
          </label>
        </div>

        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            {t.forms.property.category}
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
            {errors.propertyType && (
              <p className="mt-2 text-xs text-red-600">
                {errors.propertyType.message}
              </p>
            )}
          </label>
        </div>

        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            {t.forms.property.priceRange}
            <select
              {...register("priceBracket")}
              className="mt-2 h-12 w-full rounded-full border border-soft bg-white px-4 text-sm text-neutral-800 transition focus:border-neutral-400 focus:outline-none"
            >
              {priceRangeOptions.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            {t.forms.property.priceExpectation}
            <input
              {...register("priceExpectation")}
              className="mt-2 h-12 w-full rounded-full border border-soft bg-white px-4 text-sm text-neutral-800 transition focus:border-neutral-400 focus:outline-none"
              placeholder={placeholders.priceExpectation}
            />
            {errors.priceExpectation && (
              <p className="mt-2 text-xs text-red-600">
                {errors.priceExpectation.message}
              </p>
            )}
          </label>
        </div>

        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            {t.forms.property.bedrooms}
            <input
              {...register("bedrooms")}
              className="mt-2 h-12 w-full rounded-full border border-soft bg-white px-4 text-sm text-neutral-800 transition focus:border-neutral-400 focus:outline-none"
              placeholder={placeholders.bedrooms}
            />
            {errors.bedrooms && (
              <p className="mt-2 text-xs text-red-600">{errors.bedrooms.message}</p>
            )}
          </label>
        </div>

        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            {t.forms.property.bathrooms}
            <input
              {...register("bathrooms")}
              className="mt-2 h-12 w-full rounded-full border border-soft bg-white px-4 text-sm text-neutral-800 transition focus:border-neutral-400 focus:outline-none"
              placeholder={placeholders.bathrooms}
            />
            {errors.bathrooms && (
              <p className="mt-2 text-xs text-red-600">{errors.bathrooms.message}</p>
            )}
          </label>
        </div>

        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            {t.forms.property.interiorSize}
            <input
              {...register("interiorSize")}
              className="mt-2 h-12 w-full rounded-full border border-soft bg-white px-4 text-sm text-neutral-800 transition focus:border-neutral-400 focus:outline-none"
              placeholder={placeholders.interiorSize}
            />
            {errors.interiorSize && (
              <p className="mt-2 text-xs text-red-600">
                {errors.interiorSize.message}
              </p>
            )}
          </label>
        </div>

        <div className="md:col-span-2">
          <label className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            {t.forms.property.narrative}
            <textarea
              {...register("description")}
              rows={6}
              className="mt-2 w-full rounded-3xl border border-soft bg-white px-4 py-3 text-sm text-neutral-800 transition focus:border-neutral-400 focus:outline-none"
              placeholder={placeholders.narrative}
            />
            {errors.description && (
              <p className="mt-2 text-xs text-red-600">
                {errors.description.message}
              </p>
            )}
          </label>
        </div>

        <div className="md:col-span-2">
          <label className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            {t.forms.property.highlights}
            <textarea
              {...register("highlights")}
              rows={3}
              className="mt-2 w-full rounded-3xl border border-soft bg-white px-4 py-3 text-sm text-neutral-800 transition focus:border-neutral-400 focus:outline-none"
              placeholder={placeholders.highlights}
            />
            {errors.highlights && (
              <p className="mt-2 text-xs text-red-600">{errors.highlights.message}</p>
            )}
          </label>
        </div>

        <div className="md:col-span-2 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            className="btn-primary text-sm"
            disabled={isSubmitting}
          >
            {isSubmitting ? t.forms.property.submitting : t.forms.property.submit}
          </button>
          {isSubmitted && !isSubmitting && (
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1d4ed8]">
              {t.forms.property.success}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

