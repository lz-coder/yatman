import ActionsToolbar from "../components/ActionsToolbar";
import ProjectGroupCreationModal from "../components/ProjectGroupCreationModal";
import { FaPlus, FaTrash, FaFolder, FaArrowsAlt } from "react-icons/fa";
import { useState } from "react";
import Tile from "../components/Tile";

export default function InitialPage() {
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [mainStorage, setMainStorage] = useState([]);

  const actionsList = [
    {
      label: "New",
      icon: <FaPlus />,
      action: () => {
        setShowProjectModal(true);
      },
      show: true,
    },
    { label: "Delete", icon: <FaTrash />, action: () => {}, show: false },
    { label: "Group", icon: <FaFolder />, action: () => {}, show: false },
    { label: "Move", icon: <FaArrowsAlt />, action: () => {}, show: false },
  ];

  function createProjectGoup(item) {
    mainStorage.push(item);
    console.log(mainStorage);
  }

  return (
    <div className="m-auto w-full max-w-7xl">
      <div className="flex justify-center">
        <ActionsToolbar actions={actionsList} />
      </div>
      <main className="flex flex-wrap justify-center gap-2 py-6 sm:justify-normal">
        {mainStorage.map((item, index) => {
          return <Tile key={index} data={item} />;
        })}
      </main>

      {showProjectModal && (
        <ProjectGroupCreationModal
          title="New Project or Group"
          closeHandler={() => setShowProjectModal(false)}
          creationHandler={createProjectGoup}
        />
      )}
    </div>
  );
}
