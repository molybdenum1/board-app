import { useSortable } from "@dnd-kit/sortable";
import { Column } from "../types";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  column: Column;
}

function ColumnContainer(props: Props) {
  const { column } = props;

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
      <div className="flex flex-grow">Content</div>
    </div>
  );
}

export default ColumnContainer;
