/*
  # Fix Security Issues

  1. RLS Policy Performance Optimization
    - Replace direct auth function calls with subquery-wrapped calls
    - Ensures auth.jwt() is evaluated once per query, not per row
    - Improves query performance at scale

  2. Function Search Path Security
    - Add explicit search_path to notify_new_contact_submission function
    - Prevents potential security vulnerabilities from search_path manipulation
    - Matches the security pattern used in notify_new_appointment

  3. Important Notes
    - RLS policies now use (select auth.<function>()) pattern
    - All trigger functions have explicit search_path configuration
    - Functions reference extensions schema explicitly
*/

-- Fix RLS policy on appointments table for optimal performance
DROP POLICY IF EXISTS "Users can view own appointments by email" ON appointments;

CREATE POLICY "Users can view own appointments by email"
  ON appointments
  FOR SELECT
  USING (
    (patient_email = ((current_setting('request.headers'::text))::json ->> 'x-user-email'::text)) 
    OR 
    ((select auth.jwt()) ->> 'email' = patient_email)
  );

-- Fix notify_new_contact_submission function with secure search_path
CREATE OR REPLACE FUNCTION notify_new_contact_submission()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  supabase_url text := 'https://wavlncmrlmyidrakprsi.supabase.co';
  function_url text;
  payload jsonb;
BEGIN
  function_url := supabase_url || '/functions/v1/send-contact-notification';
  
  payload := jsonb_build_object(
    'name', NEW.name,
    'email', NEW.email,
    'phone', NEW.phone,
    'subject', NEW.subject,
    'message', NEW.message,
    'created_at', NEW.created_at
  );

  PERFORM extensions.http_post(
    url := function_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json'
    ),
    body := payload
  );

  RETURN NEW;
END;
$$;
