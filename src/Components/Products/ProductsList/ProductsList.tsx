import { useInventory } from "../../Provider/InventoryProvider";
import ProductItem from "../ProductItem/ProductItem";

const ProductsList = () => {
    const { filters } = useInventory();
    return (
        <section className="p-5 shadow-lg rounded-lg mb-10 grid grid-cols-1 md:gird-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filters.length > 0 && filters.map(filter => <ProductItem key={filter.id} filter={filter} />)}
        </section>
    ) 
}
export default ProductsList