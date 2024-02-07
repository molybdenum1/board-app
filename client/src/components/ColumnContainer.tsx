import { Column } from "../types";

interface Props {
  column: Column;
}

function ColumnContainer(props: Props) {
  const { column } = props;
  return (
    <div className="bg-columnBackgroungColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col">
      <div
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
          >0</div>
          {column.title}
        </div>
      </div>
      <div className="flex flex-grow">Content</div>
    </div>
  );
}

export default ColumnContainer;