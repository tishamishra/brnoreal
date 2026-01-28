import { NextResponse } from "next/server";

/**
 * API route to check if authentication environment variables are configured
 * This helps verify Vercel environment variables are set correctly
 * 
 * ⚠️ Remove or protect this route in production for security
 */
export async function GET() {
  const isProduction = process.env.NODE_ENV === "production";
  
  const config = {
    hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
    hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
    hasAdminEmail: !!process.env.ADMIN_EMAIL,
    hasAdminPassword: !!process.env.ADMIN_PASSWORD,
    nextAuthUrl: process.env.NEXTAUTH_URL || "Not set",
    environment: process.env.NODE_ENV,
    // Don't expose actual secrets!
  };

  // In production, only show if variables are missing (for debugging)
  if (isProduction) {
    const missing = [];
    const warnings = [];
    
    // Required variables
    if (!config.hasAdminPassword) missing.push("ADMIN_PASSWORD");
    if (!config.hasAdminEmail) warnings.push("ADMIN_EMAIL (optional but recommended)");
    
    // Recommended variables
    if (!config.hasNextAuthSecret) warnings.push("NEXTAUTH_SECRET (recommended for security)");
    if (!config.hasNextAuthUrl) warnings.push("NEXTAUTH_URL (recommended)");

    if (missing.length > 0) {
      return NextResponse.json(
        {
          status: "error",
          message: "Missing required environment variables",
          missing,
          warnings: warnings.length > 0 ? warnings : undefined,
          config: {
            hasNextAuthSecret: config.hasNextAuthSecret,
            hasNextAuthUrl: config.hasNextAuthUrl,
            hasAdminEmail: config.hasAdminEmail,
            hasAdminPassword: config.hasAdminPassword,
          },
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: warnings.length > 0 ? "warning" : "ok",
      message: warnings.length > 0 
        ? "Required variables set, but some recommended variables are missing"
        : "All environment variables are configured",
      warnings: warnings.length > 0 ? warnings : undefined,
      config: {
        hasNextAuthSecret: config.hasNextAuthSecret,
        hasNextAuthUrl: config.hasNextAuthUrl,
        hasAdminEmail: config.hasAdminEmail,
        hasAdminPassword: config.hasAdminPassword,
        nextAuthUrl: config.nextAuthUrl,
      },
    });
  }

  // In development, show full config
  return NextResponse.json({
    status: "ok",
    config: {
      hasNextAuthSecret: config.hasNextAuthSecret,
      hasNextAuthUrl: config.hasNextAuthUrl,
      hasAdminEmail: config.hasAdminEmail,
      hasAdminPassword: config.hasAdminPassword,
      nextAuthUrl: config.nextAuthUrl,
      environment: config.environment,
    },
  });
}
