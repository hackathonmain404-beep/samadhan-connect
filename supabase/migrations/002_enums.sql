-- Migration 002: Custom PostgreSQL Enums for Strict Domain Constraints

-- 1. Stakeholder Roles
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM (
    'CITIZEN',
    'STUDENT',
    'UNIVERSITY',
    'INDUSTRY',
    'GOVERNMENT',
    'ADMIN'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 2. Problem Lifecycle Status
DO $$ BEGIN
  CREATE TYPE challenge_status AS ENUM (
    'SUBMITTED',           -- Just reported by citizen
    'UNDER_REVIEW',       -- Under government verification
    'REJECTED',           -- Invalid or duplicate
    'OPEN_FOR_SOLUTIONS', -- Verified by govt, open in marketplace
    'SOLUTION_PROPOSED',  -- Solution proposals received
    'IN_PROJECT',         -- Prototype incubation started
    'RESOLVED'            -- Successfully implemented in community
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 3. Urgency Levels
DO $$ BEGIN
  CREATE TYPE urgency_level AS ENUM (
    'LOW',
    'MEDIUM',
    'HIGH',
    'CRITICAL'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 4. Solution Proposal Status
DO $$ BEGIN
  CREATE TYPE solution_status AS ENUM (
    'PROPOSED',
    'UNDER_REVIEW',
    'SHORTLISTED',
    'ACCEPTED',
    'REJECTED'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 5. Project Execution Lifecycle Phases
DO $$ BEGIN
  CREATE TYPE project_phase AS ENUM (
    'RESEARCH',
    'PROTOTYPE',
    'TESTING',
    'IMPLEMENTATION',
    'COMPLETED'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 6. Kanban Task Status
DO $$ BEGIN
  CREATE TYPE task_status AS ENUM (
    'TODO',
    'IN_PROGRESS',
    'DONE'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 7. Milestone Status
DO $$ BEGIN
  CREATE TYPE milestone_status AS ENUM (
    'UPCOMING',
    'IN_PROGRESS',
    'COMPLETED'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 8. Realtime Notification Event Types
DO $$ BEGIN
  CREATE TYPE notification_type AS ENUM (
    'CHALLENGE_VERIFIED',
    'CHALLENGE_REJECTED',
    'SOLUTION_SUBMITTED',
    'SOLUTION_ACCEPTED',
    'PROJECT_MILESTONE',
    'NEW_MESSAGE',
    'MENTOR_FEEDBACK'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
