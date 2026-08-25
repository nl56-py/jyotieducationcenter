# 🚀 Jyoti Educations — DirectAdmin 25 Deployment Guide

**Application:** Jyoti Education Corner (Jyoti Educations)  
**Environment:** DirectAdmin (DA 25), CloudLinux, LiteSpeed Web Server, Phusion Passenger  
**Database:** MariaDB 11.4 (Port 3306) / PostgreSQL (Port 5432)  
**Node.js Runtime:** v20.x LTS or v22.x LTS  

---

## 📋 Table of Contents
1. [Overview & Architecture](#overview--architecture)
2. [Step 1: Database Setup in DirectAdmin](#step-1-database-setup-in-directadmin)
3. [Step 2: Upload Application Files](#step-2-upload-application-files)
4. [Step 3: Configure DirectAdmin Node.js App (Phusion Passenger)](#step-3-configure-directadmin-nodejs-app-phusion-passenger)
5. [Step 4: Configure Environment Variables (.env)](#step-4-configure-environment-variables-env)
6. [Step 5: Install Dependencies & Build](#step-5-install-dependencies--build)
7. [Step 6: Default Admin Login Credentials](#step-6-default-admin-login-credentials)
8. [Media Uploads & Storage Permissions](#media-uploads--storage-permissions)
9. [Troubleshooting & Logs](#troubleshooting--logs)

---

## 1. Overview & Architecture
The application has been engineered to run completely independently on **DirectAdmin 25** without requiring Supabase or external cloud DB services.

- **Frontend:** Next.js 15 (React 19) with server components and static generation.
- **Backend API:** Centralized REST endpoints with JWT session authentication.
- **Database Layer:** Prisma ORM connected to local MariaDB/MySQL (`DATABASE_URL`).
- **Media Storage:** Stored on disk in `/public/uploads/` with database tracking in `media_assets`.
- **Runtime:** `server.js` managed by Phusion Passenger & LiteSpeed.

---

## 2. Step 1: Database Setup in DirectAdmin

### Option A: MariaDB 11.4 / MySQL (Recommended)
1. Log into your **DirectAdmin Control Panel**.
2. Navigate to **Account Manager** → **MySQL Management** (or **Databases**).
3. Click **Create New Database**:
   - **Database Name:** `jyoti_appdb` (e.g. `youruser_jyotidb`)
   - **Database User:** `jyoti_dbuser` (e.g. `youruser_jyotiusr`)
   - **Password:** *Generate a strong password and save it.*
4. Click **phpMyAdmin** in DirectAdmin.
5. Select your newly created database.
6. Click the **Import** tab at the top.
7. Choose the `init.sql` file (found in the root or `g:/JEC/init.sql`) and click **Go / Import**.
8. All 18 database tables and default admin accounts are now created!

---

## 3. Step 2: Upload Application Files

1. Compress the project folder `edumark.edu.np` (excluding `.next` and `node_modules` for speed) into a `.zip` archive.
2. In DirectAdmin, open **File Manager** and navigate to your domain's folder:
   ```
   /domains/jyotieducations.edu.np/public_html/
   ```
   *(Or a sub-folder if you configure Application root accordingly).*
3. Upload the `.zip` archive and **Extract** all files.

---

## 4. Step 3: Configure DirectAdmin Node.js App (Phusion Passenger)

1. In DirectAdmin, navigate to **Extra Features** → **Setup Node.js App**.
2. Click **Create Application**:
   - **Node.js version:** `20.x` or `22.x`
   - **Application mode:** `Production`
   - **Application root:** `/domains/jyotieducations.edu.np/public_html`
   - **Application URL:** `jyotieducations.edu.np` (or your domain)
   - **Application startup file:** `server.js`
3. Click **Create**.

---

## 5. Step 4: Configure Environment Variables (.env)

In your DirectAdmin File Manager inside the application root, create or edit `.env`:

```env
# 1. Database Connection (MariaDB 11.4 on port 3306)
DATABASE_URL="mysql://youruser_jyotiusr:YourPasswordHere@localhost:3306/youruser_jyotidb"

# 2. JWT Security Secret
JWT_SECRET="jyoti_secure_jwt_token_key_984729384723984723984723"
NEXTAUTH_SECRET="jyoti_nextauth_production_secret_key_834729837492"

# 3. Domain URL
NEXT_PUBLIC_APP_URL="https://jyotieducations.edu.np"
NEXT_PUBLIC_SITE_NAME="Jyoti Educations"

# 4. Environment
NODE_ENV="production"
PORT=3000
```

---

## 6. Step 5: Install Dependencies & Build

In DirectAdmin **Node.js App** dashboard:
1. Copy the **Command for entering to the virtual environment** displayed at the top (e.g., `source /home/user/nodevenv/.../bin/activate`).
2. Open **Terminal** in DirectAdmin or connect via **SSH**.
3. Paste the virtual environment command and execute:
   ```bash
   cd /home/user/domains/jyotieducations.edu.np/public_html
   npm install
   npx prisma generate
   npm run build
   ```
4. Click **Restart** in the Node.js App dashboard.
5. Your application is now live at `https://jyotieducations.edu.np`! 🎉

---

## 7. Step 6: Default Admin Login Credentials

Navigate to `https://jyotieducations.edu.np/admin` or `https://jyotieducations.edu.np/admin/login`:

- **Email:** `admin@jyotieducations.edu.np`
- **Password:** `Admin@12345`
- **Role:** `super_admin`
- **Name:** `Kedar Poudel (Director)`

*(You can update your password anytime under Admin Dashboard → Profile → Change Password).*

---

## 8. Media Uploads & Storage Permissions

Uploaded files from the Admin panel are saved to:
```
/public/uploads/{blogs,destinations,services,team,notices,banners,general}/
```
Ensure the `/public/uploads` directory has write permissions (`755` or `775`).

---

## 9. Troubleshooting & Logs

- **Application Logs:** In DirectAdmin Node.js App, check the `stderr.log` and `stdout.log` files.
- **Database Connection Test:** If you receive connection errors, verify your MariaDB username, password, and database prefix in `.env`.
- **Restart Application:** Whenever you update `.env` or code, click **Restart** in DirectAdmin Node.js App.
