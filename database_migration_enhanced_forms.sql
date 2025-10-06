-- Migration to add enhanced fields to contact_forms and early_access_requests tables
-- Run this in your Supabase SQL editor to update the tables

-- Add company and phone columns to contact_forms table
ALTER TABLE contact_forms 
ADD COLUMN IF NOT EXISTS company VARCHAR(255),
ADD COLUMN IF NOT EXISTS phone VARCHAR(50);

-- Add phone column to early_access_requests table
ALTER TABLE early_access_requests 
ADD COLUMN IF NOT EXISTS phone VARCHAR(50);

-- Create comment for documentation
COMMENT ON COLUMN contact_forms.company IS 'Optional company name from contact form';
COMMENT ON COLUMN contact_forms.phone IS 'Optional phone number from contact form';
COMMENT ON COLUMN early_access_requests.phone IS 'Phone number for early access contact';

