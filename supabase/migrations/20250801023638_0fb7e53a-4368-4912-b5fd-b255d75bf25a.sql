-- Create destinations table
CREATE TABLE public.destinations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  duration INTEGER NOT NULL,
  highlights TEXT[] NOT NULL DEFAULT '{}',
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to read destinations (public access)
CREATE POLICY "Anyone can view destinations" 
ON public.destinations 
FOR SELECT 
USING (true);

-- Create policy to allow anyone to insert destinations (for now - can be restricted later)
CREATE POLICY "Anyone can create destinations" 
ON public.destinations 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_destinations_updated_at
  BEFORE UPDATE ON public.destinations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for destination images
INSERT INTO storage.buckets (id, name, public) VALUES ('destinations', 'destinations', true);

-- Create storage policies for destination images
CREATE POLICY "Destination images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'destinations');

CREATE POLICY "Anyone can upload destination images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'destinations');

CREATE POLICY "Anyone can update destination images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'destinations');