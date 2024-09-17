export default function IconButton({
  icon,
  className,
  showIcon = true,
  children,
  vAlign = false,
  onClick,
}) {
  return (
    <button
      className={`flex items-center justify-center ${vAlign ? "flex-col" : "flex-row"} ${className}`}
      onClick={onClick}
    >
      {showIcon && icon}
      {children}
    </button>
  );
}
