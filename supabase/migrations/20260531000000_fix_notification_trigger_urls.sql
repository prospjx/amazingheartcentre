/*
  Repoint notification trigger functions to the current Supabase project.

  The previous migrations hardcoded an older project URL, so the database
  triggers were posting to the wrong Edge Function endpoints.
*/

CREATE OR REPLACE FUNCTION notify_new_appointment()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  supabase_url text := 'https://jlgeaaxmbkvobhehcbab.supabase.co';
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

CREATE OR REPLACE FUNCTION notify_new_contact_submission()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, net
AS $$
DECLARE
  supabase_url text := 'https://jlgeaaxmbkvobhehcbab.supabase.co';
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