-- Create client reviews table
CREATE TABLE public.client_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  profile_image_url TEXT,
  star_rating INTEGER NOT NULL CHECK (star_rating >= 1 AND star_rating <= 5),
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  approved BOOLEAN DEFAULT true
);

-- Enable Row Level Security
ALTER TABLE public.client_reviews ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view approved reviews" 
ON public.client_reviews 
FOR SELECT 
USING (approved = true);

CREATE POLICY "Anyone can create reviews" 
ON public.client_reviews 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Only authenticated users can update reviews" 
ON public.client_reviews 
FOR UPDATE 
USING (auth.role() = 'authenticated'::text);

-- Create storage bucket for review profile images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('review-profiles', 'review-profiles', true);

-- Create storage policies for profile images
CREATE POLICY "Anyone can view review profile images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'review-profiles');

CREATE POLICY "Anyone can upload review profile images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'review-profiles');

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_client_reviews_updated_at
BEFORE UPDATE ON public.client_reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();