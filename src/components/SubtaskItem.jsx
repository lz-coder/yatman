import { useState } from "react";

export default function SubtaskItem({ task, onCompleted }) {
  const [completed, setCompleted] = useState(task.completed);

  return (
    <div key={task.id}>
      <input
        type="checkbox"
        className="mr-1"
        checked={completed}
        onChange={(e) => {
          task.completed = e.target.checked;
          setCompleted(task.completed);
          if (task.completed) {
            setTimeout(() => onCompleted(), 250);
          }
        }}
      ></input>
      <span>{task.name}</span>
    </div>
  );
}
