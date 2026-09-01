# 🚀 Samadhan Connect — Backend REST API

> **Digital Innovation Platform for Jharkhand Societal Problem-Solving**  
> Connecting Citizens, Students, Universities, Industry Partners, and Government Officials to identify, propose, and deploy real-world solutions across Jharkhand.

---

## 📌 Table of Contents
1. [Project Overview](#-project-overview)
2. [Tech Stack](#-tech-stack)
3. [Architecture & Folder Structure](#-architecture--folder-structure)
4. [Getting Started & Installation](#-getting-started--installation)
5. [Environment Variables](#-environment-variables)
6. [Database Seeder & Demo Accounts](#-database-seeder--demo-accounts)
7. [Database Models (13 Collections)](#-database-models)
8. [Role-Based Access Control (RBAC)](#-role-based-access-control-rbac)
9. [Complete API Endpoints Reference](#-complete-api-endpoints-reference)
10. [File Upload Guide](#-file-upload-guide)
11. [Frontend (React + Vite) Integration Guide](#-frontend-react--vite-integration-guide)
12. [Error Handling & API Responses](#-error-handling--api-responses)

---

## 🌟 Project Overview
**Samadhan Connect** is a collaborative ecosystem designed to bridge grassroots societal problems in Jharkhand with academic and industrial innovation capacity.

- **Citizens**: Report localized problems with geo-tagging and multimedia evidence (e.g. water fluoride in Palamu, flash waterlogging in Ranchi, tribal forest produce storage in Khunti).
- **Students & Innovators**: Form multidisciplinary teams and submit engineering/policy solution proposals.
- **Universities** (BIT Mesra, NIT Jamshedpur, IIT ISM Dhanbad, etc.): Provide faculty mentorship and lab prototyping facilities.
- **Industry Partners** (Tata Steel, SAIL, CCL, JSPL, Tata Motors): Sponsor hardware prototypes, pilot deployments, and CSR grants.
- **Government Officials**: Verify citizen challenges, evaluate proposals, track active project milestones, and monitor district-level analytics.

---

## 🛠 Tech Stack
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js (v4)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) & bcryptjs password hashing
- **File Uploads**: Multer (multi-format support: images, PDFs, docs, PPTs, videos)
- **Validation**: express-validator
- **Security & Utilities**: CORS, dotenv, morgan logger

---

## 📁 Architecture & Folder Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB Mongoose connection
│   ├── controllers/
│   │   ├── authController.js     # Register, login, me, logout
│   │   ├── challengeController.js# CRUD, search, filter, upvote, join, comments
│   │   ├── solutionController.js # Proposal submission & lifecycle
│   │   ├── projectController.js  # Project conversion, milestones, updates
│   │   ├── milestoneController.js# Project milestone updates & deletion
│   │   ├── teamController.js     # Team formation, member invites, roster
│   │   ├── universityController.js# University directory & research stats
│   │   ├── industryController.js # Industry partner directory & CSR mentorship
│   │   ├── commentController.js  # Discussion on challenges and projects
│   │   ├── notificationController.js # User notifications & unread tracker
│   │   ├── dashboardController.js# Role-tailored dashboards & analytics
│   │   ├── adminController.js    # Challenge & solution government review workflows
│   │   ├── searchController.js   # Unified search across 5 collections
│   │   ├── messageController.js  # User-to-user direct REST messaging
│   │   └── uploadController.js   # Multer file upload handler
│   ├── middleware/
│   │   ├── auth.js               # JWT verification (requireAuth)
│   │   ├── role.js               # Role-based authorization (requireRole)
│   │   ├── upload.js             # Multer storage engine & file filter
│   │   ├── validate.js           # express-validator response wrapper
│   │   └── errorHandler.js       # Centralized error handler
│   ├── models/
│   │   ├── User.js               # User accounts with bcrypt hashing
│   │   ├── Challenge.js          # Societal problem reports
│   │   ├── Solution.js           # Student & innovator proposals
│   │   ├── Project.js            # Approved implementation projects
│   │   ├── Team.js               # Student innovator teams
│   │   ├── University.js         # University profiles
│   │   ├── IndustryPartner.js    # Industry partner directory
│   │   ├── Comment.js            # Comments & discussions
│   │   ├── Notification.js       # Notifications with related document refs
│   │   ├── ProjectUpdate.js      # Project progress logs with attachments
│   │   ├── Milestone.js          # Project deliverables & deadlines
│   │   ├── Support.js            # Unique challenge upvotes
│   │   └── Message.js            # Direct messaging between users
│   ├── routes/
│   │   ├── authRoutes.js         # /api/auth
│   │   ├── challengeRoutes.js    # /api/challenges
│   │   ├── solutionRoutes.js     # /api/solutions
│   │   ├── projectRoutes.js      # /api/projects
│   │   ├── milestoneRoutes.js    # /api/milestones
│   │   ├── teamRoutes.js         # /api/teams
│   │   ├── universityRoutes.js   # /api/universities
│   │   ├── industryRoutes.js     # /api/industry
│   │   ├── commentRoutes.js      # /api/comments
│   │   ├── notificationRoutes.js # /api/notifications
│   │   ├── dashboardRoutes.js    # /api/dashboard
│   │   ├── adminRoutes.js        # /api/admin
│   │   ├── searchRoutes.js       # /api/search
│   │   ├── messageRoutes.js      # /api/messages
│   │   └── uploadRoutes.js       # /api/upload
│   ├── services/
│   │   └── notificationService.js# Automated notification dispatcher
│   ├── utils/
│   │   ├── seedData.js           # Rich Jharkhand mock dataset
│   │   └── seeder.js             # Database seeding script
│   └── app.js                    # Express app initialization & route binding
├── uploads/                      # Uploaded images, docs, videos
├── .env                          # Local environment config
├── .env.example                  # Environment template
├── server.js                     # Main application entry point
├── package.json                  # Dependencies & npm scripts
└── README.md                     # Documentation
```

---

## ⚡ Getting Started & Installation

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or later)
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally, or a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cloud URI.

### 2. Clone & Navigate to Backend
```bash
cd backend
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Copy `.env.example` to `.env` and configure your settings:
```bash
cp .env.example .env
```

### 5. Seed the Database with Jharkhand Demo Data
```bash
npm run seed
```

### 6. Run Development Server
```bash
npm run dev
```
Backend will start on: `http://localhost:5000`

---

## ⚙️ Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/samadhan_connect
JWT_SECRET=samadhan_connect_jwt_super_secret_key_jharkhand_2026_sih
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

---

## 🔑 Database Seeder & Demo Accounts

Running `npm run seed` creates:
- **10 Users** spanning all 6 roles
- **10 Realistic Jharkhand Challenges** across Palamu, Khunti, Dhanbad, Deoghar, Ranchi, West Singhbhum, Bokaro, Giridih, Dumka
- **5 Universities** (BIT Mesra, NIT Jamshedpur, IIT ISM Dhanbad, Ranchi University, Kolhan University)
- **5 Industry Partners** (Tata Steel, SAIL Bokaro, CCL Ranchi, JSPL Patratu, Tata Motors)
- **5 Solution Proposals** with tech blueprints
- **5 Active Projects** with milestones, progress updates, and comments

### 📋 Demo Logins (Password for all: `password123`)

| Role | Email | Password | Representative Entity |
| :--- | :--- | :--- | :--- |
| **Citizen** | `citizen@example.com` | `password123` | Ramesh Mahto (Ranchi Citizens Welfare) |
| **Student** | `student@example.com` | `password123` | Rahul Kumar (BIT Mesra CSE / IoT) |
| **University** | `university@example.com` | `password123` | Prof. Amit Verma (BIT Mesra Dean Research) |
| **Industry** | `industry@example.com` | `password123` | Rajesh Agarwal (Tata Steel CSR Head) |
| **Government** | `government@example.com` | `password123` | Anil Kumar Jha (Dept of Urban Development, GoJ) |
| **Admin** | `admin@example.com` | `password123` | Master Admin (Jharkhand Innovation Council) |

---

## 🗄 Database Models

### 1. `User`
- `_id`, `name`, `email`, `password` (hashed, excluded in JSON queries), `phone`, `role` (`citizen` | `student` | `university` | `industry` | `government` | `admin`), `profileImage`, `location`, `bio`, `skills` (array), `university`, `organization`, timestamps.

### 2. `Challenge`
- `title`, `shortDescription`, `description`, `category` (10 categories: Education, Healthcare, Agriculture, Water Management, Sanitation, Environment, Rural Livelihood, Accessibility, Urban Infrastructure, Public Services), `location`, `district`, `state` (default 'Jharkhand'), `submittedBy` (ref User), `urgency` (`low` | `medium` | `high` | `critical`), `status` (`pending` | `under_review` | `verified` | `open` | `in_progress` | `resolved` | `rejected`), `affectedPeople`, `duration`, `expectedOutcome`, `evidence` (array of `{ url, fileType, originalName }`), `supportCount`, `teamCount`, `solutionCount`, timestamps.

### 3. `Solution`
- `title`, `challenge` (ref Challenge), `description`, `team` (ref Team), `university`, `proposedTechnology` (array), `implementationPlan`, `expectedImpact`, `estimatedDuration`, `requiredResources`, `industrySupportRequired` (boolean), `documents` (array), `status` (`submitted` | `under_review` | `shortlisted` | `approved` | `rejected` | `completed`), `submittedBy` (ref User), `feedback`, timestamps.

### 4. `Project`
- `name`, `challenge` (ref Challenge), `solution` (ref Solution), `team` (ref Team), `university`, `industryMentor` (ref User), `governmentCoordinator` (ref User), `status` (`research` | `prototype` | `testing` | `implementation` | `completed`), `progress` (0-100), `description`, `startDate`, `expectedCompletionDate`, timestamps.

### 5. `Team`
- `name`, `leader` (ref User), `members` (array of ref User), `university`, `skills` (array), `currentChallenge` (ref Challenge), `projects` (array of ref Project), timestamps.

### 6. `University`
- `name`, `location`, `district`, `description`, `specializations` (array), `website`, `logo`, `researchers` (count), `studentTeams` (count), `activeProjects` (count), `completedProjects` (count), timestamps.

### 7. `IndustryPartner`
- `name`, `industry`, `location`, `description`, `expertise` (array), `website`, `logo`, `projectsMentored` (count), `projectsSponsored` (count), timestamps.

### 8. `Comment`
- `author` (ref User), `challenge` (ref Challenge, optional), `project` (ref Project, optional), `text`, timestamps.

### 9. `Notification`
- `user` (ref User), `title`, `message`, `type` (`info` | `success` | `warning` | `alert`), `read` (boolean), `relatedChallenge`, `relatedSolution`, `relatedProject`, timestamps.

### 10. `ProjectUpdate`
- `project` (ref Project), `author` (ref User), `title`, `description`, `attachments` (array), timestamps.

### 11. `Milestone`
- `project` (ref Project), `title`, `description`, `status` (`pending` | `in_progress` | `completed`), `dueDate`, `completedAt`, timestamps.

### 12. `Support`
- `user` (ref User), `challenge` (ref Challenge), compound unique index `[user, challenge]` to prevent duplicate upvoting.

### 13. `Message`
- `sender` (ref User), `receiver` (ref User), `message`, `read` (boolean), timestamps.

---

## 🔒 Role-Based Access Control (RBAC)

| Resource / Action | Citizen | Student | University | Industry | Government | Admin |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| Register / Login / View Public Data | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Report a Problem (Create Challenge) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Support / Upvote a Challenge | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Submit Solution Proposal | ❌ | ✅ | ✅ | ❌ | ❌ | ✅ |
| Form / Manage Team | ❌ | ✅ | ✅ | ❌ | ❌ | ✅ |
| Post Project Progress Updates | ❌ | ✅ (Members) | ✅ | ✅ (Mentor) | ✅ | ✅ |
| Verify / Reject Challenges | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| Approve / Reject Solution Proposals | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| View Government Analytics Charts | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |

---

## 📡 Complete API Endpoints Reference

### 1. Authentication (`/api/auth`)
| Method | Endpoint | Auth | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/api/auth/register` | Public | Register new user with role |
| `POST` | `/api/auth/login` | Public | Login with email and password |
| `GET` | `/api/auth/me` | `requireAuth` | Get current user profile |
| `POST` | `/api/auth/logout` | `requireAuth` | Logout user |

### 2. Challenges (`/api/challenges`)
| Method | Endpoint | Auth | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/api/challenges` | `requireAuth` | Report/submit a challenge (supports multipart evidence) |
| `GET` | `/api/challenges` | Public | Get all challenges (filters: `category`, `district`, `urgency`, `status`, `search`, `page`, `limit`, `sort`) |
| `GET` | `/api/challenges/:id` | Public | Get challenge details with solutions & comments |
| `PUT` | `/api/challenges/:id` | `requireAuth` | Update challenge (owner or admin/government) |
| `DELETE` | `/api/challenges/:id` | `requireAuth` | Delete challenge (owner or admin) |
| `POST` | `/api/challenges/:id/support` | `requireAuth` | Upvote / toggle support for challenge |
| `POST` | `/api/challenges/:id/join` | `requireAuth` | Express interest to solve challenge (increments teamCount) |
| `GET` | `/api/challenges/:id/comments` | Public | Get comments on a challenge |
| `POST` | `/api/challenges/:id/comments` | `requireAuth` | Post a comment on a challenge |
| `GET` | `/api/challenges/:id/solutions` | Public | Get solutions submitted for this challenge |
| `POST` | `/api/challenges/:id/solutions` | `requireAuth` | Submit solution directly to this challenge |

### 3. Solutions (`/api/solutions`)
| Method | Endpoint | Auth | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/api/solutions` | `requireAuth` | Submit a solution proposal (with documents) |
| `GET` | `/api/solutions` | Public | List all solutions (filters: `challenge`, `status`, `submittedBy`, `university`) |
| `GET` | `/api/solutions/:id` | Public | Get solution details |
| `PUT` | `/api/solutions/:id` | `requireAuth` | Update solution proposal |
| `DELETE` | `/api/solutions/:id` | `requireAuth` | Delete solution proposal |

### 4. Projects (`/api/projects`)
| Method | Endpoint | Auth | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/api/projects` | `requireAuth` | Convert approved solution to active project |
| `GET` | `/api/projects` | Public | List all projects (filters: `status`, `university`, `team`) |
| `GET` | `/api/projects/:id` | Public | Get project details, milestones & timeline updates |
| `PUT` | `/api/projects/:id` | `requireAuth` | Update project details |
| `DELETE` | `/api/projects/:id` | `Admin` | Delete project |
| `PATCH` | `/api/projects/:id/progress` | `requireAuth` | Update project progress % (0-100) and status |
| `POST` | `/api/projects/:projectId/milestones` | `requireAuth` | Add a milestone to a project |
| `GET` | `/api/projects/:projectId/milestones` | Public | Get milestones for a project |
| `POST` | `/api/projects/:projectId/updates` | `requireAuth` | Post a progress update (with image/doc attachments) |
| `GET` | `/api/projects/:projectId/updates` | Public | Get all updates for a project |

### 5. Milestones (`/api/milestones`)
| Method | Endpoint | Auth | Description |
| :--- | :--- | :---: | :--- |
| `PUT` | `/api/milestones/:id` | `requireAuth` | Update milestone status (`pending`, `in_progress`, `completed`) |
| `DELETE` | `/api/milestones/:id` | `requireAuth` | Delete a milestone |

### 6. Teams (`/api/teams`)
| Method | Endpoint | Auth | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/api/teams` | `requireAuth` | Create student innovator team |
| `GET` | `/api/teams` | Public | List teams |
| `GET` | `/api/teams/:id` | Public | Get team details & roster |
| `PUT` | `/api/teams/:id` | `requireAuth` | Update team details |
| `POST` | `/api/teams/:id/members` | `requireAuth` | Add member by user ID |
| `DELETE` | `/api/teams/:id/members/:userId` | `requireAuth` | Remove member |
| `POST` | `/api/teams/:id/invite` | `requireAuth` | Invite user by email |

### 7. Universities (`/api/universities`)
| Method | Endpoint | Auth | Description |
| :--- | :--- | :---: | :--- |
| `GET` | `/api/universities` | Public | List Jharkhand universities |
| `GET` | `/api/universities/:id` | Public | Get university profile & affiliated projects |
| `POST` | `/api/universities` | `requireRole('admin','university')` | Add new university profile |
| `PUT` | `/api/universities/:id` | `requireRole('admin','university')` | Update university profile |

### 8. Industry Partners (`/api/industry`)
| Method | Endpoint | Auth | Description |
| :--- | :--- | :---: | :--- |
| `GET` | `/api/industry` | Public | List industry partners |
| `GET` | `/api/industry/:id` | Public | Get industry partner details |
| `POST` | `/api/industry` | `requireRole('admin','industry')` | Register industry partner |
| `PUT` | `/api/industry/:id` | `requireRole('admin','industry')` | Update industry partner |

### 9. Comments (`/api/comments`)
| Method | Endpoint | Auth | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/api/comments` | `requireAuth` | Create comment on challenge or project |
| `GET` | `/api/comments/challenge/:challengeId` | Public | Get comments for challenge |
| `GET` | `/api/comments/project/:projectId` | Public | Get comments for project |
| `DELETE` | `/api/comments/:id` | `requireAuth` | Delete comment |

### 10. Notifications (`/api/notifications`)
| Method | Endpoint | Auth | Description |
| :--- | :--- | :---: | :--- |
| `GET` | `/api/notifications` | `requireAuth` | Get user notifications & unread count |
| `PATCH` | `/api/notifications/:id/read` | `requireAuth` | Mark notification as read |
| `PATCH` | `/api/notifications/read-all` | `requireAuth` | Mark all notifications as read |

### 11. Role Dashboards (`/api/dashboard`)
| Method | Endpoint | Auth | Description |
| :--- | :--- | :---: | :--- |
| `GET` | `/api/dashboard/citizen` | `requireAuth` | Citizen problem submission statistics |
| `GET` | `/api/dashboard/student` | `requireAuth` | Student proposals, active projects & recommended challenges |
| `GET` | `/api/dashboard/university` | `requireAuth` | University teams, active projects & research outcomes |
| `GET` | `/api/dashboard/industry` | `requireAuth` | Industry CSR mentorship & supported solutions |
| `GET` | `/api/dashboard/government` | `Govt / Admin` | State-wide analytics & charts (`challengesByCategory`, `challengesByDistrict`, `monthlySubmissions`, `solutionSuccessRate`) |

### 12. Admin & Government Workflows (`/api/admin`)
| Method | Endpoint | Auth | Description |
| :--- | :--- | :---: | :--- |
| `GET` | `/api/admin/challenges/pending` | `Govt / Admin` | Get all pending challenges for review |
| `PATCH` | `/api/admin/challenges/:id/verify` | `Govt / Admin` | Verify challenge & open for solutions |
| `PATCH` | `/api/admin/challenges/:id/reject` | `Govt / Admin` | Reject challenge with reason |
| `PATCH` | `/api/admin/challenges/:id/request-info` | `Govt / Admin` | Request additional information from citizen |
| `PATCH` | `/api/admin/solutions/:id/approve` | `Govt / Admin` | Approve solution proposal for implementation |
| `PATCH` | `/api/admin/solutions/:id/reject` | `Govt / Admin` | Reject solution proposal |

### 13. Global Search (`/api/search`)
| Method | Endpoint | Auth | Description |
| :--- | :--- | :---: | :--- |
| `GET` | `/api/search?q=water` | Public | Search across Challenges, Solutions, Projects, Universities, and Industry |

### 14. Messaging (`/api/messages`)
| Method | Endpoint | Auth | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/api/messages` | `requireAuth` | Send direct message to another user |
| `GET` | `/api/messages` | `requireAuth` | Get recent conversation list |
| `GET` | `/api/messages/:userId` | `requireAuth` | Get chat history with a specific user |
| `PATCH` | `/api/messages/:id/read` | `requireAuth` | Mark message as read |

### 15. File Upload (`/api/upload`)
| Method | Endpoint | Auth | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/api/upload` | Public | Upload single (`file`) or multiple (`files`) images, PDFs, docs, PPTs, or videos |

---

## 📎 File Upload Guide

Uploads are handled using Multer and saved locally to the `/uploads` directory.

### Supported File Types:
- **Images**: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.svg`
- **Documents**: `.pdf`, `.doc`, `.docx`, `.txt`, `.rtf`
- **Presentations & Data**: `.ppt`, `.pptx`, `.xls`, `.xlsx`, `.csv`
- **Videos**: `.mp4`, `.mkv`, `.mov`, `.avi`, `.webm`

### Static File Access:
Uploaded files are publicly accessible at:
`http://localhost:5000/uploads/<filename>`

---

## 💻 Frontend (React + Vite) Integration Guide

In your React + Vite project root, configure your `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

### 1. API Helper Utility (`src/services/api.js`)
```javascript
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    ...(options.headers || {})
  };

  // Only add Content-Type: application/json if body is NOT FormData
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
};
```

---

### 2. Copy-Pasteable Frontend Integration Examples

#### 🔐 User Login
```javascript
export const loginUser = async (email, password) => {
  const data = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  
  // Store token and user object
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
  return data;
};
```

#### 📝 User Registration
```javascript
export const registerUser = async (userData) => {
  const data = await apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role || 'student',
      university: userData.university,
      skills: userData.skills
    })
  });
  
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
  return data;
};
```

#### 🔍 Get Challenges with Filters
```javascript
export const getChallenges = async (category = '', district = '', search = '', page = 1) => {
  const query = new URLSearchParams({
    page,
    limit: 9,
    ...(category && { category }),
    ...(district && { district }),
    ...(search && { search })
  });

  return await apiFetch(`/challenges?${query.toString()}`);
};
```

#### 📢 Report a Problem (Create Challenge with Image/Video Evidence)
```javascript
export const createChallenge = async (formData) => {
  // formData should be an instance of FormData with files attached
  // formData.append('title', 'Water Scarcity in Ranchi');
  // formData.append('category', 'Water Management');
  // formData.append('district', 'Ranchi');
  // formData.append('description', 'Detailed description...');
  // formData.append('location', 'Harmu Road');
  // formData.append('evidence', fileInput.files[0]);

  return await apiFetch('/challenges', {
    method: 'POST',
    body: formData
  });
};
```

#### 💡 Submit a Solution Proposal
```javascript
export const submitSolution = async (challengeId, solutionData) => {
  return await apiFetch(`/challenges/${challengeId}/solutions`, {
    method: 'POST',
    body: JSON.stringify({
      title: solutionData.title,
      description: solutionData.description,
      proposedTechnology: solutionData.proposedTechnology,
      implementationPlan: solutionData.implementationPlan,
      expectedImpact: solutionData.expectedImpact,
      estimatedDuration: solutionData.estimatedDuration,
      industrySupportRequired: solutionData.industrySupportRequired
    })
  });
};
```

#### 👍 Upvote / Support a Challenge
```javascript
export const supportChallenge = async (challengeId) => {
  return await apiFetch(`/challenges/${challengeId}/support`, {
    method: 'POST'
  });
};
```

#### 📊 Get Role-Based Dashboard
```javascript
export const getDashboard = async (role) => {
  // role: 'citizen' | 'student' | 'university' | 'industry' | 'government'
  return await apiFetch(`/dashboard/${role}`);
};
```

#### 💬 Add Comment to Challenge
```javascript
export const addComment = async (challengeId, text) => {
  return await apiFetch(`/challenges/${challengeId}/comments`, {
    method: 'POST',
    body: JSON.stringify({ text })
  });
};
```

#### 📈 Update Project Progress
```javascript
export const updateProjectProgress = async (projectId, progress, status) => {
  return await apiFetch(`/projects/${projectId}/progress`, {
    method: 'PATCH',
    body: JSON.stringify({ progress, status })
  });
};
```

#### 📎 Upload Standalone File
```javascript
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  return await apiFetch('/upload', {
    method: 'POST',
    body: formData
  });
};
```

---

## 🛡 Error Handling & API Responses

All API responses follow a consistent format:

### ✅ Successful Response (200, 201)
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {}
}
```

### ❌ Error Response (400, 401, 403, 404, 409, 500)
```json
{
  "success": false,
  "message": "Human readable error description",
  "error": "Error details or validation array"
}
```

---

## 🏆 SIH / Jharkhand Hackathon Readiness
- **Complete End-to-End Flow**: Citizen problem posting → Government verification → Student team formation → Solution proposal → Industry sponsorship → Project milestones & progress dashboard.
- **Jharkhand Specific**: Pre-populated with real-world issues in Ranchi, Dhanbad, Jamshedpur, Palamu, Khunti, Bokaro, and Deoghar.
- **Zero Frontend Friction**: Direct CORS integration for React + Vite with configurable `VITE_API_URL`.
