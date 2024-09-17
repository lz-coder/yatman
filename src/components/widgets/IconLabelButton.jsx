import IconButton from "./IconButton";

export default function IconLabelButton({
  label,
  icon,
  className,
  showLabel = true,
  showIcon = true,
  vAlign = false,
  onClick,
}) {
  return (
    <IconButton
      className={className}
      icon={icon}
      showIcon={showIcon}
      vAlign={vAlign}
      onClick={onClick}
    >
      {showLabel && label}
    </IconButton>
  );
}
