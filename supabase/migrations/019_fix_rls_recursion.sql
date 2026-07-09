-- Fix infinite RLS recursion by changing SQL functions to PL/pgSQL with SECURITY DEFINER
-- This ensures the functions run under the postgres superuser context and bypass RLS policy checks during query planning and execution.

-- 1. Helper to get the current admin role
CREATE OR REPLACE FUNCTION public.current_admin_role()
RETURNS admin_role
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_role admin_role;
BEGIN
  SELECT role INTO v_role 
  FROM admin_users 
  WHERE user_id = auth.uid() AND status = 'active';
  RETURN v_role;
END;
$$;

-- 2. Helper to check if user is any active admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_exists BOOLEAN;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = auth.uid() AND status = 'active'
  ) INTO v_exists;
  RETURN v_exists;
END;
$$;

-- 3. Helper to check if user has one of the specified roles
CREATE OR REPLACE FUNCTION public.has_admin_role(required_roles admin_role[])
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_exists BOOLEAN;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = auth.uid() 
      AND status = 'active' 
      AND role = ANY(required_roles)
  ) INTO v_exists;
  RETURN v_exists;
END;
$$;
