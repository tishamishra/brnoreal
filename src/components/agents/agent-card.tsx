import Link from "next/link";
import { Agent } from "@/data/sample-data";

type AgentCardProps = {
  agent: Agent;
};

export function AgentCard({ agent }: AgentCardProps) {
  const initials = agent.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="flex flex-col gap-6 rounded-3xl border border-soft bg-white p-6 shadow-[0_25px_55px_-45px_rgba(0,0,0,0.55)] transition hover:-translate-y-1 hover:shadow-[0_30px_65px_-45px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-4">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1d4ed8]/10 font-heading text-lg font-semibold text-[#1d4ed8]">
          {initials}
        </span>
        <div>
          <h3 className="font-heading text-lg font-semibold text-[#1d4ed8]">
            {agent.name}
          </h3>
          <p className="text-sm text-neutral-600">{agent.title}</p>
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            {agent.region}
          </p>
        </div>
      </div>

      <p className="text-sm text-neutral-600">{agent.bio}</p>

      <div className="space-y-3 text-sm">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            Specialties
          </span>
          <ul className="mt-2 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-700">
            {agent.specialties.map((item) => (
              <li
                key={item}
                className="rounded-full border border-soft bg-white px-3 py-1 text-neutral-700"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-2 text-sm text-neutral-700">
          <Link
            href={`mailto:${agent.email}`}
            className="transition-colors hover:text-[#1d4ed8]"
          >
            {agent.email}
          </Link>
          <Link
            href={`tel:${agent.phone.replace(/[^+\d]/g, "")}`}
            className="transition-colors hover:text-[#1d4ed8]"
          >
            {agent.phone}
          </Link>
        </div>
      </div>
    </article>
  );
}

