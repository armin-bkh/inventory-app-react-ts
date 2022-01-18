import { filters } from "../../Provider/InventoryProvider.type";
import { useInventory } from "../../Provider/InventoryProvider";
import { filterCount } from "../../Utils/filterCount";
import { AiTwotoneDelete, AiFillEdit } from "react-icons/ai";
import { useState } from "react";

interface filterItemProps {
  filter: filters;
}

const FilterItem = ({ filter }: filterItemProps) => {
  const [isShow, setIsShow] = useState(false);
  const { products } = useInventory();

  return (
    <div
      className="relative p-3 rounded-md flex flex-col items-center bg-green-400 overflow-hidden"
      onClick={() => setIsShow((prevIsShow) => !prevIsShow)}
      onMouseLeave={() => setIsShow(false)}
    >
      {filter.label}
      <span className="w-12 h-12 rounded-full bg-green-800 text-white mt-2 flex justify-center items-center">
        {filterCount(products, filter.value)}
      </span>
      <div
        className={`absolute h-1/2 w-full transition-all bg-white bg-opacity-75 flex justify-evenly items-center ${
          isShow ? "bottom-0" : "-bottom-full"
        }`}
      >
        <button
         type="button"
        className="text-lg w-7 h-7 flex justify-center items-center border
         border-violet-400 bg-violet-200 text-violet-500 rounded-full"
         onClick={()=> {}}>
          <AiFillEdit />
        </button>
        <button
         type="button"
        className="text-lg w-7 h-7 flex justify-center items-center border
         border-red-400 bg-red-200 text-red-500 rounded-full"
         onClick={()=> {}}>
          <AiTwotoneDelete />
        </button>
      </div>
    </div>
  );
};

export default FilterItem;
