import IconLabelButton from "./widgets/IconLabelButton";

const ActionsToolbar = ({ actions }) => {
  const buttonStyleClasses =
    "hover:border-[2px] border-2 hover:border-slate-500 p-2 w-20 h-18";

  return (
    <div className="mt-10 inline-flex w-fit gap-2">
      {actions.map((action, index) => {
        if (action.show) {
          return (
            <IconLabelButton
              key={index}
              label={action.label}
              icon={action.icon}
              showLabel={true}
              vAlign={true}
              className={buttonStyleClasses}
              onClick={action.action}
            />
          );
        }
      })}
    </div>
  );
};

export default ActionsToolbar;
