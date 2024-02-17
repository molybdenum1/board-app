import { useMemo, useState } from "react";
import { Column, Id, Task } from "../types";
import "../App.css";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 1,
      title: "Title 1",
    },
    {
      id: 2,
      title: "title 2",
    },
    {
      id: 3,
      title: "title 3",
    },
  ]);

  const [tasks, setTasks] = useState<Task[] | []>([]);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const dragStart = (event: DragStartEvent) => {
    if (event?.active?.data?.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
  };
  const dragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;
    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnId
      );
      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnId
      );
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  };
  const createTask = (columnId: Id) => {
    const newTask: Task = {
      id: Math.random() * (1000 - 1) + 1,
      columnId,
      title: "New task",
      content: "",
    };

    setTasks([...tasks, newTask]);
  };
  const deleteTask = (taskId: Id) => {
    const newTasks = tasks.filter((task) => taskId !== task.id);
    setTasks(newTasks);
  };

  const updateTask = (tasksId: Id, title: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id != tasksId) return task;
      return {...task, title}
    })
    setTasks(newTasks);
  }

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext onDragStart={dragStart} onDragEnd={dragEnd}>
        <div className="m-auto flex gap-4">
          <div className="flex flex-row gap-4">
            <SortableContext items={columnsId}>
              {columns.map((column) => (
                <ColumnContainer
                  key={column.id}
                  column={column}
                  createTask={createTask}
                  tasks={tasks.filter((task) => task.columnId === column.id)}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              ))}
            </SortableContext>
          </div>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                createTask={createTask}
                tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}

export default KanbanBoard;
