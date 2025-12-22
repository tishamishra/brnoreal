"use client";

// Simple admin authentication check
export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem("admin_authenticated") === "true";
}

export function setAdminAuthenticated(value: boolean) {
  if (typeof window === "undefined") return;
  if (value) {
    sessionStorage.setItem("admin_authenticated", "true");
  } else {
    sessionStorage.removeItem("admin_authenticated");
  }
}

export function logoutAdmin() {
  setAdminAuthenticated(false);
  window.location.href = "/admin/login";
}

