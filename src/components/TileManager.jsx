import ActionsToolbar from "../components/ActionsToolbar";
import ProjectGroupCreationModal from "../components/ProjectGroupCreationModal";
import { FaPlus, FaTrash, FaFolder, FaArrowsAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import Tile from "../components/Tile";
import GroupModel from "../models/group";
import ConfirmationDialog from "../components/ConfirmationDialog";
import TileViewer from "../components/TileViewer";
import TasksManager from "./TasksManager";

export default function TileManager({
  tilesStorage,
  onGroup = false,
  groupItem,
}) {
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [modalGroupMode, setModalGroupMode] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const [mainStorage, setMainStorage] = useState(tilesStorage);
  const [selectedTiles, setSelectedTiles] = useState([]);

  const [showActionNew, setShowActionNew] = useState(true);
  const [showActionDelete, setShowActionDelete] = useState(false);
  const [showActionGroup, setShowActionGroup] = useState(false);
  const [showActionMove, setShowActionMove] = useState(false);

  const [showTileViewer, setShowTileViewer] = useState(false);
  const [tileToShow, setTileToShow] = useState(null);

  const [showTasksManager, setShowTasksManager] = useState(false);
  const [projectToManage, setProjectToManage] = useState(null);

  const actionsList = [
    {
      label: "New",
      icon: <FaPlus />,
      action: () => {
        setModalGroupMode(false);
        setShowProjectModal(true);
      },
      show: showActionNew,
    },
    {
      label: "Delete",
      icon: <FaTrash />,
      action: () => {
        setShowDeleteConfirmation(true);
      },
      show: showActionDelete,
    },
    {
      label: "Group",
      icon: <FaFolder />,
      action: () => {
        setModalGroupMode(true);
        setShowProjectModal(true);
      },
      show: !onGroup && showActionGroup,
    },
    {
      label: "Move",
      icon: <FaArrowsAlt />,
      action: () => {},
      show: showActionMove,
    },
  ];

  function createProjectGroup(tile, groupMode = false) {
    let currentStorage = mainStorage;

    if (groupMode) {
      currentStorage = mainStorage.filter(
        (item) => !selectedTiles.includes(item),
      );
      setSelectedTiles([]);
      resetActions();
    }

    currentStorage.push(tile);
    setMainStorage(currentStorage);
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
    tilesStorage = mainStorage.filter((item) => !selectedTiles.includes(item));
    if (onGroup) groupItem.items = tilesStorage;
    setMainStorage(tilesStorage);
    setSelectedTiles([]);
    resetActions();
  }

  function onTileDropped(data) {
    setMainStorage(mainStorage.filter((item) => item.id !== data.id));
    if (selectedTiles.length > 0) {
      selectedTiles.splice(selectedTiles.indexOf(data), 1);
      setSelectedTiles(selectedTiles);
    }
    if (selectedTiles.length <= 0) resetActions();
  }

  function resetActions() {
    setShowActionNew(true);
    setShowActionDelete(false);
    setShowActionGroup(false);
    setShowActionMove(false);
  }

  return (
    <div className={`${!onGroup && "m-auto"} w-full max-w-7xl`}>
      <div className="flex justify-center">
        <ActionsToolbar actions={actionsList} className={onGroup && "!mt-1"} />
      </div>
      <main className="flex flex-wrap justify-center gap-2 py-6 sm:justify-normal">
        {mainStorage.map((item) => {
          return (
            <Tile
              key={item.id}
              data={item}
              onCheckChange={selectTileHandler}
              onDropped={onTileDropped}
              onGroup={onGroup}
              onClick={
                item instanceof GroupModel
                  ? () => {
                      setTileToShow(item);
                      setShowTileViewer(true);
                    }
                  : () => {
                      setProjectToManage(item);
                      setShowTasksManager(true);
                    }
              }
            />
          );
        })}
      </main>

      {showProjectModal && (
        <ProjectGroupCreationModal
          title={modalGroupMode ? "New Group" : "New Project or Group"}
          closeHandler={
            modalGroupMode
              ? () => setShowProjectModal(false)
              : () => {
                  setModalGroupMode(false);
                  setShowProjectModal(false);
                }
          }
          creationHandler={createProjectGroup}
          groupMode={modalGroupMode}
          selectedItems={selectedTiles}
          onGroup={onGroup}
        />
      )}

      {showDeleteConfirmation && (
        <ConfirmationDialog
          title="Items removal confirmation!"
          message="You are sure that confirm this action?"
          isDestructive={true}
          confirmationCallback={() => {
            deleteSelectedTile();
            setShowDeleteConfirmation(false);
          }}
          closeDialogCallback={() => setShowDeleteConfirmation(false)}
        />
      )}

      {showTileViewer && (
        <TileViewer
          tile={tileToShow}
          closeCallback={() => setShowTileViewer(false)}
        />
      )}

      {showTasksManager && (
        <TasksManager
          project={projectToManage}
          closeCallback={() => setShowTasksManager(false)}
        />
      )}
    </div>
  );
}
