import { useFormik, FormikProps } from "formik";
import { useEffect, useRef, useState } from "react";
import { useToasts } from "react-toast-notifications";
import * as Yup from "yup";
import Input from "../../Common/Input/Input";
import {
  useInventory,
} from "../../Provider/InventoryProvider";
import { isExistFilter } from "../../Utils/isExistFilter";

export interface formValueType {
  filter: string;
}

const initialValues = {
  filter: "",
};

const validationSchema = Yup.object({
  filter: Yup.string().required("filter name is required."),
});

interface filterFormProps {
  id: number | null;
  handleEdit: (filter: string) => void;
  handleAdd: (filter: string) => void;
}

const FilterForm = ({ id, handleEdit, handleAdd }: filterFormProps) => {
  const [formValues, setFormValues] = useState<formValueType | null>(null);
  const { filters } = useInventory();
  const { addToast } = useToasts();
  const formRef = useRef<HTMLFormElement>(null!);

  useEffect(() => {
      formRef.current.scrollIntoView();
    if (id) {
      setFormValues({
        filter: filters.find((filter) => filter.id === id)?.value || "",
      });
    }
    return ()=> {
        console.log(1);
    }
  }, [id]);

  const onSubmit = (values: formValueType) => {
    if (id) {
      handleEdit(values.filter);
      setFormValues(null);
      addToast(`${values.filter} successfuly edited`, {
        appearance: "success",
      });
      formik.handleReset();
      return;
    }
    if (!isExistFilter(filters, values.filter)) {
        addToast(`${values.filter} successfuly added`, { appearance: "success" });
        formik.handleReset();
        handleAdd(values.filter);
    } else
      addToast(`${values.filter} is already exist`, { appearance: "error" });
  };

  const formik: FormikProps<formValueType> = useFormik<formValueType>({
    initialValues: formValues || initialValues,
    validationSchema,
    onSubmit,
    validateOnMount: true,
    enableReinitialize: true,
  });

  return (
    <form
      className={`rounded-lg shadow-lg p-5 mx-auto lg:w-1/3`}
      onSubmit={formik.handleSubmit}
      ref={formRef}
    >
      <Input
        type="text"
        name="filter"
        id="filterInput"
        lbl="filter"
        formik={formik}
      />
      <button
        className="rounded-md bg-emerald-600 text-white px-3 py-1 mt-5 disabled:bg-opacity-50"
        type="submit"
        disabled={!formik.isValid}
      >
        {!id ? "Add Filter" : "Edit Filter"}
      </button>
    </form>
  );
};

export default FilterForm;
