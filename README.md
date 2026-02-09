# Heartline 2.0

Heartline is a Sentiment CRM platform designed to help users deepen their relationships through meaningful digital communication.

## Features

*   **Free Message Library**: Curated collection of messages for every occasion.
*   **CRM Dashboard**: Track important dates and relationships.
*   **AdSense-Ready Blog**: High-quality content on relationships and communication.
*   **Supabase Integration**: Auth and Database for robust data management.

## Getting Started Locally

1.  Clone the repository:
    ```bash
    git clone https://github.com/dei83/heartline2.git
    cd heartline2
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up Environment Variables:
    Create a `.env.local` file with your Supabase credentials:
    ```
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
    ```

4.  Run the development server:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) (or port 3005 if 3000 is busy).

## Deploy to Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdei83%2Fheartline2)

**Important:** When deploying to Vercel, don't forget to add your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in the Vercel Project Settings > Environment Variables.

## Run in GitHub Codespaces

You can run this project directly in the browser using GitHub Codespaces:

1.  Click the likely green "Code" button on the GitHub repo page.
2.  Select the "Codespaces" tab.
3.  Click "Create codespace on main".
4.  Once the editor loads, create the `.env.local` file with your credentials.
5.  Running `npm run dev` will open a preview port in your browser.
