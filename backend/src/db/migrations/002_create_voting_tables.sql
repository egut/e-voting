-- Migration 002: Create voting-related tables
-- Requirements: 1.1, 8.1, 15.5

-- Voting Sessions
CREATE TABLE voting_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agenda_item_id UUID NOT NULL REFERENCES agenda_items(id) ON DELETE CASCADE,
  method VARCHAR(50) NOT NULL CHECK (method IN ('simple_majority', 'absolute_majority', 'qualified_majority', 'stv', 'approval', 'schulze')),
  quorum_type VARCHAR(20) NOT NULL CHECK (quorum_type IN ('simple', 'absolute', 'qualified')),
  quorum_threshold DECIMAL(5,2),
  status VARCHAR(20) NOT NULL CHECK (status IN ('open', 'closed')),
  opened_at TIMESTAMP NOT NULL DEFAULT NOW(),
  closed_at TIMESTAMP,
  chair_public_key TEXT NOT NULL,
  config JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_voting_agenda ON voting_sessions(agenda_item_id);
CREATE INDEX idx_voting_status ON voting_sessions(status);
CREATE INDEX idx_voting_opened ON voting_sessions(opened_at);

-- Encrypted Votes (Vote Domain - NO FOREIGN KEY TO MEMBERS)
-- CRITICAL: This table must NOT have a foreign key to members table
-- Only links to voting_sessions and blind_tokens (via hash)
CREATE TABLE encrypted_votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  voting_session_id UUID NOT NULL REFERENCES voting_sessions(id) ON DELETE CASCADE,
  ciphertext TEXT NOT NULL,
  receipt_code VARCHAR(64) UNIQUE NOT NULL,
  blind_token_hash VARCHAR(64) NOT NULL, -- Links to blind_tokens.token_hash, NOT to members
  cast_at TIMESTAMP NOT NULL DEFAULT NOW(),
  replaced_by UUID REFERENCES encrypted_votes(id), -- For vote changes
  is_current BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX idx_votes_session ON encrypted_votes(voting_session_id);
CREATE INDEX idx_votes_receipt ON encrypted_votes(receipt_code);
CREATE INDEX idx_votes_current ON encrypted_votes(voting_session_id, is_current) WHERE is_current = true;
CREATE INDEX idx_votes_token_hash ON encrypted_votes(blind_token_hash);

-- Decrypted Votes (After voting closes)
CREATE TABLE decrypted_votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  voting_session_id UUID NOT NULL REFERENCES voting_sessions(id) ON DELETE CASCADE,
  vote_data JSONB NOT NULL,
  receipt_code VARCHAR(64) NOT NULL,
  decrypted_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_decrypted_session ON decrypted_votes(voting_session_id);
CREATE INDEX idx_decrypted_receipt ON decrypted_votes(receipt_code);

-- Vote Roll (Who voted, not what they voted)
CREATE TABLE vote_roll (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  voting_session_id UUID NOT NULL REFERENCES voting_sessions(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  presence_type VARCHAR(20) NOT NULL CHECK (presence_type IN ('physical', 'digital')),
  security_level VARCHAR(20) NOT NULL CHECK (security_level IN ('very_high', 'high', 'medium', 'low', 'manual')),
  verified_by UUID REFERENCES members(id), -- For manual verifications
  verification_method VARCHAR(50),
  voted_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(voting_session_id, member_id)
);

CREATE INDEX idx_roll_session ON vote_roll(voting_session_id);
CREATE INDEX idx_roll_member ON vote_roll(member_id);
CREATE INDEX idx_roll_presence ON vote_roll(presence_type);

-- Candidates (for elections)
CREATE TABLE candidates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agenda_item_id UUID NOT NULL REFERENCES agenda_items(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  position VARCHAR(255) NOT NULL,
  profile_picture VARCHAR(255),
  presentation TEXT,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_candidates_agenda ON candidates(agenda_item_id);
CREATE INDEX idx_candidates_order ON candidates(agenda_item_id, order_index);
