# CyberSuraksha - Final Setup Guide

This project is now a complete, running application with a frontend, backend integration (Supabase), and database schema.

## 1. Status
- **Frontend**: Next.js 15 application is running.
- **Backend**: Supabase client is configured in `src/lib/supabase.ts`.
- **Database**: SQL Schema is provided in `supabase_schema.sql`.

## 2. Running the Application
The development server is currently running. You can access it at:
**http://localhost:3000**

If you need to restart it:
```bash
npm run dev
```

## 3. Database Setup (Crucial for "Full Compatibility")
To ensure the backend works 100% with the real database:

1.  Go to your [Supabase Dashboard](https://supabase.com/dashboard).
2.  Open the **SQL Editor**.
3.  Open the file `supabase_schema.sql` located in this project's root directory.
4.  Copy the contents and paste them into the Supabase SQL Editor.
5.  Click **Run**.
    *   This creates the `profiles` table (linked to Auth).
    *   This creates the `complaints` table.
    *   This sets up Row Level Security (RLS) policies.

## 4. Verification
Once the database is set up:
1.  **Login**: Use the "Demo Citizen" login (mocks auth) OR Sign Up with a real email (uses Supabase Auth if keys are valid).
2.  **Dashboard**: You will see the SOS button, Safety Score, and other widgets.
3.  **File Complaint**: Submitting a form will write to the `complaints` table in Supabase.
4.  **Multilingual**: Use the globe icon 🌐 in the sidebar to switch languages (Hindi, Marathi, etc.).

## 5. Troubleshooting
-   **"Connection Refused"**: Ensure `npm run dev` is running.
-   **Supabase Errors**: Check `.env.local` to ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct.
-   **Missing Translations**: Some regional languages fallback to English/Hindi for content; this is expected behavior (polyfills).
