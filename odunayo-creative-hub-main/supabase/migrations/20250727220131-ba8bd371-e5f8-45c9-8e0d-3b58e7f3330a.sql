-- Create admin settings table for general site configuration
CREATE TABLE public.admin_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for admin settings (public read, admin write)
CREATE POLICY "Anyone can view admin settings" 
ON public.admin_settings 
FOR SELECT 
USING (true);

CREATE POLICY "Only authenticated users can modify settings" 
ON public.admin_settings 
FOR ALL 
USING (auth.role() = 'authenticated');

-- Create portfolio projects table
CREATE TABLE public.portfolio_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  technologies TEXT[],
  live_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;

-- Create policies for portfolio projects
CREATE POLICY "Anyone can view portfolio projects" 
ON public.portfolio_projects 
FOR SELECT 
USING (true);

CREATE POLICY "Only authenticated users can modify projects" 
ON public.portfolio_projects 
FOR ALL 
USING (auth.role() = 'authenticated');

-- Create contact messages table
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for contact messages
CREATE POLICY "Only authenticated users can view contact messages" 
ON public.contact_messages 
FOR SELECT 
USING (auth.role() = 'authenticated');

CREATE POLICY "Anyone can create contact messages" 
ON public.contact_messages 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Only authenticated users can update contact messages" 
ON public.contact_messages 
FOR UPDATE 
USING (auth.role() = 'authenticated');

-- Create skills table
CREATE TABLE public.skills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  icon_name TEXT,
  proficiency INTEGER DEFAULT 80,
  category TEXT DEFAULT 'technical',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

-- Create policies for skills
CREATE POLICY "Anyone can view skills" 
ON public.skills 
FOR SELECT 
USING (true);

CREATE POLICY "Only authenticated users can modify skills" 
ON public.skills 
FOR ALL 
USING (auth.role() = 'authenticated');

-- Create social media links table
CREATE TABLE public.social_media_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.social_media_links ENABLE ROW LEVEL SECURITY;

-- Create policies for social media links
CREATE POLICY "Anyone can view social media links" 
ON public.social_media_links 
FOR SELECT 
USING (true);

CREATE POLICY "Only authenticated users can modify social media links" 
ON public.social_media_links 
FOR ALL 
USING (auth.role() = 'authenticated');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_admin_settings_updated_at
  BEFORE UPDATE ON public.admin_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_portfolio_projects_updated_at
  BEFORE UPDATE ON public.portfolio_projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_skills_updated_at
  BEFORE UPDATE ON public.skills
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_social_media_links_updated_at
  BEFORE UPDATE ON public.social_media_links
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default admin settings
INSERT INTO public.admin_settings (setting_key, setting_value) VALUES
  ('contact_email', 'odunayo.adufe@example.com'),
  ('contact_phone', '+234 xxx xxx xxxx'),
  ('contact_location', 'Lagos, Nigeria'),
  ('cv_download_url', ''),
  ('hero_title', 'Odunayo Adufe'),
  ('hero_subtitle', 'Full-Stack Developer & UI/UX Designer'),
  ('hero_description', 'Crafting exceptional digital experiences with modern technologies. Specialized in React, TypeScript, and scalable web applications.');

-- Insert default skills
INSERT INTO public.skills (name, icon_name, proficiency, category, order_index) VALUES
  ('HTML', 'Code', 95, 'frontend', 1),
  ('CSS', 'Palette', 90, 'frontend', 2),
  ('JavaScript', 'Terminal', 88, 'frontend', 3),
  ('React', 'Component', 92, 'frontend', 4),
  ('TypeScript', 'FileCode', 85, 'frontend', 5),
  ('Tailwind CSS', 'Paintbrush', 90, 'frontend', 6),
  ('Git & GitHub', 'GitBranch', 85, 'tools', 7),
  ('Node.js', 'Server', 80, 'backend', 8);

-- Insert default social media links
INSERT INTO public.social_media_links (platform, url, icon_name, order_index) VALUES
  ('GitHub', '#', 'Github', 1),
  ('LinkedIn', '#', 'Linkedin', 2),
  ('Twitter', '#', 'Twitter', 3);