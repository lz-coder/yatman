import { useState } from "react";
/**
 * TextBox
 * * TextBox component
 * TODO: implement TextClassName;
 * TODO: we should be able to disable the activation on click;
 * @param className component list of CSS classes
 * @param value component value
 * @param onChange Function
 * @param onClick Function
 * @param disabled Boolean
 * @param autoFocus Boolean
 */

export default function TextBox({
  className,
  value,
  onChange = () => {},
  onBlur = () => {},
  onClick = () => {},
  disabled = false,
  autoFocus = false,
  onKeyUp = () => {},
}) {
  const [inputIsDisabled, setInputIsDisabled] = useState(disabled);

  const defaultClasses = "w-full text-center font-bold";

  return (
    <div
      className={`${defaultClasses} ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        setInputIsDisabled(false);
        onClick(e);
      }}
    >
      {!inputIsDisabled ? (
        <input
          type="text"
          className={`${defaultClasses} bg-transparent focus:border-b-2 focus:outline-none ${className}`}
          value={value}
          autoFocus={autoFocus}
          onBlur={(e) => {
            setInputIsDisabled(true);
            onBlur(e);
          }}
          onChange={(e) => onChange(e)}
          onKeyUp={(e) => onKeyUp(e)}
        />
      ) : (
        <p>{value}</p>
      )}
    </div>
  );
}
