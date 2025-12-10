/*
  # Seed Initial Data

  Populates the database with example content for MekiTech portfolio.
  This demonstrates the full capability of the platform.
*/

INSERT INTO services (name, slug, description, icon_name, order_position, is_active) VALUES
  ('Web & Software Engineering', 'web-software-engineering', 'Custom web applications, SaaS platforms, and enterprise software solutions built with modern technologies.', 'code', 1, true),
  ('E-Commerce & Automation', 'ecommerce-automation', 'End-to-end e-commerce solutions and business process automation to streamline operations.', 'shopping-cart', 2, true),
  ('IT Consulting', 'it-consulting', 'Strategic technology consulting for digital transformation, infrastructure planning, and technical architecture.', 'briefcase', 3, true),
  ('Digital Marketing & SEO', 'digital-marketing-seo', 'SEO optimization, digital strategy, and marketing technology integration to drive growth.', 'trending-up', 4, true),
  ('Hardware & Infrastructure', 'hardware-infrastructure', 'Network design, server setup, security systems, and IT infrastructure deployment.', 'server', 5, true),
  ('Audio-Visual Production', 'audio-visual-production', 'Professional video production, motion graphics, and multimedia content creation.', 'video', 6, true);

INSERT INTO pricing_tiers (service_id, name, description, price, currency, features, is_featured, order_position) 
SELECT id, 'Starter', 'Perfect for small projects and MVPs', 50000, 'KES', ARRAY['Initial consultation', 'Basic deliverables', '2 weeks turnaround'], false, 1 
FROM services WHERE slug = 'web-software-engineering'
UNION ALL
SELECT id, 'Professional', 'Comprehensive solution for growing teams', 150000, 'KES', ARRAY['Full consulting', 'Advanced features', 'Quality assurance', '4 weeks turnaround', 'Post-launch support'], true, 2 
FROM services WHERE slug = 'web-software-engineering'
UNION ALL
SELECT id, 'Enterprise', 'Full-scale custom development', 400000, 'KES', ARRAY['Dedicated team', 'Full stack solution', 'Infrastructure setup', 'Ongoing support', 'Custom timeline'], false, 3 
FROM services WHERE slug = 'web-software-engineering';

INSERT INTO projects (title, slug, description, long_description, image_url, client_name, problem_context, approach, delivered_impact, service_tags, featured, status) VALUES
  (
    'E-Commerce Platform for Digital Goods',
    'ecommerce-digital-goods',
    'Built a modern e-commerce platform enabling creators to sell digital products with payment integration.',
    'A Kenyan digital content creator needed a platform to sell courses, templates, and digital products. The existing solution was clunky and didn''t support the payment methods popular in their market.',
    'https://images.pexels.com/photos/8439046/pexels-photo-8439046.jpeg',
    'Digital Creators Inc.',
    'Manual payment processing, limited scalability, poor user experience, no analytics on product performance.',
    'Designed and built a custom React-based e-commerce platform with Stripe and M-Pesa integration, comprehensive admin dashboard for inventory management, and customer analytics.',
    'Platform now processes 500+ transactions monthly with 95% customer satisfaction. Reduced payment processing time by 70% and enabled data-driven business decisions.',
    ARRAY['web-software-engineering', 'ecommerce-automation'],
    true,
    'published'
  ),
  (
    'Healthcare Management System',
    'healthcare-management-system',
    'Developed an integrated system for managing patient records, appointments, and billing.',
    'A clinic network across 5 locations needed to consolidate patient data and streamline operations. Each clinic was using different systems, creating data silos and inefficiency.',
    'https://images.pexels.com/photos/8376215/pexels-photo-8376215.jpeg',
    'HealthCare Plus Network',
    'Fragmented systems across locations, manual record keeping, double bookings, billing errors, compliance risks.',
    'Built a centralized cloud-based system with real-time sync across all locations, automated appointment reminders via SMS, integrated billing module, and secure patient data encryption.',
    'Eliminated data silos, reduced appointment no-shows by 40%, processed billing 5x faster, achieved full HIPAA compliance and 99.99% uptime.',
    ARRAY['web-software-engineering', 'it-consulting'],
    true,
    'published'
  ),
  (
    'Supply Chain Optimization Platform',
    'supply-chain-optimization',
    'Created an AI-powered platform to optimize inventory and reduce operational costs.',
    'A manufacturer was struggling with inventory bloat and missed orders due to poor forecasting. Manual spreadsheet-based processes were error-prone and couldn''t scale.',
    'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg',
    'Manufacturing Solutions Ltd',
    'Inefficient inventory management, poor demand forecasting, high carrying costs, frequent stock-outs.',
    'Implemented machine learning models to predict demand, automated reorder triggers, real-time inventory tracking via IoT sensors, and a web dashboard for supply chain visibility.',
    'Reduced inventory holding costs by 35%, eliminated stock-outs, improved demand forecasting accuracy to 92%, and saved approximately 200,000 KES annually.',
    ARRAY['web-software-engineering', 'it-consulting', 'hardware-infrastructure'],
    false,
    'published'
  );

INSERT INTO testimonials (client_name, client_role, client_company, client_image_url, content, rating, project_id, is_featured) 
SELECT 'Sarah Kiplagat', 'CEO', 'Digital Creators Inc.', 'https://images.pexels.com/photos/1152359/pexels-photo-1152359.jpeg', 
  'Working with Mathew transformed how we do business. The e-commerce platform was delivered on time, handles scale beautifully, and the payment integration just works. Highly recommended!',
  5, id, true 
FROM projects WHERE slug = 'ecommerce-digital-goods'
UNION ALL
SELECT 'Dr. James Mwangi', 'Medical Director', 'HealthCare Plus Network', 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg',
  'The healthcare system has revolutionized our operations. Patient data is now seamless across all locations, and our staff can focus on care instead of admin work. Exceptional work.',
  5, 
  (SELECT id FROM projects WHERE slug = 'healthcare-management-system'),
  true
UNION ALL
SELECT 'Peter Ochieng', 'Operations Manager', 'Manufacturing Solutions Ltd', 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
  'The supply chain platform cut our costs significantly. The AI-powered forecasting is eerily accurate. Mathew''s technical expertise and attention to detail set him apart.',
  5,
  (SELECT id FROM projects WHERE slug = 'supply-chain-optimization'),
  false;
