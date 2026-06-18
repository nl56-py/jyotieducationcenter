"use client";
import { useRouter } from "next/navigation";

export function AppLink({ to, children, className = "", onClick, navigate, ...props }) {
  const router = useRouter();

  const handleLinkClick = (e) => {
    if (onClick) {
      onClick(e);
    }

    // Check if this is a standard left-click without modifier keys (like Ctrl/Cmd for new tab)
    if (
      to &&
      !to.startsWith("#") &&
      !to.startsWith("http") &&
      e.button === 0 &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.shiftKey &&
      !e.altKey
    ) {
      e.preventDefault();
      router.push(to);
    }
  };

  if (to && to.startsWith("#")) {
    return (
      <a href={to} className={className} onClick={onClick} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={to || "/"} className={className} onClick={handleLinkClick} {...props}>
      {children}
    </a>
  );
}
