import Link from "next/link";
import { Office } from "@/data/sample-data";

type OfficeCardProps = {
  office: Office;
};

export function OfficeCard({ office }: OfficeCardProps) {
  return (
    <article className="flex flex-col gap-5 rounded-3xl border border-soft bg-white p-6 shadow-[0_25px_55px_-45px_rgba(0,0,0,0.55)] transition hover:-translate-y-1 hover:shadow-[0_30px_65px_-45px_rgba(0,0,0,0.6)]">
      <div>
        <h3 className="font-heading text-lg font-semibold text-[#1d4ed8]">
          {office.name}
        </h3>
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
          {office.region}
        </p>
      </div>
      <p className="text-sm text-neutral-600">{office.address}</p>
      <div className="text-sm text-neutral-700">
        <Link
          href={`tel:${office.phone.replace(/[^+\d]/g, "")}`}
          className="block transition-colors hover:text-[#1d4ed8]"
        >
          {office.phone}
        </Link>
        <Link
          href={`mailto:${office.email}`}
          className="block transition-colors hover:text-[#1d4ed8]"
        >
          {office.email}
        </Link>
      </div>
      <div>
        <span className="text-xs uppercase tracking-[0.3em] text-neutral-500">
          Services
        </span>
        <ul className="mt-2 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-700">
          {office.services.map((item) => (
            <li
              key={item}
              className="rounded-full border border-soft bg-white px-3 py-1 text-neutral-700"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

