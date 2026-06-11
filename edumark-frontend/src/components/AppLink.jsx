export function AppLink({ to, children, navigate, className = "", onClick }) {
  return (
    <button
      className={className}
      type="button"
      onClick={(event) => {
        onClick?.(event);
        navigate(to);
      }}
    >
      {children}
    </button>
  );
}
