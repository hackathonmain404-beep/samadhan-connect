# Samadhan Connect 🇮🇳
### Digital Innovation & Civic Problem-Solving Platform for Jharkhand (Smart India Hackathon 2026)

> **Connecting Citizens, Students, Universities, Industry Partners, and Government Officials to identify and collaboratively solve real-world societal problems in Jharkhand.**

---

## 📂 Project Architecture & Monorepo Structure

```
.
├── src/                      # Frontend Application (React 19, Vite, Tailwind CSS, React Router)
│   ├── components/           # UI components, Cards, Layouts, PersonaBanner, Navbar, Footer
│   ├── context/              # Auth, Challenge, Project, Message, Notification Contexts
│   ├── pages/                # Landing, Explore, Report, Workspace, Dashboards, Auth
│   ├── services/api.js       # API client configured with VITE_API_URL
│   └── main.jsx              # React app entry point
├── backend/                  # REST API Backend (Node.js, Express, MongoDB, Mongoose)
│   ├── src/
│   │   ├── config/           # Database connection (Mongoose)
│   │   ├── controllers/      # MVC controllers (Auth, Challenges, Solutions, Projects, etc.)
│   │   ├── middleware/       # JWT Auth, Role RBAC, Multer file upload, Error handling
│   │   ├── models/           # 13 Mongoose database models
│   │   ├── routes/           # 15 API route modules (40+ endpoints)
│   │   ├── services/         # Notification dispatcher
│   │   └── utils/            # Database seeder & realistic Jharkhand demo dataset
│   ├── uploads/              # Local storage for images, videos & documents
│   ├── architecture.md       # Architectural blueprints & ER diagrams
│   ├── structure.md          # Complete directory tree & component catalog
│   ├── changecatalog.md      # Feature catalog & release history
│   └── README.md             # Detailed backend manual & API guide
├── public/                   # Static icons, favicon, logos
├── package.json              # Frontend package dependencies & scripts
└── README.md                 # Full repository documentation
```

---

## 🌟 Key Platform Features

- **Universal 1-Click Persona Switcher**: Top demo banner allowing instant 1-click switching between all 6 stakeholder roles:
  - **Citizen** (*Report & track local challenges with photo/video evidence*)
  - **Student / Researcher** (*Propose solutions, form teams & build prototypes*)
  - **University Coordinator** (*Mentor student teams & manage campus R&D cells*)
  - **Industry Mentor** (*Sponsor projects via CSR grants & evaluate milestones*)
  - **Government Official** (*Verify problems & monitor state-wide pilot deployments*)
  - **Platform Administrator** (*State-wide telemetry & moderation*)
- **6-Step Problem Reporting Wizard**: Multi-step grievance & challenge reporting with 1-click demo samples, photo upload dropzones, and confetti celebrations.
- **Explore Challenges Marketplace**: Searchable discovery marketplace with category, 24-district, and urgency filters.
- **Project Workspaces**: 5-phase visual lifecycle tracker (*Research → Prototype → Testing → Implementation → Completed*), sprint task Kanban boards, milestone roadmaps, activity streams, and mentor review ratings.
- **Directories & Matchmaking**:
  - *University Directory* with innovation portfolios (BIT Mesra, NIT Jamshedpur, IIT ISM Dhanbad, etc.).
  - *Industry Directory* with CSR mentorship requests (Tata Steel, SAIL, CCL, JSPL, Tata Motors).
  - *Collaboration Hub* for student team formation & recruitment.
- **1-to-1 Split-Screen Messaging**: Real-time communication channels between citizens, students, mentors, and government coordinators.
- **Notification Center**: Centralized alerts for challenge verification, proposal approvals, and milestone achievements.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, React Router v6, Tailwind CSS, Lucide React Icons |
| **Backend** | Node.js, Express.js (MVC Pattern), Mongoose ODM, JWT, bcryptjs |
| **Database** | MongoDB (13 collections with compound indexes & text search) |
| **File Storage** | Multer local storage engine (`/uploads` for images, PDFs, docs, PPTs, videos) |
| **Design System** | Forest Green (`#064e3b`), Warm Amber (`#d97706`), Google Fonts (*Outfit* & *Plus Jakarta Sans*) |

---

## 📚 Technical Documentation Index

1. **[Backend Architecture & Diagrams](file:///d:/hackathon%20prac/sih/sih/backend/architecture.md)** — Architectural blueprint, MVC layers, RBAC matrix, problem-to-solution state machine, and database ER relationships.
2. **[Backend Codebase Structure](file:///d:/hackathon%20prac/sih/sih/backend/structure.md)** — Directory tree, module definitions, schema fields, and complete route-to-controller mapping.
3. **[Backend Change Catalog](file:///d:/hackathon%20prac/sih/sih/backend/changecatalog.md)** — Comprehensive catalog of all 13 models, 40+ endpoints, middlewares, and services.
4. **[Backend API Reference & Manual](file:///d:/hackathon%20prac/sih/sih/backend/README.md)** — Complete REST API reference, demo accounts, and copy-pasteable React + Vite `fetch()` examples.

---

## 🚀 Running the Platform Locally

### 1. Start the Backend API (Port 5000)
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Seed database with realistic Jharkhand demo data
npm run seed

# Run backend development server
npm run dev
```
Backend API will be running at `http://localhost:5000`.

### 2. Start the Frontend App (Port 5173)
```bash
# In a new terminal at the root directory
npm install

# Start Vite dev server
npm run dev
```
Frontend will be live at `http://localhost:5173`.

---

## 🔑 Demo Accounts (Password for all: `password123`)

| Role | Email | Password | Representative Entity |
| :--- | :--- | :--- | :--- |
| **Citizen** | `citizen@example.com` | `password123` | Ramesh Mahto (Ranchi Citizens Welfare) |
| **Student** | `student@example.com` | `password123` | Rahul Kumar (BIT Mesra CSE / IoT) |
| **University** | `university@example.com` | `password123` | Prof. Amit Verma (BIT Mesra Dean Research) |
| **Industry** | `industry@example.com` | `password123` | Rajesh Agarwal (Tata Steel CSR Head) |
| **Government** | `government@example.com` | `password123` | Anil Kumar Jha (Dept of Urban Development, GoJ) |
| **Admin** | `admin@example.com` | `password123` | Master Admin (Jharkhand Innovation Council) |

---

## 🏛️ Endorsements & Alignment
- **Smart India Hackathon 2026**
- **Government of Jharkhand**
- **AICTE & MoE Innovation Cell**
- **NITI Aayog**
