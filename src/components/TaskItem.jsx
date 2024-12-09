import { useState, useRef } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import IconLabelButton from "./widgets/IconLabelButton";
import { FaPlus, FaTrash } from "react-icons/fa";
import TaskModel from "../models/task";
import SubtaskItem from "./SubtaskItem";
import InputBox from "./widgets/InputBox";

export default function TaskItem({
  task,
  onCompleted,
  deleteCallback,
  isNew = false,
}) {
  const [completed, setCompleted] = useState(task.completed);
  const [expanded, setExpanded] = useState(false);
  const [subtasksStorage, setSubtasksStorage] = useState(task.subtasks);

  const [inputTaskNameValue, setInputTaskNameValue] = useState(task.name);

  const inputTaskNamePreChangeValue = useRef(task.name);

  const expandedClasses = "rotate-180";

  function updateSubtasksStorage() {
    setSubtasksStorage(Array.of(...task.subtasks));
  }

  function inputTaskNameHandleBlur(e) {
    if (
      e.target.value.length <= 0 &&
      inputTaskNamePreChangeValue.current.length <= 0
    ) {
      return deleteCallback(task);
    } else if (
      e.target.value <= 0 &&
      inputTaskNamePreChangeValue.current.length > 0
    ) {
      task.name = inputTaskNamePreChangeValue.current;
      setInputTaskNameValue("task.name");
      console.log(inputTaskNameValue);
    }
  }

  function inputTaskNameHandleChange(e) {
    task.name = e.target.value;
  }

  function inputTaskNameHandleKeyUp(e) {
    if (e.code === "Enter") {
      e.target.blur();
    }
  }

  return (
    <div className="items-center bg-green-400 bg-opacity-70 shadow-md">
      <div
        className="flex cursor-pointer px-2 py-1"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="mr-1 flex w-fit items-center">
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
        <InputBox
          value={inputTaskNameValue}
          onChange={(e) => inputTaskNameHandleChange(e)}
          onBlur={(e) => inputTaskNameHandleBlur(e)}
          onKeyUp={(e) => inputTaskNameHandleKeyUp(e)}
          active={isNew}
        />
        <div className="ml-2 flex w-fit gap-4">
          <IoMdArrowDropdown
            size={28}
            onClick={() => setExpanded(!expanded)}
            className={`cursor-pointer hover:text-black ${expanded && expandedClasses}`}
          />
        </div>
      </div>
      {expanded && (
        <div className="px-2">
          <div className="mb-2 min-h-4 bg-green-300 py-6 text-center text-black">
            <InputBox value={task.desc} placeholder="Write a description..." />
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
