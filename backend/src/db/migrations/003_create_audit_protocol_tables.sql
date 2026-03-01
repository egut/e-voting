-- Migration 003: Create audit and protocol tables
-- Requirements: 17.6, 17.7

-- Documents
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  original_format VARCHAR(10) NOT NULL CHECK (original_format IN ('pdf', 'docx', 'doc', 'md', 'jpg', 'png', 'webp')),
  original_file_path VARCHAR(500) NOT NULL,
  markdown_content TEXT,
  conversion_status VARCHAR(20) NOT NULL CHECK (conversion_status IN ('pending', 'success', 'failed', 'manual')),
  agenda_item_id UUID REFERENCES agenda_items(id) ON DELETE SET NULL,
  uploaded_by UUID NOT NULL REFERENCES members(id),
  uploaded_at TIMESTAMP NOT NULL DEFAULT NOW(),
  version INTEGER NOT NULL DEFAULT 1
);

CREATE INDEX idx_documents_agenda ON documents(agenda_item_id);
CREATE INDEX idx_documents_uploaded_by ON documents(uploaded_by);
CREATE INDEX idx_documents_status ON documents(conversion_status);

-- Document Versions
CREATE TABLE document_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  version INTEGER NOT NULL,
  content TEXT NOT NULL,
  changed_by UUID NOT NULL REFERENCES members(id),
  changed_at TIMESTAMP NOT NULL DEFAULT NOW(),
  change_reason TEXT,
  UNIQUE(document_id, version)
);

CREATE INDEX idx_versions_document ON document_versions(document_id);
CREATE INDEX idx_versions_changed_by ON document_versions(changed_by);

-- Protocols
CREATE TABLE protocols (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  meeting_id UUID NOT NULL REFERENCES meetings(id) ON DELETE CASCADE,
  content JSONB NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  checksum VARCHAR(64) NOT NULL,
  finalized_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_protocols_meeting ON protocols(meeting_id);
CREATE INDEX idx_protocols_finalized ON protocols(finalized_at);

-- Protocol Signatures
CREATE TABLE protocol_signatures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  protocol_id UUID NOT NULL REFERENCES protocols(id) ON DELETE CASCADE,
  signer_id UUID NOT NULL REFERENCES members(id),
  signer_role VARCHAR(20) NOT NULL CHECK (signer_role IN ('chair', 'secretary', 'adjuster')),
  signature TEXT NOT NULL,
  signature_method VARCHAR(50) NOT NULL CHECK (signature_method IN ('freja', 'bankid', 'manual')),
  signed_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(protocol_id, signer_id)
);

CREATE INDEX idx_signatures_protocol ON protocol_signatures(protocol_id);
CREATE INDEX idx_signatures_signer ON protocol_signatures(signer_id);

-- Audit Log (Append-only with cryptographic chain)
-- CRITICAL: This table must be append-only and cannot be modified or deleted
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sequence_number BIGSERIAL UNIQUE NOT NULL,
  timestamp TIMESTAMP NOT NULL DEFAULT NOW(),
  event_type VARCHAR(50) NOT NULL CHECK (event_type IN (
    'auth_success', 'auth_failure', 'admin_change', 'vote_cast',
    'vote_count', 'data_access', 'system_error', 'member_added',
    'member_updated', 'meeting_started', 'meeting_paused', 'meeting_closed',
    'voting_opened', 'voting_closed', 'document_uploaded', 'protocol_signed'
  )),
  actor VARCHAR(255), -- Anonymized after meeting
  action VARCHAR(255) NOT NULL,
  resource VARCHAR(255) NOT NULL,
  result VARCHAR(20) NOT NULL CHECK (result IN ('success', 'failure')),
  ip_address INET, -- Anonymized after meeting
  details JSONB,
  previous_hash VARCHAR(64),
  current_hash VARCHAR(64) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_timestamp ON audit_log(timestamp);
CREATE INDEX idx_audit_type ON audit_log(event_type);
CREATE INDEX idx_audit_sequence ON audit_log(sequence_number);
CREATE INDEX idx_audit_actor ON audit_log(actor);

-- System Configuration
CREATE TABLE system_config (
  key VARCHAR(100) PRIMARY KEY,
  value JSONB NOT NULL,
  updated_by UUID REFERENCES members(id),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Data Dumps (for quick recovery)
CREATE TABLE data_dumps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  meeting_id UUID REFERENCES meetings(id) ON DELETE SET NULL,
  dump_type VARCHAR(20) NOT NULL CHECK (dump_type IN ('automatic', 'manual', 'final')),
  file_path VARCHAR(500) NOT NULL,
  checksum VARCHAR(64) NOT NULL,
  size_bytes BIGINT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_dumps_meeting ON data_dumps(meeting_id);
CREATE INDEX idx_dumps_type ON data_dumps(dump_type);
CREATE INDEX idx_dumps_created ON data_dumps(created_at);
