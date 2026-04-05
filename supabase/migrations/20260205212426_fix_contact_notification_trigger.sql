/*
  # Fix Contact Notification Trigger

  1. Changes
    - Updates the notify_new_contact_submission() function to use the correct Supabase URL
    - Matches the working implementation from the appointment notification
    - Uses the same URL format and request structure that works for appointments

  2. Technical Details
    - Changes from dynamic URL retrieval to hardcoded Supabase URL
    - Simplifies the trigger function to match the appointment pattern
    - Removes unnecessary authorization header complexity
*/

CREATE OR REPLACE FUNCTION notify_new_contact_submission()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;
