# 📜 Samadhan Connect — Backend Change Catalog

> **Changelog, Release Notes & Modification History**  
> Complete record of all architectural implementations, model definitions, API routes, middleware, seeder fixtures, and documentation added to the Samadhan Connect REST API backend.

---

## 🏷 Version History

| Version | Release Date | Status | Description |
| :--- | :---: | :---: | :--- |
| **v1.0.0** | 2026-09-01 | **Current Release** | Initial complete release of Samadhan Connect REST API with 13 Mongoose models, 15 route modules, 40+ endpoints, role-based dashboards, seeder script, and React + Vite integration suite. |

---

## 🚀 Release v1.0.0 — Change Details

### 1. Database Collections & Mongoose Schemas (13 Models Added)

| Collection | Schema File | Change Description |
| :--- | :--- | :--- |
| **`User`** | [`src/models/User.js`](file:///d:/hackathon%20prac/sih/sih/backend/src/models/User.js) | **[ADDED]** User authentication schema supporting 6 roles (`citizen`, `student`, `university`, `industry`, `government`, `admin`). Added `bcryptjs` salt hashing pre-save hook, `matchPassword` method, password exclusion in JSON transforms. |
| **`Challenge`** | [`src/models/Challenge.js`](file:///d:/hackathon%20prac/sih/sih/backend/src/models/Challenge.js) | **[ADDED]** Societal problem model with 10 Jharkhand categories, districts, urgency levels (`low`, `medium`, `high`, `critical`), lifecycle statuses (`pending` to `resolved`), evidence attachments, and compound text search index. |
| **`Solution`** | [`src/models/Solution.js`](file:///d:/hackathon%20prac/sih/sih/backend/src/models/Solution.js) | **[ADDED]** Solution proposal model linking student innovators, tech stacks, implementation plans, impact projections, and attached technical blueprints. |
| **`Project`** | [`src/models/Project.js`](file:///d:/hackathon%20prac/sih/sih/backend/src/models/Project.js) | **[ADDED]** Active project model representing approved solutions. Tracks project phases (`research`, `prototype`, `testing`, `implementation`, `completed`), progress % (0-100), mentors, and government coordinators. |
| **`Team`** | [`src/models/Team.js`](file:///d:/hackathon%20prac/sih/sih/backend/src/models/Team.js) | **[ADDED]** Student innovator team model with leader references, members array, university affiliation, and skill tags. |
| **`University`** | [`src/models/University.js`](file:///d:/hackathon%20prac/sih/sih/backend/src/models/University.js) | **[ADDED]** Directory schema for Jharkhand universities (BIT Mesra, NIT Jamshedpur, IIT ISM Dhanbad, etc.) tracking researchers, teams, and projects. |
| **`IndustryPartner`** | [`src/models/IndustryPartner.js`](file:///d:/hackathon%20prac/sih/sih/backend/src/models/IndustryPartner.js) | **[ADDED]** Directory schema for industrial partners (Tata Steel, SAIL, CCL, JSPL, Tata Motors) tracking CSR mentorship and sponsorship metrics. |
| **`Comment`** | [`src/models/Comment.js`](file:///d:/hackathon%20prac/sih/sih/backend/src/models/Comment.js) | **[ADDED]** Discussion model supporting threaded comments on challenges and projects with author population. |
| **`Notification`** | [`src/models/Notification.js`](file:///d:/hackathon%20prac/sih/sih/backend/src/models/Notification.js) | **[ADDED]** Notification schema with event types (`info`, `success`, `warning`, `alert`), read tracking, and references to challenges, solutions, and projects. |
| **`ProjectUpdate`** | [`src/models/ProjectUpdate.js`](file:///d:/hackathon%20prac/sih/sih/backend/src/models/ProjectUpdate.js) | **[ADDED]** Progress log schema supporting status reports with multimedia attachments. |
| **`Milestone`** | [`src/models/Milestone.js`](file:///d:/hackathon%20prac/sih/sih/backend/src/models/Milestone.js) | **[ADDED]** Project deliverable milestone schema with due dates, completion dates, and status transitions (`pending`, `in_progress`, `completed`). |
| **`Support`** | [`src/models/Support.js`](file:///d:/hackathon%20prac/sih/sih/backend/src/models/Support.js) | **[ADDED]** Challenge upvoting model with compound unique index `[user, challenge]` to strictly prevent duplicate upvotes. |
| **`Message`** | [`src/models/Message.js`](file:///d:/hackathon%20prac/sih/sih/backend/src/models/Message.js) | **[ADDED]** Direct user-to-user REST messaging schema with unread tracking and conversation indexing. |

---

### 2. API Routes & Controllers (15 Route Modules Added)

| Module | Endpoints Added | Description |
| :--- | :--- | :--- |
| **Authentication** | `POST /api/auth/register`<br>`POST /api/auth/login`<br>`GET /api/auth/me`<br>`POST /api/auth/logout` | JWT user registration with role support, secure password login, profile retrieval, and session termination. |
| **Challenges** | `POST /api/challenges`<br>`GET /api/challenges`<br>`GET /api/challenges/:id`<br>`PUT /api/challenges/:id`<br>`DELETE /api/challenges/:id`<br>`POST /api/challenges/:id/support`<br>`POST /api/challenges/:id/join`<br>`GET /api/challenges/:id/comments`<br>`POST /api/challenges/:id/comments`<br>`GET /api/challenges/:id/solutions`<br>`POST /api/challenges/:id/solutions` | Problem reporting with multipart evidence upload, query filtering (category, district, urgency, status, search, pagination), upvoting, joining, and solutions. |
| **Solutions** | `POST /api/solutions`<br>`GET /api/solutions`<br>`GET /api/solutions/:id`<br>`PUT /api/solutions/:id`<br>`DELETE /api/solutions/:id` | Solution proposal submissions with document uploads and review status management. |
| **Projects** | `POST /api/projects`<br>`GET /api/projects`<br>`GET /api/projects/:id`<br>`PUT /api/projects/:id`<br>`DELETE /api/projects/:id`<br>`PATCH /api/projects/:id/progress`<br>`POST /api/projects/:projectId/milestones`<br>`GET /api/projects/:projectId/milestones`<br>`POST /api/projects/:projectId/updates`<br>`GET /api/projects/:projectId/updates` | Solution-to-project conversion, progress % tracking (0-100), milestone creation, and status logging. |
| **Milestones** | `PUT /api/milestones/:id`<br>`DELETE /api/milestones/:id` | Update milestone completion state and delete deliverables. |
| **Teams** | `POST /api/teams`<br>`GET /api/teams`<br>`GET /api/teams/:id`<br>`PUT /api/teams/:id`<br>`POST /api/teams/:id/members`<br>`DELETE /api/teams/:id/members/:userId`<br>`POST /api/teams/:id/invite` | Team creation, roster management, member removal, and email invitations. |
| **Universities** | `GET /api/universities`<br>`GET /api/universities/:id`<br>`POST /api/universities`<br>`PUT /api/universities/:id` | University directory management, specializations, and affiliated student teams. |
| **Industry Partners** | `GET /api/industry`<br>`GET /api/industry/:id`<br>`POST /api/industry`<br>`PUT /api/industry/:id` | Corporate partner directory, CSR mentorship, and sponsorship tracking. |
| **Comments** | `POST /api/comments`<br>`GET /api/comments/challenge/:challengeId`<br>`GET /api/comments/project/:projectId`<br>`DELETE /api/comments/:id` | Threaded discussions on challenges and projects. |
| **Notifications** | `GET /api/notifications`<br>`PATCH /api/notifications/:id/read`<br>`PATCH /api/notifications/read-all` | User notification feeds, unread badges, and read status updates. |
| **Dashboards** | `GET /api/dashboard/citizen`<br>`GET /api/dashboard/student`<br>`GET /api/dashboard/university`<br>`GET /api/dashboard/industry`<br>`GET /api/dashboard/government` | Role-specific KPI metrics and government chart data (`challengesByCategory`, `challengesByDistrict`, `monthlySubmissions`, `solutionSuccessRate`). |
| **Admin & Govt** | `GET /api/admin/challenges/pending`<br>`PATCH /api/admin/challenges/:id/verify`<br>`PATCH /api/admin/challenges/:id/reject`<br>`PATCH /api/admin/challenges/:id/request-info`<br>`PATCH /api/admin/solutions/:id/approve`<br>`PATCH /api/admin/solutions/:id/reject` | Verification queue, review workflows, reject with reason, request citizen info, and proposal approvals. |
| **Search** | `GET /api/search?q=...` | Global unified keyword search across 5 collections with regex matching. |
| **Messaging** | `POST /api/messages`<br>`GET /api/messages`<br>`GET /api/messages/:userId`<br>`PATCH /api/messages/:id/read` | Direct user-to-user REST messaging with conversation grouping. |
| **Upload** | `POST /api/upload` | Multi-format file upload handler returning static `/uploads/...` URLs. |

---

### 3. Middleware & Core Services Added

- **[`src/middleware/auth.js`](file:///d:/hackathon%20prac/sih/sih/backend/src/middleware/auth.js)**: `requireAuth` extracts Bearer JWT token, validates signature with `JWT_SECRET`, and attaches sanitized `req.user`.
- **[`src/middleware/role.js`](file:///d:/hackathon%20prac/sih/sih/backend/src/middleware/role.js)**: `requireRole(...roles)` ensures role-based authorization guard.
- **[`src/middleware/upload.js`](file:///d:/hackathon%20prac/sih/sih/backend/src/middleware/upload.js)**: Multer disk storage handler for images, PDFs, docs, PPTs, and videos with 50MB limits.
- **[`src/middleware/validate.js`](file:///d:/hackathon%20prac/sih/sih/backend/src/middleware/validate.js)**: Standardized validation error response formatter for `express-validator`.
- **[`src/middleware/errorHandler.js`](file:///d:/hackathon%20prac/sih/sih/backend/src/middleware/errorHandler.js)**: Centralized error handler managing MongoDB CastErrors, Duplicate Key (11000) errors, schema validation errors, JWT expiration, and Multer errors.
- **[`src/services/notificationService.js`](file:///d:/hackathon%20prac/sih/sih/backend/src/services/notificationService.js)**: Helper for automatically triggering notifications on workflow milestones.

---

### 4. Database Seeder & Mock Fixtures Added

- **[`src/utils/seedData.js`](file:///d:/hackathon%20prac/sih/sih/backend/src/utils/seedData.js)**:
  - **10 Users**: Spanning Citizen, Student, University, Industry, Government, and Admin roles (password: `password123`).
  - **10 Challenges**: Real problems in Palamu, Khunti, Dhanbad, Deoghar, Ranchi, West Singhbhum, Bokaro, Giridih, and Dumka.
  - **5 Universities**: BIT Mesra, NIT Jamshedpur, IIT ISM Dhanbad, Ranchi University, Kolhan University.
  - **5 Industry Partners**: Tata Steel, SAIL Bokaro, CCL Ranchi, JSPL Patratu, Tata Motors.
  - **5 Solutions & 5 Projects**: With milestones, progress logs, comments, and upvotes.
- **[`src/utils/seeder.js`](file:///d:/hackathon%20prac/sih/sih/backend/src/utils/seeder.js)**: CLI seeder script (`npm run seed` and `npm run seed:destroy`).

---

### 5. Documentation Added

- **[`README.md`](file:///d:/hackathon%20prac/sih/sih/backend/README.md)**: Comprehensive guide with setup instructions, demo credentials, complete 40+ endpoint reference table, and React + Vite integration examples using `fetch()`.
- **[`architecture.md`](file:///d:/hackathon%20prac/sih/sih/backend/architecture.md)**: Architectural diagrams, MVC pipeline, RBAC matrix, problem-to-solution state machine, and ER relationships.
- **[`structure.md`](file:///d:/hackathon%20prac/sih/sih/backend/structure.md)**: Full directory tree, component catalog, schema field definitions, and route-to-controller mapping.
- **[`changecatalog.md`](file:///d:/hackathon%20prac/sih/sih/backend/changecatalog.md)**: Complete catalog of all features, models, endpoints, and changes.
