import Input from "../../Common/Input/Input";
import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";
import { useToasts } from "react-toast-notifications";
import { useInventory } from "../../Provider/InventoryProvider";
import { isExistProduct } from "../../Utils/isExistProduct";
import SelectBox from "../../Common/SelectBox/SelectBox";
import { filters } from "../../Provider/InventoryProvider.type";
import { useEffect, useRef, useState } from "react";

interface productFormValues {
  name: string;
  filter: string;
}

const initialValues = {
  name: "",
  filter: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("product name is required."),
  filter: Yup.string().required("product filter is required"),
});

interface productFormProps {
  handleAdd: (product: productFormValues) => void;
  handleEdit: (product: productFormValues) => void;
  id: number | null;
}

const ProductForm = ({ id, handleEdit, handleAdd }: productFormProps) => {
  const [formValues, setFormValues] = useState<productFormValues | null>(null);
  const { addToast } = useToasts();
  const { products, filters } = useInventory();
  const formRef = useRef<HTMLFormElement>(null!);

  useEffect(() => {
    formRef.current.scrollIntoView();
    if (id) {
      const selectedProduct = products.find((product) => product.id === id);
      setFormValues({
        name: selectedProduct?.name || "",
        filter: selectedProduct?.filter || "",
      });
    } else setFormValues(null);
  }, [id]);

  const onSubmit = (values: productFormValues) => {
    if (id) {
      setFormValues(null);
      formik.handleReset();
      handleEdit(values);
      return;
    }
    if (!isExistProduct(products, values.name)) {
      formik.handleReset();
      handleAdd(values);
    } else addToast(`${values.name} is already exist`, { appearance: "error" });
  };

  const filterChangeHandler = (selectedOption: filters) => {
    formik.setFieldValue("filter", selectedOption.value);
  };

  const formik: FormikProps<productFormValues> = useFormik<productFormValues>({
    initialValues: formValues || initialValues,
    onSubmit,
    validationSchema,
    enableReinitialize: true,
    validateOnMount: true,
  });

  return (
    <form
      ref={formRef}
      className="p-5 rounded-lg shadow-lg mx-auto lg:w-1/3"
      onSubmit={formik.handleSubmit}
    >
      <Input
        As="products"
        id="productName"
        lbl="name"
        name="name"
        type="text"
        formik={formik}
      />
      <fieldset className="flex flex-col">
        <label className="mb-2">filter:</label>
        <SelectBox
          width={"100%"}
          options={filters}
          value={formik.values.filter}
          onChange={filterChangeHandler}
          onBlur={() => formik.setFieldTouched("filter", true)}
        />
        {formik.touched.filter && formik.errors.filter && (
          <span className="text-red-600 text-xs ml-3">
            {formik.errors.filter}
          </span>
        )}
      </fieldset>
      <button
        className="rounded-md bg-pink-600 text-white px-3 py-1 mt-5 disabled:bg-opacity-50"
        type="submit"
        disabled={!formik.isValid}
      >
        {!id ? "Add Product" : "Edit Product"}
      </button>
    </form>
  );
};

export default ProductForm;
