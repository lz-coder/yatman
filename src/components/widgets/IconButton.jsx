export default function IconButton({ icon, className, showIcon = true }) {
  return (
    <button className={className}>
      {showIcon && icon}
      <slot></slot>
    </button>
  );
}
