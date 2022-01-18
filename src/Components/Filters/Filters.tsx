import { useState } from "react";
import {
  useInventory,
  useInventoryActions,
} from "../Provider/InventoryProvider";
import { filters } from "../Provider/InventoryProvider.type";
import ShowButton from "../ShowButton/ShowButton";
import FilterForm from "./FilterForm/FilterForm";
import FiltersList from "./FiltersList/FiltersList";

const Filters = () => {
  const { filters } = useInventory();
  const [isShow, setIsShow] = useState<boolean>(false);
  const [edit, setEdit] = useState<number | null>(null);
  const { removeFilterHandler, editFilterHandler, addFilterHandler } = useInventoryActions();

  const setEditHandler = (id: number) => {
      setIsShow(true);
      setEdit(id);
  };

  const submitEditHandler = (filter: string) => {
    if (edit) editFilterHandler(edit, filter);
    setEdit(null);
    setIsShow(false);
  };

  const submitAddHandler = (filter: string) => {
    addFilterHandler(filter);
    setIsShow(false);
  }

  const showHandler = () => {
    setIsShow(prevIsShow => !prevIsShow);
    setEdit(null);
  }

  return (
    <section className="shadow-inner p-3 rounded-xl bg-white">
      {filters.length > 0 && (
        <FiltersList onDelete={removeFilterHandler} onEdit={setEditHandler} />
      )}
      {(filters.length === 0 || isShow) && <FilterForm id={edit} handleEdit={submitEditHandler} handleAdd={submitAddHandler} />}
      {filters.length > 0 && <ShowButton
        show={isShow}
        setShow={showHandler}
        filter
      />}
    </section>
  );
};

export default Filters;
