# EduMark Website

Official website and admin panel for EduMark Pvt. Ltd., built with Next.js, TypeScript, and Supabase.

## Project Documents

- `EduMark_Project_Deliverables_and_User_Manual_UPDATED.docx` - latest delivery report and admin user manual, including the main-branch feature sync.
- `edumark-system-architecture.md` - system architecture and implementation reference.

## Latest Documentation Update

The deliverables/manual has been updated to include:

- Homepage Popups admin module: modal popup and header announcement banner management with scheduling, status, CTA, image upload/link, and sort order controls.
- Admin Gallery Photo Library: direct photo upload, heading/caption entry, accessibility alt text, gallery grid preview, edit/save controls, image view action, and role-based delete behavior.
- Blog Publications: cover image upload from the blog editor, preview after upload, cover image replacement, and cover image removal before saving.
- Shared media upload improvements: direct upload mode plus external/Google Drive URL linking for supported admin modules.
- Video Gallery updates: YouTube, Facebook, Instagram, Google Drive, and uploaded video support with provider-aware public embeds.

## Development

Install dependencies:

```bash
npm install
```

Run the local development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Deployment

The project is configured for Vercel deployment. Production environment variables are required for Supabase authentication, database access, storage uploads, and server-side admin routes.
