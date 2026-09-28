-- Fix Row Level Security (RLS) policies for Products and Admin Management
-- Run this in Supabase SQL Editor to allow adding, editing, and deleting products

-- 1. PRODUCTS TABLE POLICIES
DROP POLICY IF EXISTS "Anyone can view active products" ON public.products;
DROP POLICY IF EXISTS "Anyone can view products" ON public.products;
CREATE POLICY "Anyone can view products"
  ON public.products FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Admins can insert products" ON public.products;
DROP POLICY IF EXISTS "Anyone can insert products" ON public.products;
CREATE POLICY "Anyone can insert products"
  ON public.products FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can update products" ON public.products;
DROP POLICY IF EXISTS "Anyone can update products" ON public.products;
CREATE POLICY "Anyone can update products"
  ON public.products FOR UPDATE
  USING (true);

DROP POLICY IF EXISTS "Admins can delete products" ON public.products;
DROP POLICY IF EXISTS "Anyone can delete products" ON public.products;
CREATE POLICY "Anyone can delete products"
  ON public.products FOR DELETE
  USING (true);

-- 2. REVIEWS TABLE POLICIES (Allow all actions for demo & review submissions)
DROP POLICY IF EXISTS "Anyone can read reviews" ON public.reviews;
CREATE POLICY "Anyone can read reviews"
  ON public.reviews FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can create reviews" ON public.reviews;
DROP POLICY IF EXISTS "Anyone can create reviews" ON public.reviews;
CREATE POLICY "Anyone can create reviews"
  ON public.reviews FOR INSERT
  WITH CHECK (true);
