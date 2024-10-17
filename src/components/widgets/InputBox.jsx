import { useState, useRef, useEffect } from "react";
import Logger from "../../lib/logger";

const textAlignOptions = ["left", "center", "right"];

const logger = new Logger("InputBox", "");

export default function InputBox({
  value = "",
  placeholder = "",
  active = false,
  textAlign = "center",
}) {
  const [isActive, setIsActive] = useState(active);
  const [inputValue, setInputValue] = useState(value);

  const inputRef = useRef(null);

  const boxCssClasses = [];

  if (!textAlignOptions.includes(textAlign))
    throw new Error(
      logger
        .setField("textAlign")
        .setMessage(`prop value is not one of: [${textAlignOptions}]`, false),
    );

  boxCssClasses.push(`text-${textAlign}`);

  useEffect(() => {
    isActive && inputRef?.current.focus();
  }, [isActive]);

  function boxHandleClick(e) {
    setIsActive(true);
  }

  function inputHandleBlur(e) {
    setIsActive(false);
  }

  function inputHandleChange(e) {
    setInputValue(e.target.value);
  }

  return (
    <div
      className={`h-6 w-full text-black ${boxCssClasses}`}
      onClick={boxHandleClick}
    >
      {value.length <= 0 && placeholder.length > 0 && !isActive ? (
        <p>{placeholder}</p>
      ) : isActive ? (
        <input
          ref={inputRef}
          className={`w-full ${boxCssClasses}`}
          value={inputValue}
          onBlur={inputHandleBlur}
          onChange={inputHandleChange}
        ></input>
      ) : (
        <p>{value}</p>
      )}
    </div>
  );
}
