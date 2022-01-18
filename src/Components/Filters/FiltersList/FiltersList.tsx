import { useInventory } from "../../Provider/InventoryProvider";
import FilterItem from "../FilterItem/FilterItem";

const FiltersList = () => {
  const { filters } = useInventory();

  return (
    <div className="p-5 shadow-lg mb-10 rounded-lg grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5">
      {filters.length > 0 &&
        filters.map((filter) => <FilterItem key={filter.id} filter={filter} />)}
    </div>
  );
};

export default FiltersList;