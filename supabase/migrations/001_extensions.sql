-- Migration 001: Required PostgreSQL Extensions
-- UUID Generation and Cryptographic primitives

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
