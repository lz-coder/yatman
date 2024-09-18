import { useState, useRef } from "react";
import Modal from "./Modal";
import RadioOption from "./widgets/RadioOption";
import ProjectModel from "../models/project";
import GroupModel from "../models/group";

export default function ProjectGroupCreationModal({
  title,
  closeHandler,
  creationHandler,
}) {
  const [createType, setCreateType] = useState("project");
  const [itemName, setItemName] = useState("");

  function handleCreationType(e) {
    setCreateType(e.target.value);
  }
  return (
    <Modal title={title} closeHandler={closeHandler}>
      <div>
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
            onClick={() => {
              let itemToCreate;
              if (createType === "project" && itemName.trim().length > 0) {
                itemToCreate = new ProjectModel(itemName, "red", "default");
              } else if (createType === "group" && itemName.trim().length > 0) {
                itemToCreate = new GroupModel(itemName, "blue", "default");
              }

              if (itemToCreate) {
                creationHandler(itemToCreate);
                closeHandler();
              }
            }}
          >
            Create {createType}
          </button>
        </div>
      </div>
    </Modal>
  );
}
