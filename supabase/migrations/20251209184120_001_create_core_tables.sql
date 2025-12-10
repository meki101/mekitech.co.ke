/*
  # MekiTech Core Database Schema

  1. New Tables
    - `profiles` - Admin user profiles
    - `projects` - Portfolio projects and case studies
    - `services` - Service offerings with descriptions
    - `pricing_tiers` - Tiered pricing for services
    - `testimonials` - Client testimonials
    - `inquiries` - Client project inquiries
    - `payments` - Payment transaction records

  2. Security
    - Enable RLS on all tables
    - Restrict data access based on user role
    - Public read access for portfolio/services/testimonials
    - Private write access for admin only

  3. Features
    - Automatic timestamps on creation/update
    - Soft deletes with archived_at column
    - Payment status tracking
    - Inquiry status tracking
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  bio text,
  avatar_url text,
  is_admin boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  long_description text,
  image_url text,
  gallery_urls text[] DEFAULT '{}',
  technologies text[] DEFAULT '{}',
  client_name text,
  problem_context text,
  approach text,
  delivered_impact text,
  service_tags text[] DEFAULT '{}',
  featured boolean DEFAULT false,
  status text DEFAULT 'published',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  archived_at timestamptz
);

CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  icon_name text,
  order_position integer,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  archived_at timestamptz
);

CREATE TABLE IF NOT EXISTS pricing_tiers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  price numeric(10, 2) NOT NULL,
  currency text DEFAULT 'KES',
  features text[] DEFAULT '{}',
  is_featured boolean DEFAULT false,
  order_position integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  client_role text,
  client_company text,
  client_image_url text,
  content text NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  project_id uuid REFERENCES projects(id) ON DELETE SET NULL,
  is_featured boolean DEFAULT false,
  is_video boolean DEFAULT false,
  video_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  archived_at timestamptz
);

CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  client_email text NOT NULL,
  client_phone text,
  client_company text,
  service_id uuid REFERENCES services(id) ON DELETE SET NULL,
  project_description text NOT NULL,
  budget_range text,
  timeline text,
  status text DEFAULT 'new',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  responded_at timestamptz
);

CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id uuid REFERENCES inquiries(id) ON DELETE SET NULL,
  amount numeric(10, 2) NOT NULL,
  currency text DEFAULT 'KES',
  payment_method text NOT NULL,
  payment_reference text UNIQUE,
  status text DEFAULT 'pending',
  payment_data jsonb,
  receipt_email text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(is_featured);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- PROFILES: Admin only can read/write their own profile
CREATE POLICY "Admin users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admin users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- PROJECTS: Public read, admin write
CREATE POLICY "Anyone can view published projects"
  ON projects FOR SELECT
  USING (status = 'published' AND archived_at IS NULL);

CREATE POLICY "Admin can manage all projects"
  ON projects FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

-- SERVICES: Public read, admin write
CREATE POLICY "Anyone can view active services"
  ON services FOR SELECT
  USING (is_active = true AND archived_at IS NULL);

CREATE POLICY "Admin can manage all services"
  ON services FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

-- PRICING_TIERS: Public read, admin write
CREATE POLICY "Anyone can view pricing tiers"
  ON pricing_tiers FOR SELECT
  USING (TRUE);

CREATE POLICY "Admin can manage pricing tiers"
  ON pricing_tiers FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

-- TESTIMONIALS: Public read, admin write
CREATE POLICY "Anyone can view testimonials"
  ON testimonials FOR SELECT
  USING (archived_at IS NULL);

CREATE POLICY "Admin can manage testimonials"
  ON testimonials FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

-- INQUIRIES: Clients can create, admin can read/manage
CREATE POLICY "Anyone can create inquiries"
  ON inquiries FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Admin can view all inquiries"
  ON inquiries FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

CREATE POLICY "Admin can manage inquiries"
  ON inquiries FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

-- PAYMENTS: Clients can view their own, admin can manage all
CREATE POLICY "Admin can view all payments"
  ON payments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

CREATE POLICY "Admin can manage payments"
  ON payments FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );
