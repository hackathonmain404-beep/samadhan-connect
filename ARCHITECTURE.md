# Architecture & System Design — Samadhan Connect

## 1. Executive Summary

**Samadhan Connect** is a digital innovation and civic problem-solving platform engineered for the state of Jharkhand. The platform connects citizens, student innovators, accredited universities, corporate CSR partners, and government nodal officers into a unified innovation lifecycle:

$$\text{Problem} \longrightarrow \text{Verification} \longrightarrow \text{Innovation} \longrightarrow \text{Solution} \longrightarrow \text{Project} \longrightarrow \text{Implementation} \longrightarrow \text{Impact}$$

---

## 2. High-Level Architectural Topology

```
+---------------------------------------------------------------------------------------+
|                                    CLIENT LAYER                                       |
|  +---------------------------------------------------------------------------------+  |
|  |                            React 19 SPA + Vite 8                                |  |
|  |   - Tailwind CSS v4 Design System (Forest Green #064e3b & Warm Amber #d97706)   |  |
|  |   - Responsive Layouts: PublicLayout (Navbar/Footer) & DashboardLayout (Sidebar)|  |
|  |   - Universal 1-Click Persona Switcher Banner (Demo Evaluator Gateway)          |  |
|  +---------------------------------------------------------------------------------+  |
+---------------------------------------------------------------------------------------+
                                           │
                                           ▼
+---------------------------------------------------------------------------------------+
|                                STATE & CONTEXT ENGINE                                 |
|  +-------------------+  +--------------------+  +------------------+  +-------------+  |
|  |    AuthContext    |  |  ChallengeContext  |  |  ProjectContext  |  | MessageCtx  |  |
|  | (6 Stakeholder    |  | (CRUD, Upvotes,    |  | (5-Phase Tracker,|  | (1-to-1     |  |
|  |  Roles & JWT)     |  |  Comments, Triage) |  |  Teams, Mentors) |  |  Chat Room) |  |
|  +-------------------+  +--------------------+  +------------------+  +-------------+  |
+---------------------------------------------------------------------------------------+
                                           │
                                           ▼
+---------------------------------------------------------------------------------------+
|                                API & SERVICE LAYER                                    |
|  +---------------------------------------------------------------------------------+  |
|  |                       Universal API Client (`src/services/api.js`)              |  |
|  |   - Base URL: `VITE_API_URL` (default: `http://localhost:5000/api`)             |  |
|  |   - Request Interceptor: `Authorization: Bearer <JWT>`                          |  |
|  |   - Response Interceptor: 401, 403, 404, 409, 500 error sanitization            |  |
|  |   - Fallback Engine: Resilient local dataset synchronization for offline demos  |  |
|  +---------------------------------------------------------------------------------+  |
+---------------------------------------------------------------------------------------+
                                           │
                                           ▼
+---------------------------------------------------------------------------------------+
|                               BACKEND & PERSISTENCE                                   |
|  +---------------------------------------------------------------------------------+  |
|  |  RESTful Micro-Endpoints / Express API Server (`http://localhost:5000`)         |  |
|  |   - Auth & RBAC (Citizen, Student, University, Industry, Government, Admin)     |  |
|  |   - Challenges & Geolocation Services                                           |  |
|  |   - Solution Proposals & Technical Blueprints                                   |  |
|  |   - Project Management & Sprint Kanban Tasks                                    |  |
|  |   - Telemetry Ingestion (IoT Water Quality, Mist Cannons, Weather Nodes)         |  |
|  |   - 1-to-1 Direct Messaging & Notifications Dispatcher                         |  |
|  +---------------------------------------------------------------------------------+  |
+---------------------------------------------------------------------------------------+
```

---

## 3. Core Domain Modules

### 3.1 Authentication & Role-Based Access Control (RBAC)
The platform enforces strict role-based capability boundaries across 6 distinct personas:

| Stakeholder Role | Access & Key Responsibilities |
|---|---|
| **Citizen** | Report local problems with GPS tags, upload evidence photos, track 6-stage problem resolution pipeline, upvote/support community issues. |
| **Student / Researcher** | Explore open challenges, submit technical solution proposals, form innovation teams, manage multi-phase project workspaces, log sprint tasks. |
| **University Coordinator** | Manage faculty mentors, monitor departmental innovation participation (Chemical, CS, Mechanical, Electrical), track institutional R&D. |
| **Industry CSR Partner** | Sponsor prototypes, provide lab mentorship, evaluate milestones, disburse CSR grants, review testbed deployments. |
| **Government Nodal Officer** | Review verification queue, approve citizen challenges for open market listing, request additional info, monitor district telemetry. |
| **Platform Administrator** | Statewide telemetry node health, global moderation, system analytics, user access governance. |

---

### 3.2 Problem Resolution Lifecycle (7 Stages)

```
[1. Problem Submitted] ➔ [2. Govt Verification] ➔ [3. Open for Solutions] ➔ [4. Solution Proposed] ➔ [5. Project Prototype] ➔ [6. Field Testing & Trials] ➔ [7. Resolved & Implemented]
```

---

### 3.3 Project Workspace Pipeline (5 Execution Phases)
Active projects follow a 5-phase engineering methodology:
1. **Research**: Literature review, baseline water/soil/air chemistry analysis, user surveys.
2. **Prototype**: CAD design, benchtop assembly, sensor node calibration, firmware flashing.
3. **Testing**: Stress testing, 14-day continuous runtime, validation against BIS/WHO standards.
4. **Implementation**: Field installation at Gram Panchayat Bhavan or pilot school, operator training.
5. **Completed**: Formal handover to Village Water/Health Committee with operational manuals.

---

## 4. Resilient Fallback Architecture

To ensure 100% demo reliability during live hackathon evaluations, judge interviews, and intermittent network environments:
- **Primary Mode**: Standard async HTTP communication with `http://localhost:5000/api`.
- **Secondary / Offline Mode**: Local reactive state layer backed by versioned browser storage (`samadhan_v2_*`) populated with rich seed data for all 24 Jharkhand districts.
- **Error Boundary**: Root-level `ErrorBoundary` catching unexpected rendering faults and allowing 1-click cache resets without breaking the user experience.

---

## 5. Security Architecture

1. **Authentication Tokens**: Standard JWT Bearer token format stored in secure web storage.
2. **Input Validation**: Client-side validation across all multi-step form fields (PIN codes, mobile numbers, file sizes, image mime types).
3. **Data Protection**: Sensitive GPS coordinates and citizen contact information masked for public viewing unless approved by district nodal officers.
