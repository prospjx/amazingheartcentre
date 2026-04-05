/*
  # Fix Contact Notification Function - Use Correct Schema

  1. Changes
    - Update notify_new_contact_submission to use net.http_post (not extensions.http_post)
    - Add 'net' schema to search_path for secure function execution
    - pg_net extension functions are in the 'net' schema

  2. Technical Details
    - The pg_net extension is installed in 'extensions' schema
    - But the actual http_post function is in the 'net' schema
    - search_path updated to include both public and net schemas
*/

CREATE OR REPLACE FUNCTION notify_new_contact_submission()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, net
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

  PERFORM net.http_post(
    url := function_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json'
    ),
    body := payload
  );

  RETURN NEW;
END;
$$;
