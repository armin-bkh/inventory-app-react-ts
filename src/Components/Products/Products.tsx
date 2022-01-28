import { useState } from "react";
import { useToasts } from "react-toast-notifications";
import {
  useInventory,
  useInventoryActions,
} from "../Provider/InventoryProvider";
import ShowButton from "../ShowButton/ShowButton";
import ProductForm from "./ProductForm/ProductForm";
import ProductsList from "./ProductsList/ProductsList";

const Products = () => {
  const [edit, setEdit] = useState<number | null>(null);
  const [isShow, setIsShow] = useState<boolean>(false);
  const { products, filters } = useInventory();
  const { addProductHandler, editProductHandler } = useInventoryActions();
  const { addToast } = useToasts();

  const setEditHandler = (id: number) => {
    setEdit(id);
    setIsShow(true);
  };

  const submitAddHandler = (product: { name: string; filter: string }) => {
    addProductHandler(product);
    addToast(`${product.name} successfuly added to ${product.filter}'s`, {
      appearance: "success",
    });
    setIsShow(false);
  };

  const submitEditHandler = (product: { name: string; filter: string }) => {
    if (edit) editProductHandler(edit, product);
    addToast(`${product.name} successfuly edited`, { appearance: "success" });
    setIsShow(false);
  };

  const showHandler = () => {
    setIsShow((prevIsShow) => !prevIsShow);
    setEdit(null);
  };

  return filters.length > 0 ? (
    <section className="p-3 mt-10 shadow-inner rounded-xl bg-white">
      {products.length > 0 && <ProductsList onEdit={setEditHandler} />}
      {(products.length === 0 || isShow) && (
        <ProductForm
          id={edit}
          handleAdd={submitAddHandler}
          handleEdit={submitEditHandler}
        />
      )}
      {products.length > 0 && (
        <ShowButton product show={isShow} setShow={showHandler} />
      )}
    </section>
  ) : null;
};

export default Products;
