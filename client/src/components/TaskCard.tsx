import { useState } from "react";
import { Id, Task } from "../types";

interface Props {
  task: Task;
  deleteTask: (taskId: Id) => void;
}

function TaskCard(props: Props) {
  const { task, deleteTask } = props;

  const [mouseIsOver, setMouseIsOver] = useState(false);

  return (
    <div
      className="bg-mainBackgroundColor
      p-2.5
      h-[100px]
      min-h-[100px]
      items-center
      flex
      text-left
      rounded-xl
      hover:ring-2
      hover:ring-inset
      hover:ring-rose-500
      cursor-grab
      relative
    "
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      {task.title}
      {mouseIsOver && (
        <button
          className="absolute
            right-4 
            p-2 
            top-1/2-translate-y-1/2
            bg-columnBackgroungColor 
            rounded 
            hover:border-white-500
            opacity-60
            hover:opacity-100
            "
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>
      )}
    </div>
  );
}

export default TaskCard;
