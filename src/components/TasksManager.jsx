import { FaPlus } from "react-icons/fa";
import Modal from "./Modal";
import ActionsToolbar from "./ActionsToolbar";
import { useState } from "react";
import TaskModel from "../models/task";
import TaskItem from "./TaskItem";

export default function TasksManager({ project, closeCallback }) {
  const [tasksStorage, setTasksStorage] = useState(project.tasks);

  const actionsList = [
    {
      label: "New Task",
      icon: <FaPlus />,
      action: () => {
        project.addTask(new TaskModel("task", "just a simple task", false));
        updateTasksStorage();
      },
      show: true,
    },
  ];

  function updateTasksStorage() {
    setTasksStorage(Array.of(...project.tasks));
  }

  return (
    <Modal
      title={project.name}
      closeHandler={closeCallback}
      dialogClasses="md:!w-full h-4/6"
    >
      <div className="mb-2 flex items-center justify-center">
        <ActionsToolbar
          actions={actionsList}
          className="!mt-0"
          vAlignButtons={false}
        />
      </div>
      <div className="flex h-full flex-col gap-2 overflow-auto p-4">
        {tasksStorage
          .filter((rawTask) => !rawTask.completed)
          .map((task) => {
            return (
              <TaskItem
                key={task.id}
                task={task}
                onCompleted={updateTasksStorage}
              />
            );
          })}
      </div>
    </Modal>
  );
}
