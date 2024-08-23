import IconMenu from "./icon-menu";
import { Cat } from "lucide-react";

const defaultBorder = true;

interface borderProps {
  hasBorder?: boolean;
}

const SuchEmpty = (Props: borderProps) => {

  const hasBorder = Props.hasBorder ?? defaultBorder;

  let style = "p-3 m-1.5 shadow border-2 rounded flex flex-col justify-center items-center";
  if (!hasBorder) {
    style = "p-3 m-1.5 flex flex-col justify-center items-center";
  }

  return (
    <div className={style}>
      <IconMenu
        className="text-gray-400"
        text="Wow! Such Empty"
        icon={<Cat className="h-10 w-10 text-gray-300 " />}
      />
    </div>
  );
};

export default SuchEmpty;
