-- ============================================================================
-- Announcements — global banner shown on every user dashboard.
-- Adds two columns to the singleton site_settings row (id = 1).
-- Run this in the Supabase SQL editor. Safe to re-run (idempotent).
-- ============================================================================

alter table site_settings add column if not exists announcement_message text;
alter table site_settings add column if not exists announcement_visible boolean default false;
