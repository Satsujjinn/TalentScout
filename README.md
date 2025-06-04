# TalentScout (Athlete Edition)

TalentScout is a full‐stack monorepo application designed to connect sports recruiters with top athletes.  
It provides AI‐powered matching, real‐time chat, secure payments, and analytics.  

---

## 📘 Table of Contents

1. [Project Overview](#project-overview)  
2. [Tech Stack](#tech-stack)  
3. [Folder Structure](#folder-structure)  
4. [Getting Started](#getting-started)  
   - [Prerequisites](#prerequisites)  
   - [Installation](#installation)  
   - [Running Locally](#running-locally)  
   - [Environment Variables](#environment-variables)  
5. [Frontend Details](#frontend-details)  
6. [Backend Details](#backend-details)  
7. [Deploying to Production](#deploying-to-production)  
8. [Contributing](#contributing)  
9. [License](#license)  

---

## 🏆 Project Overview

TalentScout’s Athlete Edition is a platform where:
- **Recruiters** can browse and connect with top athletes across different sports.  
- **Athletes** create profiles highlighting their skills, statistics, and video highlights.  
- **AI** matches the best athletes to recruiters’ criteria.  
- **Real‐time chat** and scheduling tools make communication seamless.  
- **Secure payments** facilitate transactions for private coaching, training sessions, or endorsement deals.  
- **Analytics** help recruiters track hiring trends and athletes monitor their engagement metrics.  

---

## ⚙️ Tech Stack

- **Monorepo** managed via npm workspaces  
- **Frontend**  
  - Next.js 15 (app directory, React 18, TypeScript)  
  - Tailwind CSS for styling (pastel teal/aquamarine palette)  
  - Framer Motion for animations  
  - Swiper for carousels (testimonials, featured athletes)  
  - Next.js <Image> for optimized image loading  
- **Backend**  
  - Node.js 18+ with TypeScript  
  - Express.js (RESTful API)  
  - MongoDB (hosted on Atlas) with Mongoose  
  - JWT (JSON Web Tokens) for authentication  
  - bcrypt for password hashing  
  - AWS S3 (or S3‐compatible) for media storage  
- **Shared**  
  - `shared/` directory for shared types, interfaces, and utilities  
- **Dev Tools**  
  - ESLint + Prettier  
  - ts‐node‐dev for hot‐reload in backend  
  - concurrently for running frontend + backend in development  

## 🚀 Getting Started

### Prerequisites

1. **Node.js ≥ 18.x** (download from https://nodejs.org/)  
2. **npm ≥ 9.x** (bundled with Node.js)  
3. **MongoDB Atlas** account (or any hosted MongoDB)  
4. **AWS S3 bucket** (or S3‐compatible) for media uploads  

### Installation

1. Clone repository (if you haven’t already):

```bash
git clone https://github.com/yourusername/TalentScout.git
cd TalentScout
```

Install all dependencies via npm workspaces:

```bash
npm install
```

This installs backend/, frontend/, and shared/ dependencies in one go.

### Environment Variables
Create .env files for both backend and frontend (use the .example templates):

Backend (`backend/.env`)

```
MONGODB_URI=<your_atlas_connection_string>
JWT_SECRET=<your_jwt_secret>
AWS_ACCESS_KEY_ID=<your_aws_key>
AWS_SECRET_ACCESS_KEY=<your_aws_secret>
AWS_REGION=<your_aws_region>
AWS_S3_BUCKET=<your_s3_bucket_name>
```

The backend validates required variables via Zod in `src/config/env.ts`. Ensure `MONGODB_URI` is provided.


Frontend (`frontend/.env.local`)

```
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_S3_REGION=<your_aws_region>
NEXT_PUBLIC_S3_BUCKET=<your_s3_bucket_name>
```

### Running Locally

1. Start the Backend

```bash
cd backend
npm run dev
```

The backend will run at http://localhost:4000 (by default).

API routes are available under http://localhost:4000/api/....

2. Start the Frontend
Open a new terminal window/tab:

```bash
cd frontend
npm run dev
```

Next.js will run on http://localhost:3000.

Tailwind styles and Swiper carousels will be active.

3. Monorepo “All‐at‐Once” Command
Alternatively, from the repo root:

```bash
npm run dev
```

This runs both frontend and backend concurrently (requires concurrently in root package.json).

🎨 Frontend Details
Entry point: frontend/app/page.tsx

Global styles: frontend/app/globals.css

Color palette: Tailwind’s teal range (e.g., bg-teal-50, text-teal-700, bg-teal-400, etc.) for a pastel aquamarine look.

Animations: Implemented with Framer Motion on headings, feature cards, and Swiper slides.

Carousel:

```tsx
<Swiper
  modules={[Navigation, Pagination, Autoplay]}
  navigation={true}
  pagination={{ clickable: true }}
  autoplay={{ delay: 5000 }}
  loop={true}
  spaceBetween={30}
  slidesPerView={1}
>
  {/* SwiperSlide components… */}
</Swiper>
```
Images: Next.js <Image> in testimonials and anywhere else you need optimized assets.

🔧 Backend Details
Entry point: backend/src/index.ts

Express setup:

backend/src/routes/ – API route definitions (e.g., users.ts, athletes.ts, auth.ts)

backend/src/controllers/ – Handler functions for each route

backend/src/models/ – Mongoose schemas & models (User, Athlete, etc.)

backend/src/middleware/ – JWT authentication, error handlers, etc.

backend/src/services/ – Utility functions (e.g., AWS S3 upload, email service, AI matching service)

MongoDB: Mongoose connects using process.env.MONGODB_URI.

Authentication:

Register & login endpoints issue JWT tokens.

Protected routes use middleware/authenticate.ts to verify token.

AWS S3:

Athlete profile images, highlight videos, and any other media uploads stored in S3.

Use AWS SDK v3 or an S3‐wrapper service in backend/src/services/s3.ts.

☁️ Deploying to Production
Push to remote (GitHub/GitLab).

Provision a VPS or Cloud App Service (e.g., Vercel for frontend, Heroku/Render for backend).

Frontend:

Connect to GitHub repo, set environment variables in Vercel’s dashboard (NEXT_PUBLIC_API_URL, NEXT_PUBLIC_S3_BUCKET, etc.).

Build command: npm run build (Next.js)
If building in an offline environment, set `NEXT_FONT_IGNORE_MISSING=true` to
skip Google font downloads.

Output directory: .next (handled by Vercel automatically).

Backend:

On your chosen host (Heroku/Render/AWS EC2), set environment variables (MONGODB_URI, JWT_SECRET, AWS_ACCESS_KEY_ID, etc.).

Build step: npm run build (tsc)

Start command: npm start (runs the compiled server in `dist/index.js`).

DNS & SSL

Point your domain (e.g. talentscout.com) to the frontend hosting provider.

Ensure TLS certificates are configured (most managed platforms auto‐enable HTTPS).

Continuous Deployment

On each push to main, the hosting provider will rebuild & redeploy.

Monitor logs for build errors and runtime issues.

🤝 Contributing
Fork this repository.

Create a new branch:

```bash
git checkout -b feature/awesome-new-feature
```

Commit your changes:

```bash
git commit -m "Add awesome new feature"
```

Push to your fork:

```bash
git push origin feature/awesome-new-feature
```

Open a Pull Request against main.

Please follow the existing code style:

Typescript in both frontend and backend.

ESLint and Prettier are configured—run npm run lint before committing.

Tailwind utility classes for styling; no inline CSS.

📄 License
This project is licensed under the MIT License. See LICENSE for details.
