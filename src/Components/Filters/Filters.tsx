import { useState } from "react";
import { useToasts } from "react-toast-notifications";
import {
  useInventory,
  useInventoryActions,
} from "../Provider/InventoryProvider";
import ShowButton from "../ShowButton/ShowButton";
import FilterForm from "./FilterForm/FilterForm";
import FiltersList from "./FiltersList/FiltersList";

const Filters = () => {
  const { filters } = useInventory();
  const [isShow, setIsShow] = useState<boolean>(false);
  const [edit, setEdit] = useState<number | null>(null);
  const { removeFilterHandler, editFilterHandler, addFilterHandler } =
    useInventoryActions();
  const { addToast } = useToasts();

  const deleteHandler = (label: string, id: number) => {
    addToast(`${label} successfuly removed`, { appearance: "success" });
    removeFilterHandler(id);
  };

  const setEditHandler = (id: number) => {
    setIsShow(true);
    setEdit(id);
  };

  const submitEditHandler = (filter: string) => {
    addToast(`${filter} successfuly edited`, { appearance: "success" });
    if (edit) editFilterHandler(edit, filter);
    setEdit(null);
    setIsShow(false);
  };

  const submitAddHandler = (filter: string) => {
    addToast(`${filter} successfuly added`, { appearance: "success" });
    addFilterHandler(filter);
    setIsShow(false);
  };

  const showHandler = () => {
    setIsShow((prevIsShow) => !prevIsShow);
    setEdit(null);
  };

  return (
    <section className="shadow-inner p-3 rounded-xl bg-white">
      {filters.length > 0 && (
        <FiltersList onDelete={deleteHandler} onEdit={setEditHandler} />
      )}
      {(filters.length === 0 || isShow) && (
        <FilterForm
          id={edit}
          handleEdit={submitEditHandler}
          handleAdd={submitAddHandler}
        />
      )}
      {filters.length > 0 && (
        <ShowButton show={isShow} setShow={showHandler} filter />
      )}
    </section>
  );
};

export default Filters;
