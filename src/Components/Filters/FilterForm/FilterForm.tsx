import { useFormik, FormikProps } from "formik";
import { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import * as Yup from "yup";
import Input from "../../Common/Input/Input";
import {
  useInventory,
  useInventoryActions,
} from "../../Provider/InventoryProvider";
import { filters } from "../../Provider/InventoryProvider.type";
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
}

const FilterForm = ({ id, handleEdit }: filterFormProps) => {
  const [formValues, setFormValues] = useState<formValueType | null>(null);
  const { filters } = useInventory();
  const { addFilterHandler } = useInventoryActions();
  const { addToast } = useToasts();

  useEffect(() => {
    if (id) {
      setFormValues({
        filter: filters.find((filter) => filter.id === id)?.value || "",
      });
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
      addFilterHandler(values);
      addToast(`${values.filter} successfuly added`, { appearance: "success" });
      formik.handleReset();
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
    <form className={`rounded-lg shadow-lg p-5`} onSubmit={formik.handleSubmit}>
      <Input
      autoFocus
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
