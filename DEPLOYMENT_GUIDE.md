# Jyoti Education Center — Deployment & Architecture Guide

## Overview

**Jyoti Education Center (JEC)** is a full-stack Next.js 16 web application deployed on DirectAdmin shared hosting (Himalayan Host) with a MariaDB/MySQL database.

- **Live Site**: [https://jyotieducation.edu.np](https://jyotieducation.edu.np)
- **Admin Panel**: [https://jyotieducation.edu.np/admin](https://jyotieducation.edu.np/admin)
- **DirectAdmin**: [https://jyotieducation.edu.np:2222](https://jyotieducation.edu.np:2222)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2.9 (App Router) |
| Language | TypeScript + JSX |
| Database | MariaDB/MySQL via `mysql2/promise` connection pool |
| Server | Custom `server.js` on Phusion Passenger (Node.js 20) |
| Hosting | DirectAdmin / CloudLinux (Himalayan Host) |
| Styling | Vanilla CSS with custom design tokens |

---

## Project Structure

```
G:\JEC/
├── prisma/schema.prisma          # Database schema (reference only)
├── public/
│   ├── favicon/                   # Multi-resolution favicons
│   └── images/                    # Static assets (brand, flags, etc.)
├── server.js                      # Custom Node.js server for Passenger
├── seed_jyoti_data.js             # Database seeding script
├── src/
│   ├── app/                       # Next.js App Router pages & API routes
│   │   ├── (public)/              # Public-facing pages
│   │   ├── admin/                 # Admin panel pages
│   │   └── api/                   # API endpoints
│   ├── components/                # Reusable React components
│   ├── lib/
│   │   ├── db/client.ts           # Database client (mysql2 query builder)
│   │   └── db/prisma.ts           # Prisma client (legacy, unused at runtime)
│   ├── styles/                    # CSS files
│   └── views/                     # Page-level view components
├── supabase/migrations/           # SQL migration & seed files
└── next.config.js                 # Next.js configuration
```

---

## Database

- **Database**: `jyoti_jecapp`
- **User**: `jyoti_jecusr`
- **Host**: `localhost:3306`
- **Access**: phpMyAdmin at `dacloud.himalayan.host`

### Database Client Architecture

The app uses a **custom Supabase-compatible query builder** (`src/lib/db/client.ts`) built on `mysql2/promise`. This was chosen over Prisma ORM because Prisma's binary query engine crashes on shared CloudLinux hosting.

The query builder supports fluent chaining:
```typescript
import db from '@/lib/db/client';

// Select with filters
const { data, error } = await db.from('team_members')
  .select('*, media_assets(path)')
  .eq('status', 'published')
  .order('sort_order', { ascending: true });

// Insert
const { data, error } = await db.from('blog_posts')
  .insert({ title: 'New Post', slug: 'new-post', status: 'draft' });

// Update
const { data, error } = await db.from('destinations')
  .update({ status: 'published' })
  .eq('id', destinationId);
```

---

## Deployment

### Prerequisites
- Node.js 20+ and npm installed locally
- Python 3 (for zip packaging)
- `curl` available in terminal

### Method 1: Deploy via DirectAdmin Terminal (Recommended)

1. **Push code to GitHub**:
   ```bash
   git add -A && git commit -m "your changes" && git push origin main
   ```

2. **SSH/Terminal into DirectAdmin** → Extra Features → Terminal:
   ```bash
   cd /home2/jyoti/domains/jyotieducation.edu.np/public_html
   git pull origin main
   source /home2/jyoti/nodevenv/domains/jyotieducation.edu.np/public_html/20/bin/activate
   npm run build
   touch tmp/restart.txt
   ```

### Method 2: Deploy from Local Machine

1. **Build**:
   ```powershell
   npm run build
   ```

2. **Package**:
   ```powershell
   python -c "
   import os, zipfile
   with zipfile.ZipFile('deploy_next.zip','w',zipfile.ZIP_DEFLATED) as z:
       for r,d,fs in os.walk('.next'):
           if 'cache' in r.split(os.sep): continue
           for f in fs: z.write(os.path.join(r,f), os.path.relpath(os.path.join(r,f),'.'))
   "
   ```

3. **Upload**:
   ```powershell
   curl.exe -k -u "jyoti:Damak123@#" -F "action=upload" -F "path=/domains/jyotieducation.edu.np/public_html" -F "file1=@deploy_next.zip" https://jyotieducation.edu.np:2222/CMD_API_FILE_MANAGER
   ```

4. **Extract & Restart**:
   ```powershell
   curl.exe -k "https://jyotieducation.edu.np/__unzip__?file=deploy_next.zip"
   curl.exe -k -u "jyoti:Damak123@#" -F "action=upload" -F "path=/domains/jyotieducation.edu.np/public_html/tmp" -F "file1=@server.js;filename=restart.txt" https://jyotieducation.edu.np:2222/CMD_API_FILE_MANAGER
   ```

### Method 3: One-Command Deploy Script

Run `.\deploy.ps1` from the project root. This script builds, packages, uploads, extracts, and restarts in one command.

---

## Admin Panel — Content Management

### Dynamic Pages (Changes Appear Instantly)

These pages fetch data from MySQL on every request:
- `/destinations/[slug]` — Individual destination detail pages
- `/blogs` and `/blogs/[slug]` — Blog listing and articles
- `/events`, `/notices` — Events and notices
- `/gallery` — Photo gallery
- `/videos-gallery` — Video gallery
- All `/admin/*` pages

### Static Pages (Require Rebuild After Changes)

These pages are pre-rendered at build time:
- `/` — Homepage
- `/about` — About page
- `/services` — Services listing
- `/destinations` — Destinations grid
- `/test-preparation/*` — Test prep pages
- `/entrance-preparations/*` — Entrance prep pages

**To update static pages after admin edits**, run a rebuild:
```bash
npm run build && touch tmp/restart.txt
```

---

## Key Files

| File | Purpose |
|------|---------|
| `server.js` | Custom Node.js server with static file serving, zip extraction, and seeding endpoints |
| `src/lib/db/client.ts` | MySQL query builder with Supabase-compatible API |
| `seed_jyoti_data.js` | One-time database seeding script |
| `next.config.js` | Next.js config with security headers and external packages |
| `supabase/migrations/*.sql` | SQL migration and seed files |

---

## Security Notes

⚠️ **Remove or protect these debug endpoints in `server.js` before production**:
- `/__unzip__` — Extracts zip files on the server
- `/__test_db__` — Exposes raw database query results
- `/__seed_jyoti_database__` — Re-seeds the entire database

These are development/deployment helpers and should be removed or gated behind authentication for a production environment.
