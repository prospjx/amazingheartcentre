/*
  # Fix Security Issues

  1. RLS Policy Optimization
    - Replace `auth.jwt()` with `(select auth.jwt())` for better performance
    - Prevents re-evaluation of auth function for each row
  
  2. Function Search Path Security
    - Add explicit search_path to `notify_new_appointment` function
    - Prevents potential security vulnerabilities from search_path manipulation
  
  3. Extension Schema Migration
    - Move `pg_net` extension from public schema to extensions schema
    - Follows PostgreSQL best practices for extension management
  
  4. Important Notes
    - RLS policy now uses subquery for optimal query planning
    - Function is now protected against search_path attacks
    - Extensions are properly isolated from user schemas
*/

-- Move pg_net extension to extensions schema
CREATE SCHEMA IF NOT EXISTS extensions;
DROP EXTENSION IF EXISTS pg_net;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Drop and recreate the RLS policy with optimized auth function call
DROP POLICY IF EXISTS "Users can view own appointments by email" ON appointments;

CREATE POLICY "Users can view own appointments by email"
  ON appointments
  FOR SELECT
  USING (
    (patient_email = ((current_setting('request.headers'::text))::json ->> 'x-user-email'::text)) 
    OR 
    ((select auth.jwt() ->> 'email'::text) = patient_email)
  );

-- Recreate the notification function with secure search_path
CREATE OR REPLACE FUNCTION notify_new_appointment()
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
  function_url := supabase_url || '/functions/v1/send-appointment-notification';
  
  payload := jsonb_build_object(
    'patient_name', NEW.patient_name,
    'patient_email', NEW.patient_email,
    'patient_phone', NEW.patient_phone,
    'appointment_date', NEW.appointment_date,
    'appointment_time', NEW.appointment_time,
    'service_type', NEW.service_type,
    'symptoms', NEW.symptoms
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
