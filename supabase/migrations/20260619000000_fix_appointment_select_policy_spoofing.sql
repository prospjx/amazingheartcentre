/*
  Prevent appointment data disclosure through spoofed request headers.

  The previous SELECT policy trusted the client-supplied x-user-email header.
  Public clients can set that header themselves when calling PostgREST, so only
  authenticated users with a matching JWT email should be able to read rows.
*/

DROP POLICY IF EXISTS "Users can view own appointments by email" ON appointments;

CREATE POLICY "Users can view own appointments by email"
  ON appointments
  FOR SELECT
  TO authenticated
  USING (
    patient_email = ((select auth.jwt()) ->> 'email')
  );
