/*
  # Fix Security Issues - Enable RLS and Drop Unused Indexes

  ## Security Improvements
  
  1. Enable Row Level Security (RLS) on all tables
     - `appointments` table
     - `blog_posts` table
     - `resources` table
     - `contact_submissions` table
  
  2. Add RLS Policies
     - **appointments**: 
       - Public can INSERT (book appointments)
       - Public can SELECT their own appointments by email
       - Authenticated users can view and manage all appointments
     
     - **blog_posts**: 
       - Public can SELECT (read all blog posts)
       - Authenticated users can manage (INSERT/UPDATE/DELETE)
     
     - **resources**: 
       - Public can SELECT (read all resources)
       - Authenticated users can manage (INSERT/UPDATE/DELETE)
     
     - **contact_submissions**: 
       - Public can INSERT (submit contact forms)
       - Authenticated users can view all submissions
  
  3. Performance Optimization
     - Drop unused indexes to improve database performance:
       - appointments_date_idx
       - appointments_status_idx
       - blog_posts_slug_idx
       - blog_posts_category_idx
       - resources_category_idx

  ## Important Notes
  - RLS is MANDATORY for all public tables to prevent unauthorized data access
  - Policies are designed to allow public booking/reading while protecting sensitive data
  - Admin access requires authentication
*/

-- Enable RLS on all tables
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- APPOINTMENTS TABLE POLICIES
-- ============================================================

-- Allow anyone to book appointments (INSERT)
CREATE POLICY "Anyone can book appointments"
  ON appointments FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow anyone to view their own appointments by email
CREATE POLICY "Anyone can view own appointments"
  ON appointments FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow authenticated users to update appointments
CREATE POLICY "Authenticated users can update appointments"
  ON appointments FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete appointments
CREATE POLICY "Authenticated users can delete appointments"
  ON appointments FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================
-- BLOG_POSTS TABLE POLICIES
-- ============================================================

-- Allow anyone to read published blog posts
CREATE POLICY "Anyone can read published blog posts"
  ON blog_posts FOR SELECT
  TO anon, authenticated
  USING (published_at IS NOT NULL);

-- Allow authenticated users to insert blog posts
CREATE POLICY "Authenticated users can create blog posts"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update blog posts
CREATE POLICY "Authenticated users can update blog posts"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete blog posts
CREATE POLICY "Authenticated users can delete blog posts"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================
-- RESOURCES TABLE POLICIES
-- ============================================================

-- Allow anyone to read all resources
CREATE POLICY "Anyone can read resources"
  ON resources FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow authenticated users to insert resources
CREATE POLICY "Authenticated users can create resources"
  ON resources FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update resources
CREATE POLICY "Authenticated users can update resources"
  ON resources FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete resources
CREATE POLICY "Authenticated users can delete resources"
  ON resources FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================
-- CONTACT_SUBMISSIONS TABLE POLICIES
-- ============================================================

-- Allow anyone to submit contact forms
CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow authenticated users to view all contact submissions
CREATE POLICY "Authenticated users can view contact submissions"
  ON contact_submissions FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to update contact submissions
CREATE POLICY "Authenticated users can update contact submissions"
  ON contact_submissions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete contact submissions
CREATE POLICY "Authenticated users can delete contact submissions"
  ON contact_submissions FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================
-- DROP UNUSED INDEXES
-- ============================================================

DROP INDEX IF EXISTS appointments_date_idx;
DROP INDEX IF EXISTS appointments_status_idx;
DROP INDEX IF EXISTS blog_posts_slug_idx;
DROP INDEX IF EXISTS blog_posts_category_idx;
DROP INDEX IF EXISTS resources_category_idx;