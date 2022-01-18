import { useInventory } from "../../Provider/InventoryProvider"
import { filteredProducts } from "../../Utils/filteredProducts";

const ProductsList = () => {
    const { filters, products } = useInventory();
    return (
        <section className="p-5 shadow-lg rounded-lg mb-10">
            {
                filters.length > 0 && filters.map(filter => <div key={filter.id}>
                    {filter.label}
                    <ul>{filteredProducts(products, filter.value).map(product => <li key={product.id}>{product.name}</li>)}</ul>
                </div>) 
            }
        </section>
    ) 
}
export default ProductsList