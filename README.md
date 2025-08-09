#SolanaCEX: D-CEX with WaaS
SolCex is a **Decentralized–Centralized Exchange (D-CEX)** — a hybrid trading platform that combines the **self-custody and transparency** of a DEX (Decentralized Exchange) with the **speed, simplicity, and onboarding experience** of a CEX (Centralized Exchange).  
Users keep control of their funds while enjoying an **intuitive, CEX-like interface** and **fast order execution**.

---

## 🔹 How SolCex is Unique
Unlike traditional centralized exchanges (CEXs) or pure decentralized exchanges (DEXs):

- **Non-custodial**: You keep control of your funds.
- **Centralized onboarding**: Easy sign-in with Google (like a CEX).
- **Decentralized execution**: All trades happen on the Solana blockchain.
- **Best price execution**: Uses Jupiter Aggregator for optimal swap rates.
- **Open-source**: Fully transparent and can be self-hosted.

---

## 🚀 Features
- **Google OAuth Sign-In** with NextAuth
- **Wallet connection** with Solana Web3.js
- **Live token prices** from Jupiter API
- **Instant token swaps** (SOL, USDC, USDT)
- **Responsive UI** with TailwindCSS

---

## 🛠 Tech Stack
- **Frontend & Backend**: Next.js 14, React 18, TypeScript
- **Auth**: NextAuth (Google provider)
- **Blockchain**: Solana Web3.js, SPL Token
- **Database**: PostgreSQL (Supabase or Render-hosted)
- **ORM**: Prisma
- **Styling**: TailwindCSS
- **API**: Jupiter Aggregator

---

## ⚙️ Prerequisites
- Node.js v18+
- npm v9+
- PostgreSQL database (local or hosted, e.g. Render, Supabase)
- Google Cloud account for OAuth setup ([Google Cloud Console](https://console.cloud.google.com/  apis/credentials))

---

## 📦 Setup & Run Locally

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/vasujindals/SolanaCEX-D-CEX-with-WaaS.git
cd SolanaCEX-D-CEX-with-WaaS
```

### 2️⃣ Create `.env` in the Root Folder
```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
DATABASE_URL=""
```

**How to get them:**
- **GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET** → Create an OAuth Client ID in [Google Cloud Console](https://console.cloud.google.com/apis/credentials) and copy both values.  
  Redirect URIs:
  - Local: `http://localhost:3000/api/auth/callback/google`
  - Prod: `https://<your-domain>/api/auth/callback/google`

  JavaScript origins:
  - Local: `http://localhost:3000`
  - Prod: `https://<your-domain>`

- **DATABASE_URL** → Get your PostgreSQL connection string from **Render**, **Supabase**, **Neon**, or your own Postgres server.

---

### 3️⃣ Install Dependencies
```bash
npm install
```

### 4️⃣ Push Prisma Schema to Database
```bash
npx prisma db push
```

### 5️⃣ Start the Development Server
```bash
npm run dev
```
Now open: [http://localhost:3000](http://localhost:3000)

---

## 🚀 Deployment
You can deploy SolCex on **Render**, **Vercel**, or any Node.js hosting service.

- Set the same **environment variables** (`.env`) in your hosting platform’s settings.
- Use a **hosted PostgreSQL instance** (Render, Supabase, Neon).

---
