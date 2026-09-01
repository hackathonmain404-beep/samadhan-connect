# 📁 Samadhan Connect — Backend Structure & Directory Catalog

> **Comprehensive Codebase Structure, Component Catalog & Interface Mappings**  
> Complete technical breakdown of every folder, file, module, export, schema field, and route mapping in the Samadhan Connect REST API backend.

---

## 📑 Table of Contents
1. [ASCII Directory Tree](#1-ascii-directory-tree)
2. [Module & Component Catalog](#2-module--component-catalog)
3. [Models & Schema Field Definitions](#3-models--schema-field-definitions)
4. [Controllers & Business Methods Catalog](#4-controllers--business-methods-catalog)
5. [Route-to-Controller Endpoint Mapping Table](#5-route-to-controller-endpoint-mapping-table)
6. [Middleware Pipeline Details](#6-middleware-pipeline-details)
7. [Utility & Database Seeder Catalog](#7-utility--database-seeder-catalog)

---

## 1. ASCII Directory Tree

```
backend/
├── src/
│   ├── config/
│   │   └── db.js                         # Database connection logic (Mongoose)
│   ├── controllers/
│   │   ├── adminController.js            # Admin / Government review and verification
│   │   ├── authController.js             # Authentication (register, login, me, logout)
│   │   ├── challengeController.js        # Societal problem reporting & lifecycle
│   │   ├── commentController.js          # Challenge & project discussions
│   │   ├── dashboardController.js        # Role-tailored dashboard metrics & charts
│   │   ├── industryController.js         # Industry partner directory & CSR management
│   │   ├── messageController.js          # Direct user-to-user REST messaging
│   │   ├── milestoneController.js        # Project milestone management
│   │   ├── notificationController.js     # User notification feeds & read tracking
│   │   ├── projectController.js          # Project tracking, progress & updates
│   │   ├── searchController.js           # Multi-collection keyword search
│   │   ├── solutionController.js         # Solution proposals & technical blueprints
│   │   ├── teamController.js             # Student innovator team rosters & invites
│   │   ├── universityController.js       # University directory & research profiles
│   │   └── uploadController.js           # Standalone file upload handler
│   ├── middleware/
│   │   ├── auth.js                       # JWT Bearer token authentication guard
│   │   ├── errorHandler.js               # Centralized error handler
│   │   ├── role.js                       # Role-Based Access Control (RBAC) guard
│   │   ├── upload.js                     # Multer disk storage & MIME validation
│   │   └── validate.js                   # express-validator response wrapper
│   ├── models/
│   │   ├── Challenge.js                  # Societal problem schema
│   │   ├── Comment.js                    # Comment schema
│   │   ├── IndustryPartner.js            # Industry partner schema
│   │   ├── Message.js                    # Direct message schema
│   │   ├── Milestone.js                  # Project milestone schema
│   │   ├── Notification.js               # Notification schema
│   │   ├── Project.js                    # Project schema
│   │   ├── ProjectUpdate.js              # Project progress update schema
│   │   ├── Solution.js                   # Solution proposal schema
│   │   ├── Support.js                    # Challenge upvote schema (compound unique)
│   │   ├── Team.js                       # Student innovator team schema
│   │   ├── University.js                 # University profile schema
│   │   └── User.js                       # User schema with bcrypt & role enums
│   ├── routes/
│   │   ├── adminRoutes.js                # /api/admin
│   │   ├── authRoutes.js                 # /api/auth
│   │   ├── challengeRoutes.js            # /api/challenges
│   │   ├── commentRoutes.js              # /api/comments
│   │   ├── dashboardRoutes.js            # /api/dashboard
│   │   ├── industryRoutes.js             # /api/industry
│   │   ├── messageRoutes.js              # /api/messages
│   │   ├── milestoneRoutes.js            # /api/milestones
│   │   ├── notificationRoutes.js         # /api/notifications
│   │   ├── projectRoutes.js              # /api/projects
│   │   ├── searchRoutes.js               # /api/search
│   │   ├── solutionRoutes.js             # /api/solutions
│   │   ├── teamRoutes.js                 # /api/teams
│   │   ├── universityRoutes.js           # /api/universities
│   │   └── uploadRoutes.js               # /api/upload
│   ├── services/
│   │   └── notificationService.js        # Event-driven notification helper
│   ├── utils/
│   │   ├── seedData.js                   # Realistic Jharkhand demo dataset
│   │   └── seeder.js                     # Database CLI runner script
│   └── app.js                            # Express app, CORS, routes & middlewares
├── uploads/                              # Uploaded images, docs, videos (.gitkeep)
├── .env                                  # Local environment configuration
├── .env.example                          # Environment template
├── .gitignore                            # Git ignored files & folders
├── architecture.md                       # Architectural specification & design diagrams
├── changecatalog.md                      # Release & change catalog
├── package.json                          # Package dependencies & scripts
├── README.md                             # Comprehensive project manual & API guide
├── server.js                             # Application entry point & server bootstrap
└── structure.md                          # Codebase structure & component catalog
```

---

## 2. Module & Component Catalog

### Root Level
- **`server.js`**: Application entry point. Loads `.env`, calls `connectDB()`, mounts the `app` instance from `src/app.js`, and binds to `PORT=5000`.
- **`package.json`**: Defines scripts (`start`, `dev`, `seed`, `seed:destroy`) and dependencies (`express`, `mongoose`, `jsonwebtoken`, `bcryptjs`, `cors`, `multer`, `express-validator`, `dotenv`, `morgan`).
- **`.env` / `.env.example`**: Environment configuration (`PORT`, `MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRE`, `CLIENT_URL`, `NODE_ENV`).
- **`uploads/`**: Local disk directory where user-uploaded media is stored.

### `src/config/`
- **`db.js`**: Connects to MongoDB via Mongoose. Handles connection events and logs host/database metadata.

### `src/services/`
- **`notificationService.js`**: Exports `createNotification({ user, title, message, type, relatedChallenge, relatedSolution, relatedProject })`. Dispatches in-app alerts safely without throwing fatal errors.

---

## 3. Models & Schema Field Definitions

| Model | File | Primary Fields | Indexes / Virtuals / Hooks |
| :--- | :--- | :--- | :--- |
| **`User`** | `src/models/User.js` | `name`, `email` (unique), `password` (select: false), `phone`, `role` (enum: citizen, student, university, industry, government, admin), `profileImage`, `location`, `bio`, `skills`, `university`, `organization`. | `pre('save')` for bcrypt hashing, `matchPassword()` method, `toJSON` password remover. |
| **`Challenge`** | `src/models/Challenge.js` | `title`, `shortDescription`, `description`, `category` (10 Jharkhand categories), `location`, `district`, `state`, `submittedBy` (ref User), `urgency` (low/med/high/critical), `status` (pending/under_review/verified/open/in_progress/resolved/rejected), `affectedPeople`, `duration`, `expectedOutcome`, `evidence` (array), `supportCount`, `teamCount`, `solutionCount`. | Text index on `title, shortDescription, description, location, district`. |
| **`Solution`** | `src/models/Solution.js` | `title`, `challenge` (ref Challenge), `description`, `team` (ref Team), `university`, `proposedTechnology` (array), `implementationPlan`, `expectedImpact`, `estimatedDuration`, `requiredResources`, `industrySupportRequired` (boolean), `documents` (array), `status`, `submittedBy` (ref User), `feedback`. | Text index on `title, description, proposedTechnology`. |
| **`Project`** | `src/models/Project.js` | `name`, `challenge` (ref Challenge), `solution` (ref Solution), `team` (ref Team), `university`, `industryMentor` (ref User), `governmentCoordinator` (ref User), `status` (research/prototype/testing/implementation/completed), `progress` (0-100), `description`, `startDate`, `expectedCompletionDate`. | Text index on `name, description`. |
| **`Team`** | `src/models/Team.js` | `name`, `leader` (ref User), `members` (array of ref User), `university`, `skills`, `currentChallenge` (ref Challenge), `projects` (array of ref Project). | Text index on `name, skills`. |
| **`University`** | `src/models/University.js` | `name` (unique), `location`, `district`, `description`, `specializations` (array), `website`, `logo`, `researchers`, `studentTeams`, `activeProjects`, `completedProjects`. | Text index on `name, district, specializations`. |
| **`IndustryPartner`** | `src/models/IndustryPartner.js` | `name` (unique), `industry`, `location`, `description`, `expertise` (array), `website`, `logo`, `projectsMentored`, `projectsSponsored`. | Text index on `name, industry, expertise`. |
| **`Comment`** | `src/models/Comment.js` | `author` (ref User), `challenge` (ref Challenge), `project` (ref Project), `text`. | Timestamps index. |
| **`Notification`** | `src/models/Notification.js` | `user` (ref User), `title`, `message`, `type` (info/success/warning/alert), `read` (boolean), `relatedChallenge`, `relatedSolution`, `relatedProject`. | Filtered by `user` and `createdAt`. |
| **`ProjectUpdate`** | `src/models/ProjectUpdate.js` | `project` (ref Project), `author` (ref User), `title`, `description`, `attachments` (array of `{ url, fileType, originalName }`). | Filtered by `project` and `createdAt`. |
| **`Milestone`** | `src/models/Milestone.js` | `project` (ref Project), `title`, `description`, `status` (pending/in_progress/completed), `dueDate`, `completedAt`. | Filtered by `project` and `dueDate`. |
| **`Support`** | `src/models/Support.js` | `user` (ref User), `challenge` (ref Challenge). | Compound unique index `{ user: 1, challenge: 1 }` (prevents double upvoting). |
| **`Message`** | `src/models/Message.js` | `sender` (ref User), `receiver` (ref User), `message`, `read` (boolean). | Compound index `{ sender: 1, receiver: 1, createdAt: -1 }`. |

---

## 4. Controllers & Business Methods Catalog

| Controller File | Exported Methods | Responsibility |
| :--- | :--- | :--- |
| **`authController.js`** | `register`, `login`, `getMe`, `logout` | Manages user registration with role validation, JWT token creation, and profile retrieval. |
| **`challengeController.js`** | `createChallenge`, `getChallenges`, `getChallengeById`, `updateChallenge`, `deleteChallenge`, `supportChallenge`, `joinChallenge`, `getChallengeComments`, `addChallengeComment`, `getChallengeSolutions`, `addChallengeSolution` | Handles problem submission with multipart evidence, category/district querying, upvoting, joining, and solution attachments. |
| **`solutionController.js`** | `createSolution`, `getSolutions`, `getSolutionById`, `updateSolution`, `deleteSolution` | Handles technical solution proposals, document uploads, and challenge relationship tracking. |
| **`projectController.js`** | `createProject`, `getProjects`, `getProjectById`, `updateProject`, `deleteProject`, `updateProgress`, `addProjectMilestone`, `getProjectMilestones`, `addProjectUpdate`, `getProjectUpdates` | Converts solutions to active projects, tracks percentage progress (0-100), milestones, and progress updates. |
| **`milestoneController.js`** | `updateMilestone`, `deleteMilestone` | Manages individual milestone states and completion dates. |
| **`teamController.js`** | `createTeam`, `getTeams`, `getTeamById`, `updateTeam`, `addTeamMember`, `removeTeamMember`, `inviteMember` | Manages student innovator teams, member additions, removals, and email invites. |
| **`universityController.js`** | `getUniversities`, `getUniversityById`, `createUniversity`, `updateUniversity` | Handles university directories, research stats, and affiliated student teams. |
| **`industryController.js`** | `getIndustry`, `getIndustryById`, `createIndustry`, `updateIndustry` | Handles corporate partners, CSR mentorship, and sponsorship tracking. |
| **`commentController.js`** | `createComment`, `getChallengeComments`, `getProjectComments`, `deleteComment` | Manages user discussions on challenges and projects. |
| **`notificationController.js`**| `getNotifications`, `markAsRead`, `markAllAsRead` | Manages user notifications, unread badges, and read status updates. |
| **`dashboardController.js`** | `getCitizenDashboard`, `getStudentDashboard`, `getUniversityDashboard`, `getIndustryDashboard`, `getGovernmentDashboard` | Aggregates role-specific KPIs and government chart data (`challengesByCategory`, `challengesByDistrict`, `monthlySubmissions`, `solutionSuccessRate`). |
| **`adminController.js`** | `getPendingChallenges`, `verifyChallenge`, `rejectChallenge`, `requestChallengeInfo`, `approveSolution`, `rejectSolution` | Provides administrative workflows for verifying challenges, rejecting with reasons, requesting citizen info, and approving solution proposals. |
| **`searchController.js`** | `globalSearch` | Executes cross-collection regex search across Challenges, Solutions, Projects, Universities, and Industry. |
| **`messageController.js`** | `sendMessage`, `getConversations`, `getChatHistory`, `markMessageAsRead` | REST-based 1-on-1 messaging between platform users. |
| **`uploadController.js`** | `uploadFile` | Handles single or multiple file uploads via Multer and returns accessible `/uploads/...` URLs. |

---

## 5. Route-to-Controller Endpoint Mapping Table

| HTTP Method | API Path | Controller Method | Middleware Stack |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | `authController.register` | `registerValidation`, `validate` |
| **POST** | `/api/auth/login` | `authController.login` | `loginValidation`, `validate` |
| **GET** | `/api/auth/me` | `authController.getMe` | `requireAuth` |
| **POST** | `/api/auth/logout` | `authController.logout` | `requireAuth` |
| **GET** | `/api/challenges` | `challengeController.getChallenges` | *None (Public)* |
| **POST** | `/api/challenges` | `challengeController.createChallenge` | `requireAuth`, `upload.array('evidence')`, `challengeValidation`, `validate` |
| **GET** | `/api/challenges/:id` | `challengeController.getChallengeById` | *None (Public)* |
| **PUT** | `/api/challenges/:id` | `challengeController.updateChallenge` | `requireAuth`, `upload.array('evidence')` |
| **DELETE**| `/api/challenges/:id` | `challengeController.deleteChallenge` | `requireAuth` |
| **POST** | `/api/challenges/:id/support`| `challengeController.supportChallenge` | `requireAuth` |
| **POST** | `/api/challenges/:id/join` | `challengeController.joinChallenge` | `requireAuth` |
| **GET** | `/api/challenges/:id/comments` | `challengeController.getChallengeComments` | *None (Public)* |
| **POST** | `/api/challenges/:id/comments` | `challengeController.addChallengeComment` | `requireAuth` |
| **GET** | `/api/challenges/:id/solutions` | `challengeController.getChallengeSolutions` | *None (Public)* |
| **POST** | `/api/challenges/:id/solutions` | `challengeController.addChallengeSolution` | `requireAuth`, `upload.array('documents')` |
| **GET** | `/api/solutions` | `solutionController.getSolutions` | *None (Public)* |
| **POST** | `/api/solutions` | `solutionController.createSolution` | `requireAuth`, `upload.array('documents')`, `solutionValidation`, `validate` |
| **GET** | `/api/solutions/:id` | `solutionController.getSolutionById` | *None (Public)* |
| **PUT** | `/api/solutions/:id` | `solutionController.updateSolution` | `requireAuth`, `upload.array('documents')` |
| **DELETE**| `/api/solutions/:id` | `solutionController.deleteSolution` | `requireAuth` |
| **GET** | `/api/projects` | `projectController.getProjects` | *None (Public)* |
| **POST** | `/api/projects` | `projectController.createProject` | `requireAuth`, `projectValidation`, `validate` |
| **GET** | `/api/projects/:id` | `projectController.getProjectById` | *None (Public)* |
| **PUT** | `/api/projects/:id` | `projectController.updateProject` | `requireAuth` |
| **DELETE**| `/api/projects/:id` | `projectController.deleteProject` | `requireAuth` |
| **PATCH** | `/api/projects/:id/progress` | `projectController.updateProgress` | `requireAuth` |
| **GET** | `/api/projects/:projectId/milestones` | `projectController.getProjectMilestones` | *None (Public)* |
| **POST** | `/api/projects/:projectId/milestones` | `projectController.addProjectMilestone` | `requireAuth` |
| **GET** | `/api/projects/:projectId/updates` | `projectController.getProjectUpdates` | *None (Public)* |
| **POST** | `/api/projects/:projectId/updates` | `projectController.addProjectUpdate` | `requireAuth`, `upload.array('attachments')` |
| **PUT** | `/api/milestones/:id` | `milestoneController.updateMilestone` | `requireAuth` |
| **DELETE**| `/api/milestones/:id` | `milestoneController.deleteMilestone` | `requireAuth` |
| **GET** | `/api/teams` | `teamController.getTeams` | *None (Public)* |
| **POST** | `/api/teams` | `teamController.createTeam` | `requireAuth`, `teamValidation`, `validate` |
| **GET** | `/api/teams/:id` | `teamController.getTeamById` | *None (Public)* |
| **PUT** | `/api/teams/:id` | `teamController.updateTeam` | `requireAuth` |
| **POST** | `/api/teams/:id/members` | `teamController.addTeamMember` | `requireAuth` |
| **DELETE**| `/api/teams/:id/members/:userId`| `teamController.removeTeamMember` | `requireAuth` |
| **POST** | `/api/teams/:id/invite` | `teamController.inviteMember` | `requireAuth` |
| **GET** | `/api/universities` | `universityController.getUniversities` | *None (Public)* |
| **GET** | `/api/universities/:id` | `universityController.getUniversityById` | *None (Public)* |
| **POST** | `/api/universities` | `universityController.createUniversity` | `requireAuth`, `requireRole('admin', 'university')`, `universityValidation`, `validate` |
| **PUT** | `/api/universities/:id` | `universityController.updateUniversity` | `requireAuth`, `requireRole('admin', 'university')` |
| **GET** | `/api/industry` | `industryController.getIndustry` | *None (Public)* |
| **GET** | `/api/industry/:id` | `industryController.getIndustryById` | *None (Public)* |
| **POST** | `/api/industry` | `industryController.createIndustry` | `requireAuth`, `requireRole('admin', 'industry')`, `industryValidation`, `validate` |
| **PUT** | `/api/industry/:id` | `industryController.updateIndustry` | `requireAuth`, `requireRole('admin', 'industry')` |
| **POST** | `/api/comments` | `commentController.createComment` | `requireAuth`, `validate` |
| **GET** | `/api/comments/challenge/:challengeId` | `commentController.getChallengeComments` | *None (Public)* |
| **GET** | `/api/comments/project/:projectId` | `commentController.getProjectComments` | *None (Public)* |
| **DELETE**| `/api/comments/:id` | `commentController.deleteComment` | `requireAuth` |
| **GET** | `/api/notifications` | `notificationController.getNotifications` | `requireAuth` |
| **PATCH** | `/api/notifications/:id/read` | `notificationController.markAsRead` | `requireAuth` |
| **PATCH** | `/api/notifications/read-all` | `notificationController.markAllAsRead` | `requireAuth` |
| **GET** | `/api/dashboard/citizen` | `dashboardController.getCitizenDashboard` | `requireAuth` |
| **GET** | `/api/dashboard/student` | `dashboardController.getStudentDashboard` | `requireAuth` |
| **GET** | `/api/dashboard/university` | `dashboardController.getUniversityDashboard` | `requireAuth` |
| **GET** | `/api/dashboard/industry` | `dashboardController.getIndustryDashboard` | `requireAuth` |
| **GET** | `/api/dashboard/government` | `dashboardController.getGovernmentDashboard` | `requireAuth`, `requireRole('government', 'admin')` |
| **GET** | `/api/admin/challenges/pending`| `adminController.getPendingChallenges` | `requireAuth`, `requireRole('government', 'admin')` |
| **PATCH** | `/api/admin/challenges/:id/verify`| `adminController.verifyChallenge` | `requireAuth`, `requireRole('government', 'admin')` |
| **PATCH** | `/api/admin/challenges/:id/reject`| `adminController.rejectChallenge` | `requireAuth`, `requireRole('government', 'admin')` |
| **PATCH** | `/api/admin/challenges/:id/request-info`| `adminController.requestChallengeInfo`| `requireAuth`, `requireRole('government', 'admin')` |
| **PATCH** | `/api/admin/solutions/:id/approve`| `adminController.approveSolution` | `requireAuth`, `requireRole('government', 'admin')` |
| **PATCH** | `/api/admin/solutions/:id/reject` | `adminController.rejectSolution` | `requireAuth`, `requireRole('government', 'admin')` |
| **GET** | `/api/search` | `searchController.globalSearch` | *None (Public)* |
| **POST** | `/api/messages` | `messageController.sendMessage` | `requireAuth`, `validate` |
| **GET** | `/api/messages` | `messageController.getConversations` | `requireAuth` |
| **GET** | `/api/messages/:userId` | `messageController.getChatHistory` | `requireAuth` |
| **PATCH** | `/api/messages/:id/read` | `messageController.markMessageAsRead` | `requireAuth` |
| **POST** | `/api/upload` | `uploadController.uploadFile` | *None (Multer Dynamic Handler)* |

---

## 6. Middleware Pipeline Details

### 1. `auth.js` (`requireAuth`)
- Extracts Bearer token from `Authorization` header.
- Decodes token using `process.env.JWT_SECRET`.
- Queries MongoDB for user document (`User.findById(decoded.id).select('-password')`).
- Binds user object to `req.user`.

### 2. `role.js` (`requireRole(...roles)`)
- Inspects `req.user.role`.
- Verifies membership against authorized roles array.
- Returns `403 Forbidden` if role is unauthorized.

### 3. `upload.js` (`Multer Configuration`)
- Destination: `backend/uploads/`
- Unique naming: `${sanitizedBaseName}-${timestamp}-${random}.${ext}`
- Allowed file types: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.svg`, `.pdf`, `.doc`, `.docx`, `.txt`, `.rtf`, `.ppt`, `.pptx`, `.xls`, `.xlsx`, `.csv`, `.mp4`, `.mkv`, `.mov`, `.avi`, `.webm`
- Size limit: 50MB per file.

### 4. `validate.js` (`validate`)
- Gathers errors from `express-validator` validation chain.
- Returns `400 Bad Request` with structured array `[{ field: '...', message: '...' }]` if validation fails.

### 5. `errorHandler.js` (`errorHandler`)
- Intercepts uncaught errors across controllers.
- Formats MongoDB CastErrors, Duplicate Key (11000) errors, Schema ValidationErrors, JWT errors, and Multer errors.

---

## 7. Utility & Database Seeder Catalog

- **`src/utils/seedData.js`**: Contains realistic Jharkhand datasets:
  - 10 Users across 6 roles (Citizen, Student, University, Industry, Government, Admin)
  - 5 Premier Jharkhand Universities (BIT Mesra, NIT Jamshedpur, IIT ISM Dhanbad, Ranchi University, Kolhan University)
  - 5 Major Jharkhand Industry Partners (Tata Steel, SAIL Bokaro, CCL Ranchi, JSPL Patratu, Tata Motors)
  - 10 Challenges across 10 Jharkhand districts (Palamu, Khunti, Dhanbad, Deoghar, Ranchi, West Singhbhum, Bokaro, Giridih, Dumka)
- **`src/utils/seeder.js`**:
  - `npm run seed`: Clears existing database and populates users, universities, industry partners, challenges, student teams, solution blueprints, active projects, milestones, progress updates, comments, notifications, supports, and direct messages.
  - `npm run seed:destroy`: Drops the database cleanly.
