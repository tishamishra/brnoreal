# How to Get Supabase API Keys

## Step-by-Step Guide

### Step 1: Create a Supabase Account & Project

1. Go to **[https://supabase.com](https://supabase.com)**
2. Click **"Start your project"** or **"Sign in"** if you already have an account
3. Sign up with GitHub, Google, or email
4. Once logged in, click **"New Project"**

### Step 2: Create Your Project

Fill in the project details:
- **Name**: `brno-real-estate` (or any name you prefer)
- **Database Password**: Create a strong password (⚠️ **SAVE THIS** - you'll need it later)
- **Region**: Choose the region closest to your users (e.g., `West US`, `Europe West`)
- Click **"Create new project"**

⏳ Wait 1-2 minutes for your project to be created.

### Step 3: Get Your API Keys

Once your project is ready:

1. In your Supabase dashboard, look at the **left sidebar**
2. Click on **"Settings"** (gear icon ⚙️)
3. Click on **"API"** in the settings menu
4. You'll see a page with your project credentials

### Step 4: Copy Your Keys

On the API settings page, you'll find:

#### 1. Project URL
- Look for **"Project URL"** section
- Copy the URL (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
- This is your `NEXT_PUBLIC_SUPABASE_URL`

#### 2. API Keys
- Look for **"Project API keys"** section
- Find the **"anon"** or **"public"** key
- It's a long string starting with `eyJ...` (JWT token)
- This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

⚠️ **Important**: Use the **"anon"** or **"public"** key, NOT the **"service_role"** key (that one is secret and should never be exposed in client-side code).

### Step 5: Save Your Keys

1. Open the `.env.local` file in your project root (I've created it for you)
2. Replace the placeholder values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-actual-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdXItcHJvamVjdC1pZCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjE2MjM5MDIyfQ.your-actual-key-here
```

3. Save the file

### Step 6: Restart Your Dev Server

After saving `.env.local`:

1. Stop your current dev server (Ctrl+C in terminal)
2. Start it again:
   ```bash
   npm run dev
   ```

The app will now automatically use Supabase!

## Visual Guide

The API settings page looks like this:

```
┌─────────────────────────────────────┐
│  Project URL                        │
│  https://xxxxx.supabase.co          │ ← Copy this
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  Project API keys                   │
│                                     │
│  anon / public                      │
│  eyJhbGciOiJIUzI1NiIsInR5cCI6...   │ ← Copy this
│                                     │
│  service_role (secret)              │
│  eyJhbGciOiJIUzI1NiIsInR5cCI6...   │ ← DON'T use this
└─────────────────────────────────────┘
```

## Security Notes

✅ **Safe to expose** (these go in `.env.local`):
- `NEXT_PUBLIC_SUPABASE_URL` - Public project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public anon key (has Row Level Security)

❌ **Never expose**:
- `service_role` key - This bypasses all security
- Database password - Keep this private

## Troubleshooting

- **"Invalid API key"**: Make sure you copied the entire key (they're very long)
- **"Project not found"**: Check that your Project URL is correct
- **Keys not working**: Make sure you restarted the dev server after adding keys

## Next Steps

After adding your keys:
1. Run the database migrations (see `supabase/migrations/001_initial_schema.sql`)
2. Seed sample data (see `supabase/seed.sql`)
3. Your app will automatically start using Supabase!


