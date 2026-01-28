# Vercel-Based Security Authentication Setup

## ✅ Installation Complete

Your Brno Real Estate admin panel now uses **NextAuth.js** (Auth.js) for secure, Vercel-compatible authentication.

## 🔐 What Changed

### Before
- Simple password check with `sessionStorage`
- No server-side validation
- Insecure client-side only authentication

### After
- **NextAuth.js** with JWT sessions
- Server-side route protection via middleware
- Secure HTTP-only cookies
- Production-ready authentication

## 📋 Environment Variables

Add these to your `.env.local` file:

```env
# NextAuth Configuration
NEXTAUTH_SECRET=your-super-secret-key-here-minimum-32-characters
NEXTAUTH_URL=http://localhost:3000

# Admin Password (server-side only, not exposed to client)
ADMIN_PASSWORD=your-secure-admin-password

# For Production (Vercel)
# NEXTAUTH_URL=https://your-domain.com
```

### Generate a Secure Secret

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

Or use an online generator: https://generate-secret.vercel.app/32

## 🚀 How It Works

### 1. **Middleware Protection** (`src/middleware.ts`)
- Automatically protects all `/admin/*` routes (except `/admin/login`)
- Redirects unauthenticated users to login page
- Works on the edge (Vercel Edge Functions)

### 2. **NextAuth Configuration** (`src/lib/auth/config.ts`)
- Credentials provider for password-based authentication
- JWT session strategy (24-hour sessions)
- Custom callbacks for role-based access

### 3. **Client-Side Hooks** (`src/lib/auth/client.ts`)
- `useSession()` - Get current session
- `useIsAuthenticated()` - Check if user is authenticated
- `logout()` - Sign out user

### 4. **Server-Side Utilities** (`src/lib/auth/session.ts`)
- `getSession()` - Get session in Server Components/API routes
- `isAuthenticated()` - Check authentication server-side
- `requireAuth()` - Require authentication (throws if not authenticated)

## 🔑 Login Process

1. User visits `/admin/login`
2. Enters password
3. NextAuth validates password against `ADMIN_PASSWORD`
4. Creates JWT session token
5. Stores in secure HTTP-only cookie
6. Redirects to `/admin` dashboard

## 🛡️ Security Features

- **HTTP-only cookies** - Cannot be accessed by JavaScript
- **Secure cookies** - Only sent over HTTPS in production
- **JWT tokens** - Stateless, scalable authentication
- **Middleware protection** - Server-side route guarding
- **Session expiration** - 24-hour automatic logout

## 📝 Usage Examples

### Client Components

```tsx
"use client";

import { useSession, useIsAuthenticated, logout } from "@/lib/auth/client";

export function MyComponent() {
  const { data: session, status } = useSession();
  const isAuthenticated = useIsAuthenticated();

  if (status === "loading") return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Not authenticated</div>;

  return (
    <div>
      <p>Welcome, {session?.user?.name}</p>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}
```

### Server Components

```tsx
import { getSession, isAuthenticated } from "@/lib/auth/session";

export default async function ServerComponent() {
  const session = await getSession();
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    return <div>Access denied</div>;
  }

  return <div>Welcome, {session?.user?.name}</div>;
}
```

### API Routes

```tsx
import { requireAuth } from "@/lib/auth/session";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const session = await requireAuth();
    // User is authenticated, proceed with request
    return NextResponse.json({ data: "protected data" });
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
```

## 🔄 Migration Notes

The old authentication functions in `src/lib/admin/auth.ts` are kept for backward compatibility but now delegate to NextAuth:

- `isAdminAuthenticated()` - Now returns false (use `useIsAuthenticated()` hook instead)
- `logoutAdmin()` - Now calls NextAuth `logout()`

All admin pages have been updated to use the new NextAuth hooks.

## 🚨 Important Security Notes

1. **Never expose `ADMIN_PASSWORD` to the client** - It's server-side only
2. **Use a strong `NEXTAUTH_SECRET`** - Minimum 32 characters
3. **Change default password** - Don't use "admin123" in production
4. **Use HTTPS in production** - Required for secure cookies
5. **Rotate secrets periodically** - Change `NEXTAUTH_SECRET` and `ADMIN_PASSWORD` regularly

## 🐛 Troubleshooting

### "Invalid credentials" error
- Check that `ADMIN_PASSWORD` is set correctly in `.env.local`
- Restart your dev server after changing environment variables

### Session not persisting
- Verify `NEXTAUTH_SECRET` is set
- Check that `NEXTAUTH_URL` matches your domain
- In production, ensure cookies are allowed (not blocked by browser)

### Middleware not working
- Clear browser cookies and try again
- Check that middleware is properly exported from `src/middleware.ts`
- Verify the matcher pattern includes admin routes

## 📚 Next Steps

1. **Set environment variables** in `.env.local`
2. **Generate a secure `NEXTAUTH_SECRET`**
3. **Change the default admin password**
4. **Test login** at `/admin/login`
5. **Deploy to Vercel** - Environment variables will be automatically used

## 🔗 Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Vercel Edge Middleware](https://vercel.com/docs/functions/edge-middleware)
- [JWT Best Practices](https://datatracker.ietf.org/doc/html/rfc8725)
