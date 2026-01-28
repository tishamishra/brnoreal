# Vercel Variables Setup - Simple Method

## 🚀 3 Steps में Setup

### Step 1: Vercel Dashboard में जाएं
1. https://vercel.com/dashboard खोलें
2. अपना project select करें
3. **Settings** → **Environment Variables** click करें

### Step 2: 2 Variables Add करें

**Variable 1:**
```
Key: ADMIN_EMAIL
Value: your-admin@email.com
Environment: Production, Preview, Development (सभी select करें)
```

**Variable 2:**
```
Key: ADMIN_PASSWORD
Value: अपना secure password
Environment: Production, Preview, Development
```

हर variable के बाद **Save** click करें।

### Step 3: Redeploy करें
1. **Deployments** tab पर जाएं
2. Latest deployment पर **⋯** (three dots) click करें
3. **Redeploy** select करें
4. **Redeploy** button click करें

## ✅ Done!

अब `/admin/login` पर जाकर:
- **Email**: Vercel में set किया हुआ `ADMIN_EMAIL`
- **Password**: Vercel में set किया हुआ `ADMIN_PASSWORD`

से login कर सकते हैं।

---

## ⚠️ Optional (Recommended)

अगर security के लिए `NEXTAUTH_SECRET` भी add करना चाहते हैं:

```bash
# Terminal में run करें
openssl rand -base64 32
```

Output copy करके Vercel में add करें:
```
Key: NEXTAUTH_SECRET
Value: [generated secret]
Environment: Production, Preview, Development
```

---

## 🔑 Required Variables

```env
ADMIN_EMAIL=your-admin@email.com
ADMIN_PASSWORD=your-secure-password
```

---

## 📝 Notes

- `ADMIN_EMAIL` और `ADMIN_PASSWORD` **required** हैं
- `NEXTAUTH_SECRET` optional है (लेकिन security के लिए recommended)
- Variables add करने के बाद **Redeploy** जरूर करें
