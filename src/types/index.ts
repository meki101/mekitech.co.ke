export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  long_description: string;
  image_url: string;
  gallery_urls: string[];
  technologies: string[];
  client_name: string;
  problem_context: string;
  approach: string;
  delivered_impact: string;
  service_tags: string[];
  featured: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon_name: string;
  order_position: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PricingTier {
  id: string;
  service_id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  features: string[];
  is_featured: boolean;
  order_position: number;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_role: string;
  client_company: string;
  client_image_url: string;
  content: string;
  rating: number;
  project_id: string | null;
  is_featured: boolean;
  is_video: boolean;
  video_url?: string;
  created_at: string;
}

export interface Inquiry {
  id: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  client_company: string;
  service_id: string | null;
  project_description: string;
  budget_range: string;
  timeline: string;
  status: string;
  created_at: string;
}

export interface Payment {
  id: string;
  inquiry_id: string;
  amount: number;
  currency: string;
  payment_method: string;
  payment_reference: string;
  status: string;
  created_at: string;
  completed_at: string | null;
}
