import { navItems } from "../data/site.js";

export function normalizePath(pathname) {
  const path = pathname.replace(/\/+$/, "");
  return path || "/";
}

export function flattenNav(items = navItems) {
  return items.flatMap((item) => [item, ...(item.children || [])]);
}
