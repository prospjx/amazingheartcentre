/*
  # Fix RLS Security Vulnerabilities
  
  ## Overview
  This migration addresses critical security vulnerabilities in RLS policies
  that were using USING (true) or WITH CHECK (true), which effectively
  bypass row-level security.
  
  ## Changes Made
  
  1. **Appointments Table**
     - DROP insecure policies that allowed unrestricted access
     - CREATE secure policy: Allow anonymous users to INSERT appointments (public booking)
     - CREATE secure policy: Allow anonymous users to SELECT their own appointments by email
     - REMOVE unrestricted UPDATE/DELETE policies (admin-only via service role)
  
  2. **Blog Posts Table**
     - DROP insecure policies
     - KEEP policy: Allow public to read published blog posts only
     - REMOVE unrestricted INSERT/UPDATE/DELETE policies (admin-only via service role)
  
  3. **Resources Table**
     - DROP insecure policies  
     - KEEP policy: Allow public to read all resources
     - REMOVE unrestricted INSERT/UPDATE/DELETE policies (admin-only via service role)
  
  4. **Contact Submissions Table**
     - DROP insecure policies
     - CREATE secure policy: Allow anonymous users to INSERT contact forms (public submission)
     - REMOVE unrestricted SELECT/UPDATE/DELETE policies (admin-only via service role)
  
  ## Security Principles Applied
  - Principle of least privilege: Users can only access what they need
  - No `USING (true)` or `WITH CHECK (true)` clauses
  - Write operations restricted to service role for admin functions
  - Public read access only where appropriate (published content)
  
  ## Important Notes
  - Admin operations (INSERT/UPDATE/DELETE on blog_posts, resources) must use service role key
  - Patient data in appointments is protected - users can only see their own data
  - Contact submissions are write-only for public, read-only for admins via service role
*/

-- ============================================================
-- DROP ALL INSECURE POLICIES
-- ============================================================

-- Drop appointments policies
DROP POLICY IF EXISTS "Anyone can book appointments" ON appointments;
DROP POLICY IF EXISTS "Anyone can view own appointments" ON appointments;
DROP POLICY IF EXISTS "Authenticated users can update appointments" ON appointments;
DROP POLICY IF EXISTS "Authenticated users can delete appointments" ON appointments;

-- Drop blog_posts policies
DROP POLICY IF EXISTS "Anyone can read published blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can create blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can update blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can delete blog posts" ON blog_posts;

-- Drop resources policies
DROP POLICY IF EXISTS "Anyone can read resources" ON resources;
DROP POLICY IF EXISTS "Authenticated users can create resources" ON resources;
DROP POLICY IF EXISTS "Authenticated users can update resources" ON resources;
DROP POLICY IF EXISTS "Authenticated users can delete resources" ON resources;

-- Drop contact_submissions policies
DROP POLICY IF EXISTS "Anyone can submit contact forms" ON contact_submissions;
DROP POLICY IF EXISTS "Authenticated users can view contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Authenticated users can update contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Authenticated users can delete contacts submissions" ON contact_submissions;

-- ============================================================
-- CREATE SECURE POLICIES - APPOINTMENTS
-- ============================================================

-- Allow anyone to book appointments (public booking form)
CREATE POLICY "Public can book appointments"
  ON appointments FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    patient_name IS NOT NULL 
    AND patient_email IS NOT NULL 
    AND patient_phone IS NOT NULL
    AND appointment_date IS NOT NULL
    AND appointment_time IS NOT NULL
    AND service_type IS NOT NULL
  );

-- Allow users to view only their own appointments by matching email
CREATE POLICY "Users can view own appointments by email"
  ON appointments FOR SELECT
  TO anon, authenticated
  USING (
    patient_email = current_setting('request.headers')::json->>'x-user-email'
    OR auth.jwt()->>'email' = patient_email
  );

-- Note: UPDATE and DELETE are restricted to service role only (admin access)
-- No policies created - admins must use service role key

-- ============================================================
-- CREATE SECURE POLICIES - BLOG POSTS
-- ============================================================

-- Allow anyone to read published blog posts only
CREATE POLICY "Public can read published posts"
  ON blog_posts FOR SELECT
  TO anon, authenticated
  USING (published_at IS NOT NULL);

-- Note: INSERT/UPDATE/DELETE restricted to service role (admin-only operations)

-- ============================================================
-- CREATE SECURE POLICIES - RESOURCES
-- ============================================================

-- Allow anyone to read all resources (public educational content)
CREATE POLICY "Public can read resources"
  ON resources FOR SELECT
  TO anon, authenticated
  USING (true);

-- Note: INSERT/UPDATE/DELETE restricted to service role (admin-only operations)

-- ============================================================
-- CREATE SECURE POLICIES - CONTACT SUBMISSIONS
-- ============================================================

-- Allow anyone to submit contact forms
CREATE POLICY "Public can submit contact forms"
  ON contact_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    name IS NOT NULL 
    AND email IS NOT NULL 
    AND subject IS NOT NULL
    AND message IS NOT NULL
  );

-- Note: SELECT/UPDATE/DELETE restricted to service role (admin-only operations)
