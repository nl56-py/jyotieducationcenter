-- Update RLS policy for deleting leads to allow both super_admin and admin roles

-- 1. Drop the existing super_admin-only delete policy
DROP POLICY IF EXISTS leads_delete_super ON leads;

-- 2. Create a new policy allowing both super_admin and admin roles
CREATE POLICY leads_delete_staff ON leads 
  FOR DELETE TO authenticated
  USING (has_admin_role(ARRAY['super_admin'::admin_role, 'admin'::admin_role]));
