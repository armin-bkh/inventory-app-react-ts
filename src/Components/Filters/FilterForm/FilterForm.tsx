import { useFormik, FormikProps } from "formik"
import * as Yup from 'yup';
import Input from "../../Common/Input/Input";

export interface formValueType {
    filter: string
}

const initialValues = {
    filter: ''
}

const validationSchema = Yup.object({
    filter: Yup.string().required('filter name is required.')
})

const onSubmit = (values: formValueType) => {
    console.log("submited", values)
}


const FilterForm = () => {
    const formik: FormikProps<formValueType> = useFormik<formValueType>({ 
        initialValues,
        validationSchema,
        onSubmit,
     });

    return (
        <form className={`rounded-lg shadow-lg p-5`} onSubmit={formik.handleSubmit}>
            <Input type="text" name="filter" id="filterInput" lbl="filter" formik={formik} />
            <button className="rounded-md bg-emerald-600 text-white px-3 py-1 mt-5" type="submit" disabled={!formik.isValid}>Add Filter</button>
        </form>
    )
}

export default FilterForm;