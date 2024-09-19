import { useState, useRef } from "react";
import Modal from "./Modal";
import RadioOption from "./widgets/RadioOption";
import ProjectModel from "../models/project";
import GroupModel from "../models/group";

export default function ProjectGroupCreationModal({
  title,
  closeHandler,
  creationHandler,
  groupMode = false,
  selectedItems,
}) {
  const [createType, setCreateType] = useState(groupMode ? "group" : "project");
  const [itemName, setItemName] = useState("");

  console.log(groupMode);

  function handleCreationType(e) {
    setCreateType(e.target.value);
  }

  function createItem() {
    let itemToCreate;
    if (createType === "project" && itemName.trim().length > 0) {
      itemToCreate = new ProjectModel(
        itemName,
        "red",
        "default",
        new Date(),
        null,
      );
    } else if (createType === "group" && itemName.trim().length > 0) {
      itemToCreate = new GroupModel(
        itemName,
        "blue",
        "default",
        new Date(),
        null,
      );
      if (groupMode && selectedItems) itemToCreate.items = selectedItems;
    }

    if (itemToCreate) {
      creationHandler(itemToCreate, groupMode);
      closeHandler();
    }
  }

  function keyupHandler(evt) {
    if (evt.key == "Enter") {
      createItem();
    }
  }

  return (
    <Modal title={title} closeHandler={closeHandler} onKeyUp={keyupHandler}>
      <div>
        {!groupMode && (
          <div className="flex items-center justify-center gap-2">
            <RadioOption
              label="New Project"
              radioName="itemType"
              id="radio_project_option"
              value="project"
              onChange={handleCreationType}
              selected={true}
            />
            <RadioOption
              label="New Group"
              radioName="itemType"
              id="radio_group_option"
              value="group"
              onChange={handleCreationType}
            />
          </div>
        )}
        <div className="my-4">
          <div className="flex flex-col">
            <label>{createType} name</label>
            <input
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="text-black"
              type="text"
            ></input>
          </div>
        </div>
        <div className="mt-8 text-center">
          <button
            className="bg-green-600 px-3 py-1 hover:bg-green-400"
            onClick={() => createItem()}
          >
            Create {createType}
          </button>
        </div>
      </div>
    </Modal>
  );
}
