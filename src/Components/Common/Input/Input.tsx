import React from 'react';

type inputProps = {
    name: string,
    formik: any,
} & React.ComponentProps<'input'>;

const Input = ({name, formik, ...rest}: inputProps) => {
    return (
        <fieldset>
            <input name={name} {...formik.feildProps(name)} {...rest} />
            {formik.touched[name] && formik.errors[name] && <span>{formik.errors[name]}</span>}
        </fieldset>
    )
}

export default Input;