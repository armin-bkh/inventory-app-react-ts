import { useFormik, FormikProps } from "formik"

interface formValueType {
    filter: string
}

const initialValues = {
    filter: ''
}

const onSubmit = () => {
    console.log("submited")
}

const FilterForm = () => {
    const formik: FormikProps<formValueType> = useFormik<formValueType>({ 
        initialValues,
        onSubmit
     });

    return (
        <form onSubmit={formik.handleSubmit}></form>
    )
}

export default FilterForm