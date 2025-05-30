# TalentScout

**TalentScout** is a modern, full-stack talent marketplace built as a TypeScript monorepo. It connects employers with top-tier professionals using AI-driven matching, real-time chat, secure payments, and analytics. Designed for performance and scalability, the platform leverages Next.js, Express, MongoDB Atlas, AWS S3, and Tailwind CSS.

---

## 🔑 Key Features

* **AI-Powered Matching**: Smart algorithms suggest ideal candidates or roles instantly.
* **Real-Time Chat & Collaboration**: Built‑in chat and scheduling tools streamline communication.
* **Secure Payments**: Integrated gateway handles transactions, milestones, and escrow.
* **Analytics Dashboard**: Visualize hiring/freelancing metrics with Recharts and custom reports.
* **Scalable Media Storage**: AWS S3 bucket for profile photos, portfolios, and document uploads.
* **Two‑Factor Authentication**: Speakeasy-powered 2FA for enhanced security.
* **Modular, Monorepo Architecture**: Clean separation of frontend, backend, shared types, and services.

---

## 📂 Repository Structure

```bash
TalentScout/
├── frontend/          # Next.js 14 App Router + Tailwind CSS UI
│   ├── app/           # Pages (Home, Auth, Browse, Profile, Dashboard)
│   ├── components/    # Shared React components
│   ├── public/        # Static assets
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── tsconfig.json  # Next.js TypeScript settings
├── backend/           # Express 5 API + MongoDB Atlas
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── lib/       # MongoDB connection
│   │   └── index.ts
│   └── tsconfig.json
├── shared/            # Shared TypeScript types & utils
│   ├── src/types/
│   └── tsconfig.json
├── services/          # Auxiliary services
│   └── media/         # AWS S3 upload logic
├── .gitignore         # Common ignores
├── package.json       # Root workspace config
└── tsconfig.json      # Root TypeScript references
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js ≥ 18.x
* npm ≥ 9.x
* MongoDB Atlas cluster URI
* AWS S3 credentials (bucket, region, access key, secret)

### 1) Clone & Install

```bash
git clone git@github.com:<your-username>/TalentScout.git
cd TalentScout
git checkout main
npm install
```

### 2) Environment Variables

Create a `.env` file at the **root** with:

```dotenv
# MongoDB
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.example.net/talentscout
MONGODB_DB=talentscout

# JWT
JWT_ACCESS_SECRET=<random_string>
JWT_REFRESH_SECRET=<random_string>

# AWS S3
S3_BUCKET=<bucket_name>
S3_REGION=<region>
S3_ACCESS_KEY=<key>
S3_SECRET_KEY=<secret>

# Email (SMTP)
SMTP_HOST=<smtp.example.com>
SMTP_PORT=465
SMTP_USER=<user>
SMTP_PASS=<pass>
EMAIL_FROM=no-reply@talentscout.com

# Frontend URL
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### 3) Run Locally

```bash
npm run dev
```

* **Frontend**: [http://localhost:3000](http://localhost:3000)
* **Backend**: [http://localhost:4000/api/health](http://localhost:4000/api/health)

---

## 🛠️ Scripts

* `npm run dev` — concurrent start of frontend & backend in watch mode
* `npm run build` — build all workspaces (frontend & backend)
* `npm run start` — start the production server (backend) and frontend

---

## 📈 Deploy

* **Frontend**: Vercel (auto-deploy from GitHub)
* **Backend**: Docker or Heroku (Node.js buildpack)
* **Environment**: Set same `.env` variables in your host provider.

---

## 🤝 Contributing

1. Fork the repo and create a feature branch: `git checkout -b feat/YourFeature`
2. Commit your changes: `git commit -m "feat: add ..."`
3. Push to your branch: `git push origin feat/YourFeature`
4. Open a Pull Request and describe your changes.

---

© 2025 TalentScout. All rights reserved.
