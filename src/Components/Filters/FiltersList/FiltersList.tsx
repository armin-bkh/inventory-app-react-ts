import { filters } from '../../Provider/InventoryProvider.type';
import { useInventory } from "../../Provider/InventoryProvider";
import FilterItem from "../FilterItem/FilterItem";

interface filtersListProps {
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const FiltersList = ({ onDelete, onEdit }: filtersListProps) => {
  const { filters } = useInventory();

  return (
    <div className="p-5 shadow-lg mb-10 rounded-lg grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5">
      {filters.length > 0 &&
        filters.map((filter) => <FilterItem key={filter.id} filter={filter} onDelete={()=> onDelete(filter.id)} onEdit={()=> onEdit(filter.id)} />)}
    </div>
  );
};

export default FiltersList;
