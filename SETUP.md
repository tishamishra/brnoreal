# Supabase Backend Setup

## Quick Start

### 1. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in project details:
   - **Name**: brno-real-estate
   - **Database Password**: (save this!)
   - **Region**: Choose closest to your users
4. Wait 1-2 minutes for project creation

### 2. Get API Keys

1. In Supabase dashboard → **Settings** → **API**
2. Copy:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)

### 3. Create Environment File

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 4. Set Up Database

**Option A: Using Supabase Dashboard (Recommended)**

1. Go to **SQL Editor** in Supabase dashboard
2. Copy contents of `supabase/migrations/001_initial_schema.sql`
3. Paste and click **Run**
4. Copy contents of `supabase/seed.sql`
5. Paste and click **Run** again

**Option B: Using Supabase CLI**

```bash
npm install -g supabase
supabase link --project-ref your-project-ref
supabase db push
```

### 5. Verify Setup

1. Go to **Table Editor** in Supabase dashboard
2. You should see `listings` table with sample data
3. Run `npm run dev` to start the app
4. The app will automatically use Supabase if configured, or fall back to static data

## How It Works

- **With Supabase**: App fetches data from your Supabase database
- **Without Supabase**: App uses static data from `src/data/sample-data.ts` as fallback
- **No breaking changes**: The app works either way!

## Managing Listings

Once Supabase is set up, you can:

1. **Via Supabase Dashboard**: Go to Table Editor → listings → Add/Edit rows
2. **Via API**: Use Supabase client in your code
3. **Build Admin Panel**: Create a custom admin interface later

## Troubleshooting

- **"Missing Supabase environment variables"**: Check `.env.local` exists and has correct values
- **Connection errors**: Verify your project URL and anon key
- **No data showing**: Run the seed SQL script to add sample data


