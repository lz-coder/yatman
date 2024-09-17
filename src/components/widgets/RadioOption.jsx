const RadioOption = ({ label, radioName, id, value, onChange, selected }) => {
  return (
    <span>
      <label htmlFor={id} className="mr-1">
        {label}
      </label>
      <input
        id={id}
        type="radio"
        name={radioName}
        value={value}
        onChange={onChange}
        defaultChecked={selected}
      ></input>
    </span>
  );
};

export default RadioOption;
