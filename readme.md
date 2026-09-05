# AttendEase — Attendance Management System

A modern attendance management web application built with **Next.js (App Router)** and ready for **Supabase** database & authentication.

## 🚀 Features Scaffolding

- **Next.js App Router Architecture**: Fast server rendering and client-side interactions with TypeScript.
- **Supabase Integration Ready**:
  - Browser Client (`src/lib/supabase/client.ts`)
  - Server Client with async cookie handling (`src/lib/supabase/server.ts`)
  - Session Refresh Middleware (`src/middleware.ts` & `src/lib/supabase/middleware.ts`)
  - Environment variables template (`.env.example` and `.env.local`)
- **Modern Vanilla CSS Aesthetic**:
  - Dark-mode glassmorphism styling
  - Ambient glow lighting effects
  - Responsive tables, interactive badges, and smooth hover micro-animations
- **Role-Based Portals**:
  - **Login Portal** (`/login`): Toggle between Student and Teacher authentication, with quick preview demo links.
  - **Student Dashboard** (`/dashboard/student`): Attendance percentages, streaks, class schedule, QR code scanner simulator, and log history.
  - **Teacher / Faculty Dashboard** (`/dashboard/teacher`): Active class session control, classroom projector dynamic QR code generator, live attendance counters, and interactive roster table with instant status overrides.

---

## 🛠️ Getting Started

### 1. Configure Supabase Credentials
Edit `.env.local` with your Supabase Project URL and anon public key:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   ├── layout.tsx         # Dashboard topbar & view switcher
│   │   │   ├── student/page.tsx   # Student dashboard placeholder
│   │   │   └── teacher/page.tsx   # Teacher dashboard placeholder
│   │   ├── login/
│   │   │   └── page.tsx           # Authentication page
│   │   ├── globals.css            # Design tokens, variables & glassmorphism
│   │   ├── layout.tsx             # Root layout with ambient lighting
│   │   └── page.tsx               # Landing & portal selection page
│   ├── lib/
│   │   └── supabase/
│   │       ├── client.ts          # Browser Supabase client
│   │       ├── server.ts          # Server Component Supabase client
│   │       └── middleware.ts      # Auth session refresh helper
│   └── middleware.ts              # Next.js route middleware
├── .env.example                   # Environment variable template
├── .env.local                     # Local environment file
├── package.json
└── tsconfig.json
```
