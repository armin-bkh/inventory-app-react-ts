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

const onSubmit = () => {
    console.log("submited")
}


const FilterForm = () => {
    const formik: FormikProps<formValueType> = useFormik<formValueType>({ 
        initialValues,
        validationSchema,
        onSubmit,
     });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Input type="text" name="filter" formik={formik} />
            <button type="submit">Add Filter</button>
        </form>
    )
}

export default FilterForm;