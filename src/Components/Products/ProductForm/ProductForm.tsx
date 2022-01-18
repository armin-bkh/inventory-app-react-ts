import Input from '../../Common/Input/Input';
import { useFormik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { useToasts } from 'react-toast-notifications';
import { useInventory } from '../../Provider/InventoryProvider';
import { isExistProduct } from '../../Utils/isExistProduct';

interface productFormValues {
    name: string,
    filter: string
}

const initialValues = {
    name: '',
    filter: '',
}


const validationSchema = Yup.object({
    name: Yup.string().required('product name is required.'),
    filter: Yup.string().required('product filter is required'),
})

interface productFormProps {
    handleAdd: (product: productFormValues) => void;
}


const ProductForm = ({ handleAdd }: productFormProps) => {
    const { addToast } = useToasts();
    const { products } = useInventory();

    const onSubmit = (values: productFormValues) => {
        if(!isExistProduct(products, values.name)){
            handleAdd(values);
            addToast(`${values.name} successfuly added`, { appearance: 'success' })
            formik.handleReset();
        }
        else addToast(`${values.name} is already exist`, { appearance: 'error' })
    }

    const formik: FormikProps<productFormValues> = useFormik<productFormValues>({
        initialValues,
        onSubmit,
        validationSchema,
        enableReinitialize: true,
        validateOnMount: true,
    });


    return (
        <form className='p-5 rounded-lg shadow-lg mx-auto lg:w-1/3' onSubmit={formik.handleSubmit}>
            <Input As="products" id='productName' lbl='name' name='name' type="text" formik={formik} />
            <Input As="products" id='productFilter' lbl='filter' name='filter' type="text" formik={formik} />
            <button
        className="rounded-md bg-pink-600 text-white px-3 py-1 mt-5 disabled:bg-opacity-50"
        type="submit"
        disabled={!formik.isValid}
      >
        Add Product
      </button>
        </form>
    )
}

export default ProductForm;