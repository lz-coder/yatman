import ProjectModel from "../models/project";
import GroupModel from "../models/group";
import { FaBox, FaFolder } from "react-icons/fa";

export default function Tile({ data, onCheckChange, onDropped }) {
  let tileStyleClasses;
  // const tileStyleClasses = `bg-${data.background}-300 border-${data.background}-300 hover:border-${data.background}-400`;
  let isGroup = data instanceof GroupModel;
  let isProject = data instanceof ProjectModel;

  isGroup &&
    (tileStyleClasses = `bg-blue-300 border-blue-300 hover:border-blue-400`);

  isProject &&
    (tileStyleClasses = `bg-red-300 border-red-300 hover:border-red-400`);

  let tileIcon;
  let tileIconsSize = 22;
  isGroup && (tileIcon = <FaFolder size={tileIconsSize} />);
  isProject && (tileIcon = <FaBox size={tileIconsSize} />);

  const year = data.creationDate.getFullYear();
  const month = String(data.creationDate.getMonth() + 1).padStart(2, "0");
  const day = String(data.creationDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  const groupTileProps = isGroup
    ? { onDrop: dropHandler, onDragOver: dragoverHandler }
    : {};

  function dragStartHandler(ev) {
    const dataString = JSON.stringify(data);
    ev.dataTransfer.setData("application/json", dataString);
    ev.dataTransfer.dropEffect = "move";
  }

  function dragoverHandler(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
  }
  function dropHandler(ev) {
    ev.preventDefault();
    const dragData = ev.dataTransfer.getData("application/json");
    const tileObject = JSON.parse(dragData);

    const objectInstance = new ProjectModel(
      tileObject.name,
      tileObject.background,
      tileObject.icon,
      tileObject.creationDate,
      tileObject.updatedDate,
      tileObject.id,
    );

    data.items.push(objectInstance);
    onDropped(objectInstance);
  }

  return (
    <div
      className={`flex h-32 w-32 cursor-pointer flex-col justify-between border-2 border-solid p-1 ${tileStyleClasses}`}
      draggable={isProject}
      onDragStart={dragStartHandler}
      {...groupTileProps}
    >
      <div className="flex h-1/5 justify-between">
        <input type="checkbox" onChange={(e) => onCheckChange(e, data)}></input>
        <div className="text-white">{tileIcon}</div>
      </div>
      <div className="text-sm">
        <p>{isGroup && `projects: ${data.items.length}`}</p>
        <p>{`C: ${formattedDate}`}</p>
      </div>
      <p className="h-1/5 w-full bg-black bg-opacity-50 text-center text-gray-200">
        {data.name}
      </p>
    </div>
  );
}
