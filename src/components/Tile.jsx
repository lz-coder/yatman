import ProjectModel from "../models/project";
import GroupModel from "../models/group";

export default function Tile({ data }) {
  let bgColor;

  if (data instanceof GroupModel) bgColor = "bg-blue-300";
  if (data instanceof ProjectModel) bgColor = "bg-red-300";

  return <div className={`h-32 w-32 ${bgColor}`}></div>;
}
