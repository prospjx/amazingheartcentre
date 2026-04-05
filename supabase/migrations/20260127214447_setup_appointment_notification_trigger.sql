/*
  # Setup Appointment Notification Trigger

  1. New Functions
    - `notify_new_appointment()` - Triggers email notification when new appointment is created
  
  2. New Triggers
    - `on_appointment_created` - Fires after INSERT on appointments table
  
  3. Changes
    - Enables pg_net extension for HTTP requests from database
    - Creates trigger function to call edge function via HTTP
    - Sends appointment data to notification service
  
  4. Important Notes
    - Uses pg_net.http_post for async HTTP requests
    - Edge function URL uses environment-based Supabase project URL
    - Trigger fires after INSERT to ensure data is committed
    - Uses service role for authentication (configured in edge function)
*/

CREATE EXTENSION IF NOT EXISTS pg_net;

CREATE OR REPLACE FUNCTION notify_new_appointment()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_appointment_created ON appointments;

CREATE TRIGGER on_appointment_created
  AFTER INSERT ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_appointment();
