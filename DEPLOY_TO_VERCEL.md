# How to Deploy to Vercel

Since your code is already on GitHub, deploying to Vercel is extremely easy. You have two options:

## Option 1: The Easy Way (Vercel Dashboard) - RECOMMENDED

1.  **Go to Vercel**: Open [https://vercel.com](https://vercel.com) in your browser.
2.  **Log In**: Sign in with your **GitHub** account.
3.  **Add New Project**:
    *   Click the **"Add New..."** button (usually top right).
    *   Select **"Project"**.
4.  **Import Repository**:
    *   You should see your list of GitHub repositories.
    *   Find **`MYPORTFOLIO`** (or `Blackhatfx-90/MYPORTFOLIO`).
    *   Click the **"Import"** button next to it.
5.  **Configure**:
    *   **Framework Preset**: It should auto-detect **Next.js**.
    *   **Root Directory**: Leave as `./`.
    *   **Environment Variables**: You don't have any yet, so leave blank.
6.  **Deploy**:
    *   Click **"Deploy"**.
    *   Wait about 30-60 seconds.
    *   🎉 **Done!** You will get a live URL (e.g., `myportfolio-zeta.vercel.app`).

## Option 2: The Hacker Way (Command Line)

If you prefer using the terminal, run these commands in your project folder:

1.  **Install Vercel CLI**:
    ```bash
    npm i -g vercel
    ```

2.  **Login**:
    ```bash
    vercel login
    ```
    (Select GitHub and authenticate in your browser).

3.  **Deploy**:
    ```bash
    vercel
    ```
    *   Follow the prompts (Say 'Y' to everything).
    *   It will upload and deploy immediately.

---

### 💡 Pro Tip
Vercel will now **automatically deploy** whenever you push changes to GitHub (`git push`). You don't need to do anything else!
