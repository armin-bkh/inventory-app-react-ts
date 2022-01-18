import { useInventoryActions } from "../Provider/InventoryProvider";
import ProductForm from "./ProductForm/ProductForm";

const Products = () => {
    const {  } = useInventoryActions();
    return (
        <section className="p-3 mt-10 shadow-inner rounded-xl bg-white">
            <ProductForm />
        </section>
    )
}

export default Products;