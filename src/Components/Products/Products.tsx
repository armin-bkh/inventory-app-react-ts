import { useInventoryActions } from "../Provider/InventoryProvider";
import ProductForm from "./ProductForm/ProductForm";

const Products = () => {
    const { addProductHandler } = useInventoryActions();

    const submitAddHandler = (product: { name: string, filter: string }) => {
        addProductHandler(product);
    }

    return (
        <section className="p-3 mt-10 shadow-inner rounded-xl bg-white">
            <ProductForm handleAdd={submitAddHandler} />
        </section>
    )
}

export default Products;