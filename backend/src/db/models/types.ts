/**
 * Database Model Types
 * TypeScript interfaces for all database entities
 */

// Enums
export enum MemberStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
}

export enum SecurityLevel {
  VERY_HIGH = 'very_high',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
  MANUAL = 'manual',
}

export enum AuthMethod {
  FREJA_EID = 'freja_eid',
  SSO = 'sso',
  MAGIC_LINK = 'magic_link',
  QR_CODE = 'qr_code',
  PASSWORD = 'password',
}

export enum MeetingType {
  ANNUAL = 'annual',
  EXTRAORDINARY = 'extraordinary',
}

export enum MeetingStatus {
  PLANNED = 'planned',
  ACTIVE = 'active',
  PAUSED = 'paused',
  CLOSED = 'closed',
}

export enum AgendaItemType {
  OPENING = 'opening',
  ELECTION = 'election',
  MOTION = 'motion',
  OTHER_BUSINESS = 'other_business',
  CLOSING = 'closing',
}

export enum VotingMethod {
  SIMPLE_MAJORITY = 'simple_majority',
  ABSOLUTE_MAJORITY = 'absolute_majority',
  QUALIFIED_MAJORITY = 'qualified_majority',
  STV = 'stv',
  APPROVAL = 'approval',
  SCHULZE = 'schulze',
}

export enum QuorumType {
  SIMPLE = 'simple',
  ABSOLUTE = 'absolute',
  QUALIFIED = 'qualified',
}

export enum VotingStatus {
  OPEN = 'open',
  CLOSED = 'closed',
}

export enum PresenceType {
  PHYSICAL = 'physical',
  DIGITAL = 'digital',
}

export enum DocumentFormat {
  PDF = 'pdf',
  DOCX = 'docx',
  DOC = 'doc',
  MD = 'md',
  JPG = 'jpg',
  PNG = 'png',
  WEBP = 'webp',
}

export enum ConversionStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
  MANUAL = 'manual',
}

export enum SignerRole {
  CHAIR = 'chair',
  SECRETARY = 'secretary',
  ADJUSTER = 'adjuster',
}

export enum SignatureMethod {
  FREJA = 'freja',
  BANKID = 'bankid',
  MANUAL = 'manual',
}

export enum AuditEventType {
  AUTH_SUCCESS = 'auth_success',
  AUTH_FAILURE = 'auth_failure',
  ADMIN_CHANGE = 'admin_change',
  VOTE_CAST = 'vote_cast',
  VOTE_COUNT = 'vote_count',
  DATA_ACCESS = 'data_access',
  SYSTEM_ERROR = 'system_error',
  MEMBER_ADDED = 'member_added',
  MEMBER_UPDATED = 'member_updated',
  MEETING_STARTED = 'meeting_started',
  MEETING_PAUSED = 'meeting_paused',
  MEETING_CLOSED = 'meeting_closed',
  VOTING_OPENED = 'voting_opened',
  VOTING_CLOSED = 'voting_closed',
  DOCUMENT_UPLOADED = 'document_uploaded',
  PROTOCOL_SIGNED = 'protocol_signed',
}

export enum AuditResult {
  SUCCESS = 'success',
  FAILURE = 'failure',
}

export enum DumpType {
  AUTOMATIC = 'automatic',
  MANUAL = 'manual',
  FINAL = 'final',
}

// Core Models
export interface Member {
  id: string;
  member_number: string;
  email: string;
  name: string;
  country: string | null;
  status: MemberStatus;
  security_level: SecurityLevel;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface AuthSession {
  id: string;
  member_id: string;
  session_token: string;
  auth_method: AuthMethod;
  security_level: SecurityLevel;
  ip_address: string | null;
  user_agent: string | null;
  created_at: Date;
  expires_at: Date;
  revoked_at: Date | null;
}

export interface BlindToken {
  id: string;
  token_hash: string;
  signature: string;
  issued_at: Date;
  used_at: Date | null;
  session_id: string | null;
}

export interface Meeting {
  id: string;
  type: MeetingType;
  title: string;
  location: string | null;
  scheduled_start: Date;
  actual_start: Date | null;
  actual_end: Date | null;
  status: MeetingStatus;
  chair_id: string | null;
  secretary_id: string | null;
  config: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}

export interface AgendaItem {
  id: string;
  meeting_id: string;
  number: string;
  title: string;
  description: string | null;
  item_type: AgendaItemType;
  order_index: number;
  created_at: Date;
  updated_at: Date;
}

export interface VotingSession {
  id: string;
  agenda_item_id: string;
  method: VotingMethod;
  quorum_type: QuorumType;
  quorum_threshold: number | null;
  status: VotingStatus;
  opened_at: Date;
  closed_at: Date | null;
  chair_public_key: string;
  config: Record<string, any>;
  created_at: Date;
}

export interface EncryptedVote {
  id: string;
  voting_session_id: string;
  ciphertext: string;
  receipt_code: string;
  blind_token_hash: string;
  cast_at: Date;
  replaced_by: string | null;
  is_current: boolean;
}

export interface DecryptedVote {
  id: string;
  voting_session_id: string;
  vote_data: Record<string, any>;
  receipt_code: string;
  decrypted_at: Date;
}

export interface VoteRollEntry {
  id: string;
  voting_session_id: string;
  member_id: string;
  presence_type: PresenceType;
  security_level: SecurityLevel;
  verified_by: string | null;
  verification_method: string | null;
  voted_at: Date;
}

export interface Candidate {
  id: string;
  agenda_item_id: string;
  name: string;
  email: string | null;
  phone: string | null;
  position: string;
  profile_picture: string | null;
  presentation: string | null;
  order_index: number;
  created_at: Date;
}

export interface Document {
  id: string;
  title: string;
  original_format: DocumentFormat;
  original_file_path: string;
  markdown_content: string | null;
  conversion_status: ConversionStatus;
  agenda_item_id: string | null;
  uploaded_by: string;
  uploaded_at: Date;
  version: number;
}

export interface DocumentVersion {
  id: string;
  document_id: string;
  version: number;
  content: string;
  changed_by: string;
  changed_at: Date;
  change_reason: string | null;
}

export interface Protocol {
  id: string;
  meeting_id: string;
  content: Record<string, any>;
  version: number;
  checksum: string;
  finalized_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface ProtocolSignature {
  id: string;
  protocol_id: string;
  signer_id: string;
  signer_role: SignerRole;
  signature: string;
  signature_method: SignatureMethod;
  signed_at: Date;
}

export interface AuditLogEntry {
  id: string;
  sequence_number: number;
  timestamp: Date;
  event_type: AuditEventType;
  actor: string | null;
  action: string;
  resource: string;
  result: AuditResult;
  ip_address: string | null;
  details: Record<string, any> | null;
  previous_hash: string | null;
  current_hash: string;
  created_at: Date;
}

export interface SystemConfig {
  key: string;
  value: Record<string, any>;
  updated_by: string | null;
  updated_at: Date;
}

export interface DataDump {
  id: string;
  meeting_id: string | null;
  dump_type: DumpType;
  file_path: string;
  checksum: string;
  size_bytes: number;
  created_at: Date;
}
