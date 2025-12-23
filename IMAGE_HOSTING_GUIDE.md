# Image Hosting Guide

## How Next.js Image Component Works

Next.js Image component requires you to **whitelist** image domains for security reasons. This prevents malicious sites from being used as image sources.

## ✅ Current Setup

Your `next.config.ts` currently allows:
- ✅ `images.unsplash.com`
- ✅ `plus.unsplash.com`
- ✅ `unsplash.com`

## 🌐 Can You Use Images From Anywhere?

**Yes!** But you need to add the domain to `next.config.ts` first.

### How to Add New Image Sources

1. **Find the domain** of your image hosting service
   - Example: `https://cdn.example.com/image.jpg` → domain is `cdn.example.com`
   - Example: `https://example.com/images/photo.jpg` → domain is `example.com`

2. **Add to `next.config.ts`**:

```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "unsplash.com",
      },
      // Add your new domain here:
      {
        protocol: "https",
        hostname: "your-image-host.com",
      },
    ],
  },
};
```

3. **Restart dev server** for changes to take effect

## 📸 Popular Image Hosting Services

### Free Options

1. **Unsplash** (Already configured ✅)
   - URL: `https://images.unsplash.com/...`
   - Free, high-quality stock photos

2. **Cloudinary**
   - URL: `https://res.cloudinary.com/...`
   - Free tier: 25GB storage, 25GB bandwidth
   - Add: `hostname: "res.cloudinary.com"`

3. **Imgur**
   - URL: `https://i.imgur.com/...`
   - Free image hosting
   - Add: `hostname: "i.imgur.com"`

4. **GitHub**
   - URL: `https://raw.githubusercontent.com/...`
   - Free, use your GitHub repo
   - Add: `hostname: "raw.githubusercontent.com"`

### Paid/Professional Options

1. **AWS S3 + CloudFront**
   - URL: `https://your-bucket.s3.amazonaws.com/...`
   - Scalable, professional
   - Add: `hostname: "your-bucket.s3.amazonaws.com"`

2. **Cloudflare Images**
   - URL: `https://imagedelivery.net/...`
   - Fast CDN, optimized images
   - Add: `hostname: "imagedelivery.net"`

3. **Supabase Storage** (Recommended for your setup!)
   - URL: `https://lanktmrtqaisnbbdiaet.supabase.co/storage/v1/object/public/...`
   - Already using Supabase, perfect integration
   - Add: `hostname: "lanktmrtqaisnbbdiaet.supabase.co"`

## 🎯 Recommended: Use Supabase Storage

Since you're already using Supabase, **Supabase Storage** is the best option:

### Benefits:
- ✅ Already integrated with your backend
- ✅ Free tier: 1GB storage
- ✅ Easy to upload via admin panel
- ✅ Automatic CDN
- ✅ Secure with RLS policies

### How to Set Up:

1. **Enable Storage in Supabase**:
   - Go to Storage in Supabase dashboard
   - Create a bucket called `property-images`
   - Make it public

2. **Add to `next.config.ts`**:
```typescript
{
  protocol: "https",
  hostname: "lanktmrtqaisnbbdiaet.supabase.co",
}
```

3. **Upload images**:
   - Via Supabase dashboard → Storage
   - Or via admin panel (can be added later)

4. **Use in listings**:
   - URL format: `https://lanktmrtqaisnbbdiaet.supabase.co/storage/v1/object/public/property-images/filename.jpg`

## 🔒 Security Note

**Why whitelist domains?**
- Prevents malicious sites from being used
- Protects against image-based attacks
- Better performance (Next.js can optimize known domains)

**Best Practice:**
- Only add domains you trust
- Use reputable image hosting services
- For production, be selective about which domains you allow

## 📝 Quick Reference

### Add Any Domain:
```typescript
{
  protocol: "https",  // or "http" for localhost
  hostname: "example.com",
}
```

### Allow All Subdomains:
```typescript
{
  protocol: "https",
  hostname: "**.example.com",  // Allows any subdomain
}
```

### Allow Specific Path:
```typescript
{
  protocol: "https",
  hostname: "example.com",
  pathname: "/images/**",  // Only allow /images/ path
}
```

## 🚀 Quick Setup for Common Services

Want me to add support for a specific image hosting service? Just tell me which one and I'll update your `next.config.ts`!

---

**TL;DR**: Yes, you can use images from anywhere, but you need to add each domain to `next.config.ts` first. Supabase Storage is recommended since you're already using Supabase!


