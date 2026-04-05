/*
  # Setup Contact Form Notification Trigger

  1. Overview
    - Automatically sends email notifications when new contact form submissions are received
    - Uses the send-contact-notification edge function to send emails via Resend API

  2. Changes
    - Creates a trigger function `notify_new_contact_submission()` that:
      - Calls the send-contact-notification edge function
      - Passes contact submission data as JSON payload
      - Handles errors gracefully without blocking the insert
    
    - Creates an AFTER INSERT trigger on `contact_submissions` table
      - Executes after each new contact form submission
      - Sends notification email to admin

  3. Security
    - Trigger function uses service role key for edge function calls
    - Errors are logged but don't prevent contact submission from being saved
    - No sensitive data exposure in error messages

  4. Dependencies
    - Requires RESEND_API_KEY environment variable (for Resend email service)
    - Requires ADMIN_EMAIL environment variable (recipient email address)
    - Uses deployed send-contact-notification edge function
*/

-- Create function to send contact notification
CREATE OR REPLACE FUNCTION notify_new_contact_submission()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  request_id bigint;
  supabase_url text;
  service_role_key text;
BEGIN
  -- Get Supabase URL and service role key from environment
  supabase_url := current_setting('app.settings.supabase_url', true);
  service_role_key := current_setting('app.settings.service_role_key', true);

  -- If settings are not available, try to use pg_net with default URL construction
  IF supabase_url IS NULL THEN
    supabase_url := 'http://kong:8000';
  END IF;

  -- Make async HTTP request to edge function using pg_net
  SELECT net.http_post(
    url := supabase_url || '/functions/v1/send-contact-notification',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || coalesce(service_role_key, current_setting('request.jwt.claim.sub', true))
    ),
    body := jsonb_build_object(
      'name', NEW.name,
      'email', NEW.email,
      'phone', NEW.phone,
      'subject', NEW.subject,
      'message', NEW.message,
      'created_at', NEW.created_at
    )
  ) INTO request_id;

  -- Log the request (optional, for debugging)
  RAISE LOG 'Contact notification request sent with ID: %', request_id;

  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail the insert
    RAISE WARNING 'Failed to send contact notification: %', SQLERRM;
    RETURN NEW;
END;
$$;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_contact_submission_created ON contact_submissions;

-- Create trigger for new contact submissions
CREATE TRIGGER on_contact_submission_created
  AFTER INSERT ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_contact_submission();
