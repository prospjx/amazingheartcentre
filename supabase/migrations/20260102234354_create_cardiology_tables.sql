/*
  # Create Cardiology Centre Database Tables
  
  1. New Tables
    - `appointments` - Stores patient appointment bookings
      - `id` (uuid, primary key)
      - `patient_name` (text, required)
      - `patient_email` (text, required)
      - `patient_phone` (text, required)
      - `appointment_date` (date, required)
      - `appointment_time` (time, required)
      - `service_type` (text, required - type of cardiology service)
      - `symptoms` (text, optional - patient symptoms)
      - `status` (text, default 'pending' - pending, confirmed, cancelled)
      - `created_at` (timestamp)
    
    - `blog_posts` - Stores blog articles about cardiology and heart health
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `slug` (text, unique, required)
      - `excerpt` (text, required)
      - `content` (text, required)
      - `image_url` (text)
      - `author` (text)
      - `category` (text - e.g., 'Heart Health', 'Prevention', 'Treatment')
      - `published_at` (timestamp)
      - `created_at` (timestamp)
    
    - `resources` - Stores heart health educational resources
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `description` (text, required)
      - `content` (text, required)
      - `category` (text - e.g., 'Risk Factors', 'Symptoms', 'Prevention')
      - `resource_type` (text - e.g., 'guide', 'infographic', 'video')
      - `icon_name` (text - lucide icon name)
      - `created_at` (timestamp)
    
    - `contact_submissions` - Stores contact form submissions
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `phone` (text)
      - `subject` (text, required)
      - `message` (text, required)
      - `created_at` (timestamp)
  
  2. Security
    - RLS is disabled for all tables as this is a public-facing booking system
    - No authentication required for appointment booking
*/

CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name text NOT NULL,
  patient_email text NOT NULL,
  patient_phone text NOT NULL,
  appointment_date date NOT NULL,
  appointment_time time NOT NULL,
  service_type text NOT NULL,
  symptoms text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  image_url text,
  author text DEFAULT 'Cardiology Centre',
  category text,
  published_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  content text NOT NULL,
  category text,
  resource_type text,
  icon_name text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS appointments_date_idx ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS appointments_status_idx ON appointments(status);
CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS blog_posts_category_idx ON blog_posts(category);
CREATE INDEX IF NOT EXISTS resources_category_idx ON resources(category);
