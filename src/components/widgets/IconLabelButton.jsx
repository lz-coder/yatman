import IconButton from "./IconButton";

export default function IconLabelButton({
  label,
  icon,
  className,
  showLabel = true,
  showIcon = true,
}) {
  return (
    <IconButton className={className} icon={icon} showIcon={showIcon}>
      {showLabel && label}
    </IconButton>
  );
}
