import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Column, Id, Task } from "../types";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "./TaskCard";
import { useMemo } from "react";

interface Props {
  column: Column;

  createTask: (columnId: Id) => void;
  deleteTask: (taskId: Id) => void;
  updateTask: (taskId: Id, title: string) => void;
  tasks: Task[];
}

function ColumnContainer(props: Props) {
  const { column, createTask, tasks, deleteTask, updateTask } = props;

  const tasksIds = useMemo(() => tasks.map(task => task.id), [tasks])

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
      bg-columnBackgroungColor
        w-[350px]
        h-[500px] 
        max-h-[500px]
        border-2
        border-rose-500 
        rounded-md 
        flex 
        opacity-40
        flex-col"
      />
    );
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-columnBackgroungColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
    >
      <div
        {...attributes}
        {...listeners}
        className="
        bg-mainBackgroundColor
            text-md h-[60px] 
            cursor-grab 
            rounded-md 
            rounded-b-none 
            p-3 font-bold 
            border-columnBackgroungColor 
            border-4
            flex
            items-center
            justify-between
        "
      >
        <div className="flex gap-2">
          <div
            className="
            flex
            justify-content
            items-center
            bg-columnBackgroungColor
            px-2
            py-1
            text-50
            rounded-full
            "
          >
            0
          </div>
          {column.title}
        </div>
      </div>
      <div
        className="flex
          flex-grow 
          flex-col 
          gap-4
          p-2
          overflow-x-hidden
          overflow-y-auto"
      >
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>
      <button
        className="
        flex
        gap-2
        items-center
        border-mainBackgroundColor
        bg-columnBackgroungColor
        border-2
        rounded-md
        p-4
        hover:text-rose-500
        hover:border-rose-500
      "
        onClick={() => createTask(column.id)}
      >
        Add task
      </button>
    </div>
  );
}

export default ColumnContainer;
