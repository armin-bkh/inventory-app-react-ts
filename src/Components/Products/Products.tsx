import { useState } from "react";
import { useInventory, useInventoryActions } from "../Provider/InventoryProvider";
import ShowButton from "../ShowButton/ShowButton";
import ProductForm from "./ProductForm/ProductForm";
import ProductsList from "./ProductsList/ProductsList";

const Products = () => {
    const [ isShow, setIsShow] = useState<boolean>(false);
    const { products } = useInventory();
    const { addProductHandler } = useInventoryActions();

    const submitAddHandler = (product: { name: string, filter: string }) => {
        addProductHandler(product);
    }

    return (
        <section className="p-3 mt-10 shadow-inner rounded-xl bg-white">
            {products.length > 0 && <ProductsList />}
            {products.length === 0 || isShow && <ProductForm handleAdd={submitAddHandler} />}
            {products.length > 0 && <ShowButton product show={isShow} setShow={()=> setIsShow(prevIsShow => !prevIsShow)} />}
        </section>
    )
}

export default Products;