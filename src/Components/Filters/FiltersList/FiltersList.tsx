import { useInventory } from "../../Provider/InventoryProvider";
import { filterCount } from "../../Utils/filterCount";

const FiltersList = () => {
    const { filters, products } = useInventory();
    return (
        <div className="p-5 shadow-lg mb-10 rounded-lg grid grid-cols-1 gap-5">
            {
                filters.length > 0 && filters.map(filter => <div className="p-3 rounded-md flex flex-col items-center bg-green-400" key={filter.id}>{filter.label}
                <span className="w-12 h-12 rounded-full bg-green-800 text-white mt-2 flex justify-center items-center">{filterCount(products, filter.value)}</span></div>) 
            }
        </div>
    )
}

export default FiltersList;