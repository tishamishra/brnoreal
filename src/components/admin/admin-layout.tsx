"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Plus, List, LogOut, Settings, Users, Mail } from "react-feather";
import { BuildingOfficeIcon } from "@heroicons/react/24/outline";
import { useSession, logout } from "@/lib/auth/client";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated" && session?.user?.role === "admin";

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  // Show nothing while checking (prevents hydration mismatch)
  if (status === "loading") {
    return null;
  }

  // Show nothing if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: Home },
    { href: "/admin/listings", label: "All Listings", icon: List },
    { href: "/admin/listings/new", label: "Add Listing", icon: Plus },
    { href: "/admin/agents", label: "Agents", icon: Users },
    { href: "/admin/offices", label: "Offices", icon: BuildingOfficeIcon },
    { href: "/admin/contacts", label: "Contact Messages", icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="border-b border-soft bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings size={20} className="text-[color:var(--brand-500)]" />
            <h1 className="font-heading text-lg font-semibold text-neutral-900">
              Admin Panel
            </h1>
          </div>
          <button
            onClick={() => logout()}
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-100"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      <div className="container grid grid-cols-1 gap-6 py-6 lg:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <aside className="space-y-2">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              const isHeroIcon = item.href === "/admin/offices";
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-[color:var(--brand-500)] text-white"
                      : "text-neutral-700 hover:bg-neutral-100"
                  }`}
                >
                  {isHeroIcon ? (
                    <Icon className="h-[18px] w-[18px]" />
                  ) : (
                    <Icon size={18} />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="min-h-[calc(100vh-8rem)]">{children}</main>
      </div>
    </div>
  );
}

