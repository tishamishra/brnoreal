"use client";

import { SessionProvider } from "./session-provider";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
