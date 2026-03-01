-- Migration 001: Create core database tables
-- Requirements: 1.1, 6.7

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Members (Identity Domain)
CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_number VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  country VARCHAR(2),
  status VARCHAR(20) NOT NULL CHECK (status IN ('active', 'inactive', 'pending')),
  security_level VARCHAR(20) NOT NULL CHECK (security_level IN ('very_high', 'high', 'medium', 'low', 'manual')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMP -- Soft delete after meeting
);

CREATE INDEX idx_members_status ON members(status);
CREATE INDEX idx_members_email ON members(email);
CREATE INDEX idx_members_number ON members(member_number);

-- Authentication Sessions
CREATE TABLE auth_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  session_token VARCHAR(255) UNIQUE NOT NULL,
  auth_method VARCHAR(50) NOT NULL CHECK (auth_method IN ('freja_eid', 'sso', 'magic_link', 'qr_code', 'password')),
  security_level VARCHAR(20) NOT NULL CHECK (security_level IN ('very_high', 'high', 'medium', 'low', 'manual')),
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMP NOT NULL,
  revoked_at TIMESTAMP
);

CREATE INDEX idx_sessions_token ON auth_sessions(session_token);
CREATE INDEX idx_sessions_member ON auth_sessions(member_id);
CREATE INDEX idx_sessions_expires ON auth_sessions(expires_at);

-- Blind Tokens (Cryptographic Separation - NO foreign key to members)
CREATE TABLE blind_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  token_hash VARCHAR(64) UNIQUE NOT NULL, -- SHA-256 hash
  signature TEXT NOT NULL,
  issued_at TIMESTAMP NOT NULL DEFAULT NOW(),
  used_at TIMESTAMP,
  session_id UUID REFERENCES auth_sessions(id) ON DELETE SET NULL
);

CREATE INDEX idx_blind_tokens_hash ON blind_tokens(token_hash);
CREATE INDEX idx_blind_tokens_session ON blind_tokens(session_id);

-- Meetings
CREATE TABLE meetings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type VARCHAR(20) NOT NULL CHECK (type IN ('annual', 'extraordinary')),
  title VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  scheduled_start TIMESTAMP NOT NULL,
  actual_start TIMESTAMP,
  actual_end TIMESTAMP,
  status VARCHAR(20) NOT NULL CHECK (status IN ('planned', 'active', 'paused', 'closed')),
  chair_id UUID REFERENCES members(id),
  secretary_id UUID REFERENCES members(id),
  config JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_meetings_status ON meetings(status);
CREATE INDEX idx_meetings_scheduled ON meetings(scheduled_start);

-- Agenda Items
CREATE TABLE agenda_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  meeting_id UUID NOT NULL REFERENCES meetings(id) ON DELETE CASCADE,
  number VARCHAR(10) NOT NULL, -- §1, §2, etc.
  title VARCHAR(255) NOT NULL,
  description TEXT,
  item_type VARCHAR(50) NOT NULL CHECK (item_type IN ('opening', 'election', 'motion', 'other_business', 'closing')),
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(meeting_id, number)
);

CREATE INDEX idx_agenda_meeting ON agenda_items(meeting_id, order_index);
CREATE INDEX idx_agenda_type ON agenda_items(item_type);
