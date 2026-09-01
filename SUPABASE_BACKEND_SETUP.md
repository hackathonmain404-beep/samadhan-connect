# 🚀 Samadhan Connect — Supabase Backend Master Setup Guide (SIH 2026)

> **Complete Guide for Setting Up Supabase Auth, PostgreSQL, Row Level Security (RLS), Realtime & Storage.**

---

## 📑 Table of Contents
1. [Creating Your Free Supabase Project](#1-creating-your-free-supabase-project)
2. [Running the Database Migrations](#2-running-the-database-migrations)
3. [Configuring Storage Buckets](#3-configuring-storage-buckets)
4. [Connecting to Frontend (`.env`)](#4-connecting-to-frontend-env)
5. [Understanding Database Triggers & RLS](#5-understanding-database-triggers--rls)
6. [Testing the Live Setup](#6-testing-the-live-setup)

---

## 1. Creating Your Free Supabase Project

1. Go to **[https://supabase.com](https://supabase.com)** and sign in with GitHub.
2. Click **New Project**.
3. Fill in the project details:
   - **Name**: `samadhan-connect`
   - **Database Password**: *(Choose a strong password and save it securely)*
   - **Region**: `South Asia (Mumbai)` *(Fastest for India / SIH presentation)*
   - **Pricing Plan**: `Free`
4. Click **Create new project** (takes ~60 seconds to provision).

---

## 2. Running the Database Migrations

You have **18 modular SQL migration files** in [`supabase/migrations/`](file:///d:/hackathon%20prac/sih/sih/supabase/migrations):

```
supabase/migrations/
├── 001_extensions.sql          # UUID & pgcrypto
├── 002_enums.sql               # user_role, challenge_status, project_phase
├── 003_profiles.sql            # public.profiles linked to auth.users
├── 004_districts.sql           # 24 Jharkhand Districts
├── 005_categories.sql          # 10 Civic Problem Categories
├── 006_challenges.sql          # Challenges, Evidence, Upvotes, Comments
├── 007_solutions.sql           # Solutions & Technical Blueprints
├── 008_projects.sql            # Projects, Milestones, Activity Stream
├── 009_tasks.sql               # Kanban Tasks Table
├── 010_teams.sql               # Student Teams & Recruitment
├── 011_directories.sql         # Universities & Industry Partners
├── 012_messaging.sql           # Realtime 1-to-1 Chat
├── 013_notifications.sql       # Realtime Notifications
├── 014_telemetry.sql           # IoT Telemetry Sensors & Readings
├── 015_indexes.sql             # Performance B-Trees & GIN Search
├── 016_functions_triggers.sql  # Auto-Profile Trigger & Verification RPC
├── 017_rls.sql                 # Comprehensive Row Level Security Policies
└── 018_seed_data.sql           # Realistic Jharkhand Demo Dataset
```

### ⚡ How to Run in Supabase SQL Editor:
1. In your Supabase Dashboard, click the **SQL Editor** tab (icon looks like `>_` on the left sidebar).
2. Click **New Query**.
3. You can copy-paste the contents of each file from `001` to `018` in sequence, or copy them all together into the editor.
4. Click **Run** (green button).
5. All 18 tables, triggers, and demo data will be created instantly with `Success. No rows returned.`!

---

## 3. Configuring Storage Buckets

For photo & video evidence uploads:
1. In the Supabase Dashboard, click **Storage** (folder icon on sidebar).
2. Click **New Bucket**.
3. Set **Bucket Name**: `challenge-evidence`
4. Toggle **Public Bucket**: `ON` *(Allows public viewing of problem photos)*
5. Click **Save bucket**.

---

## 4. Connecting to Frontend (`.env`)

1. In Supabase Dashboard, go to **Project Settings** (gear icon) → **API**.
2. Copy your **Project URL** and **`anon` `public` Key**:
   - `Project URL`: `https://your-project-id.supabase.co`
   - `anon public key`: `eyJhbGciOi...`
3. Create a `.env` file in your root project folder:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```
4. Restart your frontend Vite dev server:
   ```bash
   npm run dev
   ```

---

## 5. Understanding Database Triggers & RLS

### 🔄 The Automatic Profile Trigger (`handle_new_user`)
When a user registers via `supabase.auth.signUp()`:
1. Supabase creates a record in `auth.users`.
2. PostgreSQL trigger `on_auth_user_created` automatically fires and inserts a corresponding record into `public.profiles` with the user's selected role (`CITIZEN`, `STUDENT`, `GOVERNMENT`, etc.).
3. **No manual double-writes needed!**

### 🛡️ Atomic RPC Verification (`verify_challenge_rpc`)
When a Government Official clicks **"Approve & Verify"**:
1. The database checks if the caller's JWT role is `GOVERNMENT` or `ADMIN`.
2. It changes the status to `'OPEN_FOR_SOLUTIONS'`.
3. It writes to `challenge_status_history`.
4. It dispatches a Realtime notification to the citizen.
5. All 4 operations happen **in a single database transaction**!

---

## 6. Testing the Live Setup

1. Open `http://localhost:5173`.
2. Click **Register** → Create a citizen account.
3. Submit a new challenge in the **Report Problem** wizard.
4. Switch to the **Government Nodal Officer** persona.
5. Notice the problem appearing in the **Verification Queue**. Click **Approve**!
6. Switch back to **Citizen** → Check your **Notification Drawer** to see the instant live notification! 🎉
