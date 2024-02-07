import { useState } from "react";
import { Column } from "../types";
import "../App.css";
import ColumnContainer from "./ColumnContainer";

function KanbanBoard() {
  const [columns] = useState<Column[]>([
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

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <div className="m-auto flex gap-4">
        <div className="flex flex-row gap-4">
          {columns.map((column) => (
            <ColumnContainer key={column.id} column={column} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default KanbanBoard;
