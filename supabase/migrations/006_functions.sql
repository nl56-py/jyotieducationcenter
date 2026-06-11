-- Create database functions for admin role checking and user-facing workflows

-- Helper to get the current admin role
CREATE OR REPLACE FUNCTION public.current_admin_role()
RETURNS admin_role
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM admin_users WHERE user_id = auth.uid() AND status = 'active';
$$;

-- Helper to check if user is any active admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND status = 'active'
  );
$$;

-- Helper to check if user has one of the specified roles
CREATE OR REPLACE FUNCTION public.has_admin_role(required_roles admin_role[])
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = auth.uid() 
      AND status = 'active' 
      AND role = ANY(required_roles)
  );
$$;
