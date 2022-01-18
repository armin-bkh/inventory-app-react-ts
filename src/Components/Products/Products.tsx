import { useInventory, useInventoryActions } from "../Provider/InventoryProvider";
import ProductForm from "./ProductForm/ProductForm";
import ProductsList from "./ProductsList/ProductsList";

const Products = () => {
    const { products } = useInventory();
    const { addProductHandler } = useInventoryActions();

    const submitAddHandler = (product: { name: string, filter: string }) => {
        addProductHandler(product);
    }

    return (
        <section className="p-3 mt-10 shadow-inner rounded-xl bg-white">
            {products.length > 0 && <ProductsList />}
            <ProductForm handleAdd={submitAddHandler} />
        </section>
    )
}

export default Products;