import ActionsToolbar from "../components/ActionsToolbar";
import ProjectGroupCreationModal from "../components/ProjectGroupCreationModal";
import { FaPlus, FaTrash, FaFolder, FaArrowsAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import Tile from "../components/Tile";
import GroupModel from "../models/group";

export default function InitialPage() {
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [mainStorage, setMainStorage] = useState([]);
  const [selectedTiles, setSelectedTiles] = useState([]);

  const [showActionNew, setShowActionNew] = useState(true);
  const [showActionDelete, setShowActionDelete] = useState(false);
  const [showActionGroup, setShowActionGroup] = useState(false);
  const [showActionMove, setShowActionMove] = useState(false);

  const actionsList = [
    {
      label: "New",
      icon: <FaPlus />,
      action: () => {
        setShowProjectModal(true);
      },
      show: showActionNew,
    },
    {
      label: "Delete",
      icon: <FaTrash />,
      action: () => {
        deleteSelectedTile();
      },
      show: showActionDelete,
    },
    {
      label: "Group",
      icon: <FaFolder />,
      action: () => {},
      show: showActionGroup,
    },
    {
      label: "Move",
      icon: <FaArrowsAlt />,
      action: () => {},
      show: showActionMove,
    },
  ];

  function createProjectGoup(item) {
    mainStorage.push(item);
  }

  function selectTileHandler(e, tileData) {
    const currentSelectedTiles = selectedTiles;

    let showActionGroup = true;
    let showActionDel = true;
    let showActionMove = true;

    if (e.target.checked) {
      currentSelectedTiles.push(tileData);
      setSelectedTiles(currentSelectedTiles);

      setShowActionNew(false);
    } else {
      const tileIndex = currentSelectedTiles.indexOf(tileData);
      currentSelectedTiles.splice(tileIndex, 1);
      setSelectedTiles(currentSelectedTiles);

      if (selectedTiles.length <= 0) {
        setShowActionNew(true);
        showActionDel = false;
        showActionGroup = false;
        showActionMove = false;
      }
    }

    if (selectedTiles.find((data) => data instanceof GroupModel)) {
      showActionGroup = false;
      showActionMove = false;
    }

    if (!mainStorage.find((data) => data instanceof GroupModel))
      showActionMove = false;

    setShowActionDelete(showActionDel);
    setShowActionGroup(showActionGroup);
    setShowActionMove(showActionMove);
  }

  function deleteSelectedTile() {
    setMainStorage(mainStorage.filter((item) => !selectedTiles.includes(item)));
    setSelectedTiles([]);
    setShowActionDelete(false);
    setShowActionGroup(false);
    setShowActionMove(false);
    setShowActionNew(true);
  }

  return (
    <div className="m-auto w-full max-w-7xl">
      <div className="flex justify-center">
        <ActionsToolbar actions={actionsList} />
      </div>
      <main className="flex flex-wrap justify-center gap-2 py-6 sm:justify-normal">
        {mainStorage.map((item) => {
          return (
            <Tile key={item.id} data={item} onCheckChange={selectTileHandler} />
          );
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
