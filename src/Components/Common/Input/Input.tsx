import React from "react";

type inputProps = {
  name: string;
  lbl: string;
  formik: any;
} & React.ComponentProps<"input">;

const Input = ({ name, formik, id, lbl, ...rest }: inputProps) => {
  return (
    <fieldset className="flex flex-col">
      <label className="pb-2" htmlFor={id}>
        {lbl}:
      </label>
      <input
        className="border rounded-md mb-1 px-3 py-1 outline-none focus:border-emerald-600
        focus:shadow transition-all"
        id={id}
        name={name}
        placeholder={`enter ${lbl}`}
        {...formik.getFieldProps(name)}
        {...rest}
      />
      {formik.touched[name] && formik.errors[name] && (
        <span className="text-red-600 text-xs ml-3">{formik.errors[name]}</span>
      )}
    </fieldset>
  );
};

export default Input;
