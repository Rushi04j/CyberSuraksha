# Deploying CyberSuraksha

This guide will help you deploy the **CyberSuraksha** application to the web. We recommend using **Vercel**, as it offers the best integration with Next.js.

## Option 1: Deploy with Vercel (Recommended)

### Prerequisites
- A GitHub, GitLab, or Bitbucket account.
- A [Vercel account](https://vercel.com/signup).

### Steps
1.  **Push your code to a Git repository** (GitHub/GitLab/Bitbucket).
2.  **Log in to Vercel** and click **"Add New..."** -> **"Project"**.
3.  **Import your repository**. Vercel will detect it's a Next.js project.
4.  **Configure Environment Variables**:
    *   Expand the **"Environment Variables"** section.
    *   Add the keys from your `.env.local` file:
        *   `NEXT_PUBLIC_SUPABASE_URL`: (Your Supabase Project URL)
        *   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: (Your Supabase Anon Key)
5.  Click **"Deploy"**.

Vercel will build and deploy your site. Once finished, you will get a live URL (e.g., `https://cyber-suraksha.vercel.app`).

---

## Option 2: Deploy with Netlify

1.  **Push your code to Git**.
2.  **Log in to Netlify**.
3.  Click **"Add new site"** -> **"Import an existing project"**.
4.  Connect your Git provider and select the repo.
5.  **Build Settings**:
    *   **Build command**: `npm run build`
    *   **Publish directory**: `.next` (Netlify usually handles Next.js automatically properly via the Essential Next.js plugin).
6.  **Environment Variables**:
    *   Go to **"Advanced"** -> **"Environment variables"** and add your Supabase keys.
7.  Click **"Deploy site"**.

---

## Manual Build (for hosting on your own server)

If you want to host it on a VPS (like AWS EC2, DigitalOcean):

1.  Run the build command:
    ```bash
    npm run build
    ```
2.  Start the production server:
    ```bash
    npm start
    ```
3.  The app will run on `http://localhost:3000`. You can use Nginx or Apache as a reverse proxy to expose it to the internet.
