import { useFormik, FormikProps } from "formik"
import { useToasts } from "react-toast-notifications";
import * as Yup from 'yup';
import Input from "../../Common/Input/Input";
import { useInventory, useInventoryActions } from "../../Provider/InventoryProvider";

export interface formValueType {
    filter: string
}

const initialValues = {
    filter: ''
}

const validationSchema = Yup.object({
    filter: Yup.string().required('filter name is required.')
})



const FilterForm = () => {
    const { filters } = useInventory();
    const { addFilterHandler } = useInventoryActions();
    const { addToast } = useToasts();
    const onSubmit = (values: formValueType) => {
        const isExist = filters.some(filter => filter.value.toLowerCase() === values.filter.toLowerCase());
        if(!isExist) {
            addFilterHandler(values);
            addToast(`${values.filter} successfuly added`, {appearance: 'success'});
        }
        else addToast(`${values.filter} is already exist`, {appearance: 'error'});
    }

    const formik: FormikProps<formValueType> = useFormik<formValueType>({ 
        initialValues,
        validationSchema,
        onSubmit,
        validateOnMount: true,
     });

    return (
        <form className={`rounded-lg shadow-lg p-5`} onSubmit={formik.handleSubmit}>
            <Input type="text" name="filter" id="filterInput" lbl="filter" formik={formik} />
            <button className="rounded-md bg-emerald-600 text-white px-3 py-1 mt-5 disabled:bg-opacity-50" type="submit" disabled={!formik.isValid}>Add Filter</button>
        </form>
    )
}

export default FilterForm;