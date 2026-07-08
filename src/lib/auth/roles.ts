import { AdminRole } from "../supabase/types";

export type Permission = 
  | 'manage:users'      // Invite admins, change roles, suspend
  | 'manage:settings'   // Edit core site contact details
  | 'manage:content'    // Edit CMS pages, blogs, destinations, services, tests
  | 'read:leads'        // View student leads
  | 'manage:leads'      // Update lead status, assign counselor, edit notes
  | 'delete:leads'      // Delete student lead records
  | 'read:bookings'     // View consultation bookings
  | 'manage:bookings'   // Update bookings, schedule times
  | 'export:leads'      // Export lead CSV
  | 'manage:media';     // Upload and delete assets in media library

export const ROLE_PERMISSIONS: Record<AdminRole, Permission[]> = {
  super_admin: [
    'manage:users',
    'manage:settings',
    'manage:content',
    'read:leads',
    'manage:leads',
    'delete:leads',
    'read:bookings',
    'manage:bookings',
    'export:leads',
    'manage:media'
  ],
  admin: [
    'manage:settings',
    'manage:content',
    'read:leads',
    'manage:leads',
    'delete:leads',
    'read:bookings',
    'manage:bookings',
    'export:leads',
    'manage:media'
  ],
  editor: [
    'manage:content',
    'manage:media'
  ],
  counselor: [
    'read:leads',
    'manage:leads',
    'read:bookings',
    'manage:bookings'
  ],
  viewer: [
    'read:leads',
    'read:bookings'
  ]
};

export function hasPermission(role: AdminRole, permission: Permission): boolean {
  const permissions = ROLE_PERMISSIONS[role];
  return permissions ? permissions.includes(permission) : false;
}
