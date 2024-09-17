export default function IconButton({
  icon,
  className,
  showIcon = true,
  children,
}) {
  return (
    <button className={className}>
      {showIcon && icon}
      {children}
    </button>
  );
}
