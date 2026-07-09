# EduMark Website

Official website and admin panel for EduMark Pvt. Ltd., built with Next.js, TypeScript, and Supabase.

## Project Documents

- `EduMark_Project_Deliverables_and_User_Manual_UPDATED_v1.1.docx` - updated revision documenting the new admin Gallery Photo Library workflow and blog cover image upload/remove feature.
- `edumark-system-architecture.md` - system architecture and implementation reference.

## Latest Documentation Update

The deliverables/manual has been updated to include:

- Admin Gallery Photo Library: direct photo upload, heading/caption entry, accessibility alt text, gallery grid preview, edit/save controls, image view action, and role-based delete behavior.
- Blog Publications: cover image upload from the blog editor, preview after upload, cover image replacement, and cover image removal before saving.
- Sidebar/manual wording updated from the older Photos/media registration flow to the current Gallery module.

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
