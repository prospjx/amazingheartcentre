/*
  # Remove Remaining Insecure Policy
  
  ## Overview
  Remove the last remaining policy with unrestricted access (USING true)
  that was missed in the previous security fix.
  
  ## Changes
  - DROP: "Authenticated users can delete contact submissions" policy
    - This policy had USING (true) which allows unrestricted access
    - Contact submission deletions should only be done via service role (admin access)
  
  ## Security Impact
  - Contact submissions can now only be deleted by administrators using the service role key
  - This prevents authenticated users from deleting any contact submission in the database
  - Maintains data integrity and proper access control
*/

-- Drop the insecure delete policy for contact_submissions
DROP POLICY IF EXISTS "Authenticated users can delete contact submissions" ON contact_submissions;
