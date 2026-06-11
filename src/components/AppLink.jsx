import Link from "next/link";

export function AppLink({ to, children, className = "", onClick }) {
  if (to && to.startsWith("#")) {
    return (
      <a href={to} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={to || "/"} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
