import ProjectModel from "../models/project";
import GroupModel from "../models/group";
import { FaBox, FaFolder } from "react-icons/fa";

export default function Tile({ data, onCheckChange }) {
  let tileStyleClasses = `bg-${data.background}-300 border-${data.background}-300 hover:border-${data.background}-400`;
  let isGroup = data instanceof GroupModel;
  let isProject = data instanceof ProjectModel;

  let tileIcon;
  let tileIconsSize = 22;
  isGroup && (tileIcon = <FaFolder size={tileIconsSize} />);
  isProject && (tileIcon = <FaBox size={tileIconsSize} />);

  return (
    <div
      className={`relative h-32 w-32 border-2 border-solid ${tileStyleClasses} cursor-pointer`}
    >
      <input
        type="checkbox"
        className="absolute left-1 top-1"
        onChange={(e) => onCheckChange(e, data)}
      ></input>
      <div className="absolute right-1 top-0 text-white">{tileIcon}</div>
      <p className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-center text-gray-200">
        {data.name}
      </p>
    </div>
  );
}
