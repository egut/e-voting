-- Database initialization script for Digital Voting System
-- This script creates the initial database structure

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create initial tables (minimal schema for Phase 1)
-- Full schema will be created through migrations

-- Health check table
CREATE TABLE IF NOT EXISTS system_health (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    status VARCHAR(20) NOT NULL,
    checked_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Insert initial health check
INSERT INTO system_health (status) VALUES ('initialized');

-- Grant permissions
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO voting;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO voting;
