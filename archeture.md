# Architecture & System Design — Samadhan Connect

> Note: Please refer to [`ARCHITECTURE.md`](./ARCHITECTURE.md) for the complete, extensive system architecture and design specifications.

---

## Quick Architecture Summary

- **Frontend**: React 19, Vite 8, Tailwind CSS v4, Lucide Icons, Canvas Confetti.
- **Theme**: Forest Green (`#064e3b`), Warm Amber (`#d97706`), Soft off-white backgrounds (`#f8fafc`).
- **6 Stakeholder Personas**: Citizen, Student Innovator, University, Industry Partner, Government Official, Platform Admin.
- **Workflow Journey**:
  $$\text{Problem} \longrightarrow \text{Verification} \longrightarrow \text{Innovation} \longrightarrow \text{Solution} \longrightarrow \text{Project} \longrightarrow \text{Implementation} \longrightarrow \text{Impact}$$
- **API Client**: Centralized in `src/services/api.js` with Bearer token authentication and resilient fallback.
