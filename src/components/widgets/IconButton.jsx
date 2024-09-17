export default function IconButton({ icon, className }) {
  return (
    <button className={className}>
      {icon}
      <slot></slot>
    </button>
  );
}
