import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import IconLabelButton from "./widgets/IconLabelButton";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import TaskModel from "../models/task";
import SubtaskItem from "./SubtaskItem";

export default function TaskItem({ task, onCompleted, deleteCallback }) {
  const [completed, setCompleted] = useState(task.completed);
  const [expanded, setExpanded] = useState(false);
  const [subtasksStorage, setSubtasksStorage] = useState(task.subtasks);

  const expandedClasses = "rotate-180";

  function updateSubtasksStorage() {
    setSubtasksStorage(Array.of(...task.subtasks));
  }

  return (
    <div className="items-center bg-green-400 bg-opacity-70 shadow-md">
      <div
        className="flex cursor-pointer px-2 py-1"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="w-fit">
          <input
            type="checkbox"
            checked={completed}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => {
              task.completed = e.target.checked;
              setCompleted(task.completed);
              if (task.completed) {
                setTimeout(() => onCompleted(), 250);
              }
            }}
          ></input>
        </div>
        <div className="w-full text-center font-bold">{task.name}</div>
        <div className="flex w-fit gap-4">
          <IconLabelButton
            icon={<FaPen size={14} />}
            onClick={() => console.log("open task editor")}
            className="hover:text-blue-500"
          />
          <IoMdArrowDropdown
            size={28}
            onClick={() => setExpanded(!expanded)}
            className={`cursor-pointer hover:text-black ${expanded && expandedClasses}`}
          />
        </div>
      </div>
      {expanded && (
        <div className="px-2">
          <div className="mb-2 bg-green-300 py-1 text-center text-black">
            <p>{task.desc}</p>
          </div>
          {subtasksStorage.length > 0 && (
            <div className="ml-2">
              {subtasksStorage
                .filter((rawSubtask) => !rawSubtask.completed)
                .map((subtask) => {
                  return (
                    <SubtaskItem
                      key={subtask.id}
                      task={subtask}
                      onCompleted={updateSubtasksStorage}
                    />
                  );
                })}
            </div>
          )}

          <div className="mt-2 flex justify-between px-1">
            <IconLabelButton
              label="add subtask"
              icon={<FaPlus />}
              onClick={() => {
                task.addSubtask(new TaskModel("subtask", "", false));
                updateSubtasksStorage();
              }}
            />
            <IconLabelButton
              label="delete"
              icon={<FaTrash />}
              onClick={() => deleteCallback(task)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
