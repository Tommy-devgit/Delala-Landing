# Delala Platform Credentials & Environment Variables Guide

Comprehensive setup guide for configuring database credentials, Supabase authentication keys, and API environment variables across all Delala applications.

---

## Overview of Credential Files

Every application in the monorepo has a corresponding environment template file (`.env.example`). You should copy `.env.example` to create local secret files (`.env` or `.env.local`).

| Application / Service | File Location | Key Purpose |
| :--- | :--- | :--- |
| **NestJS Backend API** | `services/api/.env` | Supabase PostgreSQL Connection String (`DATABASE_URL`), JWT Secret, Service Role Key |
| **Product Website** | `product-website/.env.local` | Next.js API URL (`NEXT_PUBLIC_API_URL`), Supabase Public Anon Key |
| **Admin Dashboard** | `admin-dashboard/.env.local` | Next.js API URL (`NEXT_PUBLIC_API_URL`), Supabase Public Anon Key |

---

## 1. How to Obtain Credentials from Supabase

### Step A: Database Connection String (`DATABASE_URL`)
1. Log in to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Select your Delala project.
3. Navigate to **Project Settings** (gear icon) -> **Database**.
4. Scroll down to **Connection String**.
5. Select **URI** (or Connection Pooling / Transaction Pooler on port `6543`).
6. Copy the URI string:
   ```env
   DATABASE_URL="postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
   ```

### Step B: Direct URL for Prisma Migrations (`DIRECT_URL`)
1. In the same **Database** settings page, select **Direct Connection** (Port `5432`).
2. Copy the URI string:
   ```env
   DIRECT_URL="postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"
   ```

### Step C: API Keys & JWT Secret
1. Navigate to **Project Settings** -> **API**.
2. **Project URL**: Copy `https://[YOUR-PROJECT-REF].supabase.co`.
3. **Project API Keys**:
   - `anon` `public`: Copy key for `SUPABASE_ANON_KEY` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
   - `service_role` `secret`: Copy key for `SUPABASE_SERVICE_ROLE_KEY`.
4. **JWT Settings**:
   - Copy **JWT Secret** for `SUPABASE_JWT_SECRET`.

---

## 2. Quick Setup Commands

### NestJS Backend API Setup (`services/api/`)
```bash
# 1. Copy template to .env
cp services/api/.env.example services/api/.env

# 2. Open services/api/.env and replace DATABASE_URL, SUPABASE_URL, and SUPABASE_JWT_SECRET with your credentials

# 3. Generate Prisma Client & push schema to Supabase
cd services/api
npx prisma db push
npx prisma generate

# 4. Seed initial database records (cities, brokers, properties)
npx ts-node prisma/seed.ts
```

### Product Website Setup (`product-website/`)
```bash
# Copy template to .env.local
cp product-website/.env.example product-website/.env.local
```

### Admin Dashboard Setup (`admin-dashboard/`)
```bash
# Copy template to .env.local
cp admin-dashboard/.env.example admin-dashboard/.env.local
```

---

## 3. Security Best Practices

> [!CAUTION]
> **Never commit real secret files (`.env` or `.env.local`) to version control.**
> `.env` and `.env.local` files are already added to `.gitignore` across all project directories.
