import { useState } from "react";
import { Id, Task } from "../types";

interface Props {
  task: Task;
  deleteTask: (taskId: Id) => void;
  updateTask: (taskId: Id, title: string) => void;
}

function TaskCard(props: Props) {
  const { task, deleteTask, updateTask } = props;

  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  }

  if (editMode) {
    return <div
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
  >
    <textarea className="
    h-[90%]
    w-full resize-none
    rounded bg-transparent
    text-white focus:outline-none
    "
    value={task.title}
    autoFocus
    placeholder="Task content here"
    onBlur={toggleEditMode}
    onKeyDown={(e) => {
      if (e.key === "Enter" && e.shiftKey) toggleEditMode();
    }}
    onChange={(e) => updateTask(task.id, e.target.value)}
    >

    </textarea>
  </div>
  }

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
      relative task
    "
      onClick={toggleEditMode}
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      <p className="my-auto h-[90%]
        w-full overflow-y-auto
        overflow-x-hidden
        whitespace-pre-wrap

      ">
        {task.title}
      </p>
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
