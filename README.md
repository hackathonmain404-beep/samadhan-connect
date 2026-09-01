# 🇮🇳 Samadhan Connect — Jharkhand Civic Problem-Solving Platform
### Smart India Hackathon 2026

> **Connecting Citizens, Students, Universities, Industry CSR Partners, and Government Officials to identify and collaboratively solve real-world societal problems in Jharkhand.**

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, React Router v6, Tailwind CSS, Lucide React Icons |
| **Backend & Database** | Supabase (PostgreSQL 15, Row Level Security, Enums, Foreign Keys, Triggers, RPC Functions) |
| **Authentication** | Supabase Auth (JWT Sessions with RBAC claim profiles) |
| **Realtime** | Supabase Realtime (WebSockets for 1-to-1 Split Messaging & Notifications) |
| **File Storage** | Supabase Storage (`challenge-evidence` bucket for photos, documents & videos) |

---

## 📂 Repository Architecture

```
.
├── src/                               # React 19 Frontend Application
│   ├── components/                    # UI cards, layouts, PersonaBanner, navbar, progress trackers
│   ├── context/                       # AuthContext, ChallengeContext, ProjectContext, MessageContext
│   ├── data/                          # Jharkhand seed models & mock data
│   ├── lib/                           # Supabase JS client (src/lib/supabase.js)
│   ├── pages/                         # Landing, Explore, Report, Workspace, Dashboards (6 Personas)
│   └── services/                      # Supabase modular service layer (Auth, Challenges, Projects, etc.)
├── supabase/
│   └── migrations/                    # 18 Modular PostgreSQL Migrations
│       ├── 001_extensions.sql        # UUID-OSSP & pgcrypto
│       ├── 002_enums.sql             # user_role, challenge_status, project_phase
│       ├── 003_profiles.sql          # public.profiles linked to auth.users
│       ├── 004_districts.sql         # 24 Districts of Jharkhand
│       ├── 005_categories.sql        # 10 Civic Problem Domain Categories
│       ├── 006_challenges.sql        # Challenges, Evidence, Comments, Upvotes
│       ├── 007_solutions.sql         # Student Solution Blueprints
│       ├── 008_projects.sql          # Workspaces, Milestones, Mentors
│       ├── 009_tasks.sql             # Sprint Kanban Tasks
│       ├── 010_teams.sql             # Student Collaboration Hub & Recruitment
│       ├── 011_directories.sql       # Universities & Industry Partners
│       ├── 012_messaging.sql         # Realtime 1-to-1 Chat
│       ├── 013_notifications.sql     # Realtime Civic Alerts
│       ├── 014_telemetry.sql         # IoT Telemetry Sensors & Readings
│       ├── 015_indexes.sql           # Performance B-Trees & Full-Text Search GIN
│       ├── 016_functions_triggers.sql# Profile auto-create trigger & verification RPC
│       ├── 017_rls.sql               # Comprehensive Row Level Security (RLS)
│       └── 018_seed_data.sql         # Realistic Jharkhand SIH Dataset
├── public/                            # Static icons, favicon, logos
├── SUPABASE_BACKEND_SETUP.md          # Complete Supabase Dashboard Setup Manual
├── .env.example                       # Supabase Environment Variables Template
├── package.json                       # Frontend & Supabase dependencies
└── README.md                          # Main project guide
```

---

## 🚀 Quickstart Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Supabase Credentials
Copy `.env.example` to `.env` and fill in your Supabase project keys:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key-here
```
*(Read [`SUPABASE_BACKEND_SETUP.md`](file:///d:/hackathon%20prac/sih/sih/SUPABASE_BACKEND_SETUP.md) for step-by-step instructions on executing the SQL migrations in the Supabase SQL Editor).*

### 3. Run Development Server
```bash
npm run dev
```

Application will run live at: **`http://localhost:5173`**

---

## 🏛️ 6 Stakeholder Roles & Persona Switching
The platform includes an instant 1-click **Persona Switcher Banner** at the top:
1. **Citizen** (*Report & track local challenges with photo/video evidence*)
2. **Student / Researcher** (*Propose solutions, form teams & build prototypes*)
3. **University Coordinator** (*Mentor student teams & manage campus R&D cells*)
4. **Industry Mentor** (*Sponsor projects via CSR grants & evaluate milestones*)
5. **Government Nodal Officer** (*Verify problems & monitor state-wide pilot deployments*)
6. **Platform Administrator** (*State-wide telemetry & moderation*)
