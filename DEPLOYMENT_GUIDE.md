# Jyoti Education Center — Complete Deployment & Architecture Guide

## Table of Contents
1. [Overview](#1-overview)
2. [Tech Stack](#2-tech-stack)
3. [System Architecture — How It All Works Together](#3-system-architecture)
4. [Core Concepts Explained](#4-core-concepts-explained)
5. [Database Architecture (`mysql2` vs Prisma)](#5-database-architecture)
6. [Step-by-Step Command Guide](#6-step-by-step-command-guide)
   - [Phase A: Saving & Pushing Code Changes (Git)](#phase-a-saving--pushing-code-changes-git)
   - [Phase B: Deploying Changes to the Live Server](#phase-b-deploying-changes-to-the-live-server)
   - [Phase C: Running SQL Database Migrations](#phase-c-running-sql-database-migrations)
7. [Admin Panel → Live Site Content Management](#7-admin-panel--live-site-content-management)
8. [Command Cheat Sheet](#8-command-cheat-sheet)

---

## 1. Overview

**Jyoti Education Center (JEC)** is a full-stack Next.js 16 web application deployed on DirectAdmin shared hosting (Himalayan Host) with a MariaDB/MySQL database.

- **Live Site**: [https://jyotieducation.edu.np](https://jyotieducation.edu.np)
- **Admin Panel**: [https://jyotieducation.edu.np/admin](https://jyotieducation.edu.np/admin)
- **DirectAdmin Control Panel**: [https://jyotieducation.edu.np:2222](https://jyotieducation.edu.np:2222)
- **Database**: `jyoti_jecapp` via phpMyAdmin at `dacloud.himalayan.host`

---

## 2. Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16.2.9 (App Router) |
| **Language** | TypeScript + JSX / React 19 |
| **Database** | MariaDB / MySQL via native `mysql2/promise` connection pool |
| **Server Runner** | Custom `server.js` on Phusion Passenger (Node.js 20) |
| **Hosting Environment** | DirectAdmin / CloudLinux (Himalayan Host) |
| **Styling** | Vanilla CSS with custom design tokens |

---

## 3. System Architecture

```
                                    ┌────────────────────────┐
                                    │    GitHub Repository   │
                                    │ (nl56-py/jyotieducation)│
                                    └───────────▲────────────┘
                                                │ git push
                                                │
┌────────────────────────┐          ┌───────────┴────────────┐
│   Local Machine (Dev)  │          │   DirectAdmin Server   │
│  - Edit code in G:\JEC │─────────►│  - Node.js 20 Passenger│
│  - npm run build       │  Upload  │  - server.js           │
│  - deploy_next.zip     │   Zip    │  - MariaDB database    │
└────────────────────────┘          └───────────┬────────────┘
                                                │
                                    ┌───────────▼────────────┐
                                    │   Live Website Visitors│
                                    │  & Admin CMS Users     │
                                    └────────────────────────┘
```

---

## 4. Core Concepts Explained

### A. Next.js 16 (App Router)
* **What it is**: A modern full-stack framework that handles both the **frontend** (what visitors see) and **backend API routes** (handling forms, logins, and database queries).
* **Key Directories**:
  * Public pages: `src/app/(public)/`
  * Admin CMS pages: `src/app/(admin)/admin/`
  * API endpoints: `src/app/api/`

### B. MariaDB Database & Native `mysql2` Engine
* **The Database**: `jyoti_jecapp` stores all dynamic data: destinations, universities, team members, testimonials, blog posts, services, and leads.
* **Why `mysql2` instead of Prisma?**: Shared hosting servers (CloudLinux) enforce strict timer and memory limits that cause Prisma's binary query engine to crash (`PANIC: timer has gone away`). We replaced Prisma with a **pure JavaScript `mysql2/promise` connection pool** in [`src/lib/db/client.ts`](file:///g:/JEC/src/lib/db/client.ts). It is 100% stable, fast, and provides a fluent query builder interface.

### C. Phusion Passenger & `server.js`
* **Passenger**: The application runner on DirectAdmin that keeps Node.js alive.
* **`server.js`**: The main entry point on the server. It boots Next.js, serves static files, and provides an in-process zip extractor (`/__unzip__`) so you can update the site without shell restriction errors.
* **Restarting**: Whenever code changes, touching `tmp/restart.txt` tells Passenger to reload the application.

---

## 5. Database Architecture (`mysql2` vs Prisma)

The custom query builder in `src/lib/db/client.ts` exposes a fluent chaining interface compatible with Supabase-style calls:

```typescript
import db from '@/lib/db/client';

// Fetch published team members
const { data, error } = await db.from('team_members')
  .select('*, media_assets(path)')
  .eq('status', 'published')
  .order('sort_order', { ascending: true });

// Insert a new lead
const { data, error } = await db.from('leads')
  .insert({ full_name: 'John Doe', phone: '9800000000', status: 'new' });

// Update a destination
const { data, error } = await db.from('destinations')
  .update({ cost_range: 'AUD 25,000 / year' })
  .eq('slug', 'australia');
```

---

## 6. Step-by-Step Command Guide

### Phase A: Saving & Pushing Code Changes (Git)

Whenever you edit files locally, use Git to save and push your changes to GitHub.

#### Step 1: Check what files were changed
```bash
git status
```

#### Step 2: Stage all changes
```bash
git add -A
```

#### Step 3: Commit with a descriptive message
```bash
git commit -m "feat: Add new destination feature and update styling"
```

#### Step 4: Push to GitHub
```bash
git push origin main
```

---

### Phase B: Deploying Changes to the Live Server

Choose **one** of the following methods to deploy your code to `jyotieducation.edu.np`:

#### Method 1: Deploy from Local Machine (Standard 3-Step Process)

1. **Build locally**:
   ```powershell
   npm run build
   ```

2. **Package `.next` into a zip**:
   ```powershell
   python -c "import os, zipfile; z=zipfile.ZipFile('deploy_next.zip','w',zipfile.ZIP_DEFLATED); [z.write(os.path.join(r,f), os.path.relpath(os.path.join(r,f),'.').replace('\\\\','/')) for r,d,fs in os.walk('.next') if 'cache' not in r.split(os.sep) for f in fs]; z.close()"
   ```

3. **Upload, Extract & Restart Server**:
   ```powershell
   # Upload zip to server
   curl.exe -k -u "jyoti:Damak123@#" -F "action=upload" -F "path=/domains/jyotieducation.edu.np/public_html" -F "file1=@deploy_next.zip" https://jyotieducation.edu.np:2222/CMD_API_FILE_MANAGER

   # Extract on server
   curl.exe -k "https://jyotieducation.edu.np/__unzip__?file=deploy_next.zip"

   # Restart Passenger app
   curl.exe -k -u "jyoti:Damak123@#" -F "action=upload" -F "path=/domains/jyotieducation.edu.np/public_html/tmp" -F "file1=@server.js;filename=restart.txt" https://jyotieducation.edu.np:2222/CMD_API_FILE_MANAGER
   ```

---

#### Method 2: Deploy via DirectAdmin Terminal

1. Log in to DirectAdmin (`https://jyotieducation.edu.np:2222`) → **Extra Features → Terminal**.
2. Run these commands:
   ```bash
   cd /home2/jyoti/domains/jyotieducation.edu.np/public_html
   git pull origin main
   source /home2/jyoti/nodevenv/domains/jyotieducation.edu.np/public_html/20/bin/activate
   npm run build
   touch tmp/restart.txt
   ```

---

### Phase C: Running SQL Database Migrations

When you create new SQL files in `supabase/migrations/` (e.g., `020_seed_remaining_destinations.sql`), you can execute them on the live database in **two ways**:

#### Option 1: Via phpMyAdmin (Visual Interface)
1. Go to `https://dacloud.himalayan.host/phpMyAdmin/`
2. Select database `jyoti_jecapp`
3. Click the **SQL** tab at the top
4. Paste your SQL script and click **Go**

#### Option 2: Via Server SQL Helper Endpoint
Send raw SQL via a POST request:
```powershell
curl.exe -k -X POST "https://jyotieducation.edu.np/__run_sql__" -H "Content-Type: text/plain" --data-raw "SELECT COUNT(*) FROM destinations;"
```

---

## 7. Admin Panel → Live Site Content Management

| Content Type | Admin URL | How Live Site Updates |
|--------------|-----------|-----------------------|
| **Destinations** | `/admin/destinations` | Updates instantly on dynamic detail pages (`/destinations/[slug]`) |
| **Team Members** | `/admin/team` | Updates instantly across dynamic endpoints |
| **Testimonials** | `/admin/testimonials` | Updates instantly on public homepage and testimonials section |
| **Blog Posts** | `/admin/blogs` | Updates instantly on `/blogs` and `/blogs/[slug]` |
| **Services** | `/admin/services` | Updates instantly on `/services/[slug]` |
| **Videos** | `/admin/videos` | Updates instantly on `/videos-gallery` |

---

## 8. Command Cheat Sheet

| Task | Command |
|------|---------|
| **Check modified files** | `git status` |
| **Stage all changes** | `git add -A` |
| **Save commit** | `git commit -m "your message"` |
| **Push to GitHub** | `git push origin main` |
| **Build locally** | `npm run build` |
| **Upload `.next` build** | `curl.exe -k -u "jyoti:Damak123@#" -F "action=upload" -F "path=/domains/jyotieducation.edu.np/public_html" -F "file1=@deploy_next.zip" https://jyotieducation.edu.np:2222/CMD_API_FILE_MANAGER` |
| **Extract build on server** | `curl.exe -k "https://jyotieducation.edu.np/__unzip__?file=deploy_next.zip"` |
| **Restart server** | `curl.exe -k -u "jyoti:Damak123@#" -F "action=upload" -F "path=/domains/jyotieducation.edu.np/public_html/tmp" -F "file1=@server.js;filename=restart.txt" https://jyotieducation.edu.np:2222/CMD_API_FILE_MANAGER` |

---

> ⚠️ **Security Reminder**: The endpoints `/__unzip__`, `/__test_db__`, and `/__run_sql__` in `server.js` are helper routes for deployment. Remember to password-protect or restrict them before final public production launch.
