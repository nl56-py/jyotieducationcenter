-- Create audit triggers for tracking row changes in sensitive tables

CREATE OR REPLACE FUNCTION public.audit_row_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_actor_user_id UUID;
  v_actor_email TEXT;
  v_action TEXT;
  v_before JSONB := NULL;
  v_after JSONB := NULL;
  v_claims JSONB;
BEGIN
  -- Get actor user_id from Supabase auth context
  v_actor_user_id := auth.uid();
  
  -- Resolve actor email
  IF v_actor_user_id IS NOT NULL THEN
    SELECT email INTO v_actor_email FROM admin_users WHERE user_id = v_actor_user_id;
    IF v_actor_email IS NULL THEN
      -- Fallback to JWT email claim
      BEGIN
        v_claims := current_setting('request.jwt.claims', true)::jsonb;
        v_actor_email := v_claims ->> 'email';
      EXCEPTION WHEN OTHERS THEN
        v_actor_email := 'authenticated_user';
      END;
    END IF;
  ELSE
    v_actor_email := 'system';
  END IF;

  -- Detect Operation Type
  IF TG_OP = 'INSERT' THEN
    v_action := 'INSERT';
    v_after := to_jsonb(NEW);
  ELSIF TG_OP = 'UPDATE' THEN
    v_action := 'UPDATE';
    v_before := to_jsonb(OLD);
    v_after := to_jsonb(NEW);
    
    -- Optimize audit log size: only store changed fields if needed, but a complete record is standard.
    -- Let's mask password or sensitive fields if any exist. None in current schemas, but good practice.
  ELSIF TG_OP = 'DELETE' THEN
    v_action := 'DELETE';
    v_before := to_jsonb(OLD);
  END IF;

  -- Write to audit logs
  INSERT INTO audit_logs (
    actor_user_id,
    actor_email,
    action,
    entity_table,
    entity_id,
    before,
    after
  ) VALUES (
    v_actor_user_id,
    v_actor_email,
    v_action,
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    v_before,
    v_after
  );

  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Apply Triggers
CREATE TRIGGER audit_admin_users
  AFTER INSERT OR UPDATE OR DELETE ON admin_users
  FOR EACH ROW EXECUTE FUNCTION public.audit_row_change();

CREATE TRIGGER audit_leads
  AFTER INSERT OR UPDATE OR DELETE ON leads
  FOR EACH ROW EXECUTE FUNCTION public.audit_row_change();

CREATE TRIGGER audit_consultation_bookings
  AFTER INSERT OR UPDATE OR DELETE ON consultation_bookings
  FOR EACH ROW EXECUTE FUNCTION public.audit_row_change();

CREATE TRIGGER audit_site_settings
  AFTER INSERT OR UPDATE OR DELETE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION public.audit_row_change();

CREATE TRIGGER audit_pages
  AFTER INSERT OR UPDATE OR DELETE ON pages
  FOR EACH ROW EXECUTE FUNCTION public.audit_row_change();

CREATE TRIGGER audit_blog_posts
  AFTER INSERT OR UPDATE OR DELETE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.audit_row_change();

CREATE TRIGGER audit_destinations
  AFTER INSERT OR UPDATE OR DELETE ON destinations
  FOR EACH ROW EXECUTE FUNCTION public.audit_row_change();

CREATE TRIGGER audit_redirects
  AFTER INSERT OR UPDATE OR DELETE ON redirects
  FOR EACH ROW EXECUTE FUNCTION public.audit_row_change();
