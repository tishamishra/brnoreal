"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "@/components/providers/locale-provider";

type MortgageCalculatorProps = {
  price: number;
};

const DEFAULT_INTEREST = 4.2;
const DEFAULT_TERM = 30;
const DEFAULT_DOWN_PERCENT = 20;

export function MortgageCalculator({ price }: MortgageCalculatorProps) {
  const t = useTranslations();
  const [interestRate, setInterestRate] = useState<number>(DEFAULT_INTEREST);
  const [termYears, setTermYears] = useState<number>(DEFAULT_TERM);
  const [downPaymentPercent, setDownPaymentPercent] =
    useState<number>(DEFAULT_DOWN_PERCENT);

  const {
    monthlyPayment,
    loanAmount,
    downPayment,
    totalPaid,
    totalInterest,
  } = useMemo(() => {
    const rate = interestRate / 100;
    const downPaymentValue = price * (downPaymentPercent / 100);
    const principal = Math.max(price - downPaymentValue, 0);
    const months = Math.max(termYears, 1) * 12;
    const monthlyRate = rate / 12;

    let monthly = 0;
    if (monthlyRate === 0) {
      monthly = principal / months;
    } else {
      monthly =
        (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
    }
    const total = monthly * months;
    const interestTotal = total - principal;

    return {
      monthlyPayment: Number.isFinite(monthly) ? monthly : 0,
      loanAmount: principal,
      downPayment: downPaymentValue,
      totalPaid: total,
      totalInterest: interestTotal,
    };
  }, [downPaymentPercent, interestRate, price, termYears]);

  const handleNumberChange =
    (setter: (value: number) => void) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const next = Number(event.target.value);
      setter(Number.isNaN(next) ? 0 : next);
    };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("cs-CZ", {
      style: "currency",
      currency: "CZK",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <section className="rounded-[32px] border border-soft bg-white/90 p-8 shadow-[0_25px_60px_-45px_rgba(15,23,42,0.5)]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <span className="inline-flex items-center rounded-full border border-soft bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-neutral-500">
            {t.listingDetail.mortgage.badge}
          </span>
          <h2 className="font-heading text-2xl font-semibold text-neutral-900 md:text-3xl">
            {t.listingDetail.mortgage.heading}
          </h2>
          <p className="text-sm text-neutral-600">
            {t.listingDetail.mortgage.copy}
          </p>
        </div>

        <div className="grid gap-3 rounded-3xl border border-soft bg-white p-6 text-sm text-neutral-700 md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              {t.listingDetail.mortgage.monthly}
            </p>
            <p className="mt-1 font-heading text-2xl font-semibold text-[#1d4ed8]">
              {formatCurrency(monthlyPayment)}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              {t.listingDetail.mortgage.loanAmount}
            </p>
            <p className="mt-1 font-semibold text-neutral-900">
              {formatCurrency(loanAmount)}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              {t.listingDetail.mortgage.downPayment}
            </p>
            <p className="mt-1 font-semibold text-neutral-900">
              {formatCurrency(downPayment)} ({downPaymentPercent}
              %)
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <label className="space-y-2 text-sm font-medium text-neutral-700">
          <span className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            {t.listingDetail.mortgage.interestRate}
          </span>
          <input
            type="number"
            min={0}
            step={0.1}
            value={interestRate}
            onChange={handleNumberChange(setInterestRate)}
            className="h-12 w-full rounded-full border border-soft bg-white px-4 text-sm text-neutral-800 focus:border-neutral-400 focus:outline-none"
          />
        </label>

        <label className="space-y-2 text-sm font-medium text-neutral-700">
          <span className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            {t.listingDetail.mortgage.termYears}
          </span>
          <input
            type="number"
            min={1}
            step={1}
            value={termYears}
            onChange={handleNumberChange(setTermYears)}
            className="h-12 w-full rounded-full border border-soft bg-white px-4 text-sm text-neutral-800 focus:border-neutral-400 focus:outline-none"
          />
        </label>

        <label className="space-y-2 text-sm font-medium text-neutral-700">
          <span className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            {t.listingDetail.mortgage.downPercent}
          </span>
          <input
            type="number"
            min={0}
            max={100}
            step={1}
            value={downPaymentPercent}
            onChange={handleNumberChange(setDownPaymentPercent)}
            className="h-12 w-full rounded-full border border-soft bg-white px-4 text-sm text-neutral-800 focus:border-neutral-400 focus:outline-none"
          />
        </label>
      </div>

      <div className="mt-6 grid gap-4 rounded-3xl border border-dashed border-soft bg-white/70 p-6 text-sm text-neutral-700 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            {t.listingDetail.mortgage.totalPaid}
          </p>
          <p className="mt-2 font-semibold text-neutral-900">
            {formatCurrency(totalPaid)}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            {t.listingDetail.mortgage.totalInterest}
          </p>
          <p className="mt-2 font-semibold text-neutral-900">
            {formatCurrency(totalInterest)}
          </p>
        </div>
      </div>
    </section>
  );
}

