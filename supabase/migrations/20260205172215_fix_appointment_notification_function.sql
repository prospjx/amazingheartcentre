/*
  # Fix Appointment Notification Function

  1. Problem
    - The `notify_new_appointment` function was calling `extensions.http_post`
    - However, pg_net extension creates its functions in the `net` schema
    - This caused the function to fail and appointments couldn't be created

  2. Solution
    - Update function to use `net.http_post` instead of `extensions.http_post`
    - Update search_path to include `net` schema
    - Keep extension installed in `extensions` schema (this is correct)
    - But reference pg_net functions from `net` schema where they actually exist

  3. Note
    - pg_net extension can be installed in any schema
    - But its functions are always created in the `net` schema
*/

CREATE OR REPLACE FUNCTION notify_new_appointment()
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
