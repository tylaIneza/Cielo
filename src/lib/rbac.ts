import { Role } from "@prisma/client";

export type Permission =
  | "manage:all"
  | "manage:admins"
  | "manage:products"
  | "manage:orders"
  | "manage:tailoring"
  | "manage:customers"
  | "manage:users"
  | "manage:settings"
  | "manage:cms"
  | "view:reports"
  | "view:orders"
  | "view:tailoring"
  | "view:customers"
  | "place:orders"
  | "submit:tailoring"
  | "update:tailoring_status";

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  SUPER_ADMIN: [
    "manage:all",
    "manage:admins",
    "manage:products",
    "manage:orders",
    "manage:tailoring",
    "manage:customers",
    "manage:users",
    "manage:settings",
    "manage:cms",
    "view:reports",
    "view:orders",
    "view:tailoring",
    "view:customers",
    "place:orders",
    "submit:tailoring",
    "update:tailoring_status",
  ],
  ADMIN: [
    "manage:products",
    "manage:orders",
    "manage:tailoring",
    "view:reports",
    "view:orders",
    "view:tailoring",
    "view:customers",
  ],
  MANAGER: [
    "manage:orders",
    "manage:customers",
    "view:orders",
    "view:customers",
    "view:reports",
  ],
  TAILOR: [
    "view:tailoring",
    "update:tailoring_status",
  ],
  CUSTOMER: [
    "place:orders",
    "submit:tailoring",
  ],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  const perms = ROLE_PERMISSIONS[role] ?? [];
  return perms.includes("manage:all") || perms.includes(permission);
}

export function canAccessAdmin(role: Role): boolean {
  const adminRoles: Role[] = ["SUPER_ADMIN", "ADMIN", "MANAGER", "TAILOR"];
  return adminRoles.includes(role);
}

export const ADMIN_ROLES: Role[] = ["SUPER_ADMIN", "ADMIN", "MANAGER", "TAILOR"];
