# 🚀 Samadhan Connect — Jharkhand Societal Problem-Solving Platform

> **Connecting Citizens, Students, Universities, Industry Partners, and Government Officials to identify and collaboratively solve real-world societal problems in Jharkhand.**

---

## 📂 Repository Structure

```
.
├── backend/                  # REST API Backend (Node.js, Express, MongoDB, Mongoose)
│   ├── src/
│   │   ├── config/           # Database connection
│   │   ├── controllers/      # MVC business logic controllers
│   │   ├── middleware/       # JWT auth, role RBAC, multer uploads, error handling
│   │   ├── models/           # 13 Mongoose database models
│   │   ├── routes/           # 15 API route modules (40+ endpoints)
│   │   ├── services/         # Notification & cross-cutting services
│   │   ├── utils/            # Seeder script & realistic Jharkhand demo data
│   │   └── app.js            # Express app configuration & middleware binding
│   ├── uploads/              # Local storage for images, videos & documents
│   ├── .env.example          # Environment variables template
│   ├── architecture.md       # Architectural blueprints, data flows & ER diagrams
│   ├── changecatalog.md      # Feature catalog & release history
│   ├── package.json          # Dependencies & scripts
│   ├── README.md             # Complete backend manual & React integration guide
│   ├── server.js             # Main server bootstrap
│   └── structure.md          # Codebase structure & component directory catalog
└── README.md                 # Project root manual
```

---

## 📚 Documentation Index

1. **[Backend Architecture & Diagrams](file:///d:/hackathon%20prac/sih/sih/backend/architecture.md)** — Architectural blueprint, MVC layers, RBAC matrix, problem-to-solution state machine, and database ER relationships.
2. **[Backend Codebase Structure](file:///d:/hackathon%20prac/sih/sih/backend/structure.md)** — Directory tree, module definitions, schema fields, and complete route-to-controller mapping.
3. **[Backend Change Catalog](file:///d:/hackathon%20prac/sih/sih/backend/changecatalog.md)** — Comprehensive catalog of all 13 models, 40+ endpoints, middlewares, and services.
4. **[Backend API & Integration Guide](file:///d:/hackathon%20prac/sih/sih/backend/README.md)** — Complete REST API reference, demo accounts, and copy-pasteable React + Vite `fetch()` examples.

---

## ⚡ Quickstart Backend

```bash
# 1. Enter backend folder
cd backend

# 2. Install dependencies
npm install

# 3. Setup environment configuration
cp .env.example .env

# 4. Seed database with realistic Jharkhand demo data
npm run seed

# 5. Start development server
npm run dev
```

Server runs on: **`http://localhost:5000`**  
CORS enabled for: **`http://localhost:5173`** (React + Vite Frontend)

### 📋 Demo Logins (Password for all: `password123`)
- **Citizen**: `citizen@example.com`
- **Student**: `student@example.com`
- **University**: `university@example.com`
- **Industry**: `industry@example.com`
- **Government**: `government@example.com`
- **Admin**: `admin@example.com`
