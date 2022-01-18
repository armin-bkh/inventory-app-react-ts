import React from "react";

type inputProps = {
  name: string;
  lbl: string;
  As: "products" | "filters",
  formik: any;
} & React.ComponentProps<"input">;

const Input = ({ As, name, formik, id, lbl, ...rest }: inputProps) => {
  return (
    <fieldset className="flex flex-col">
      <label className="pb-2" htmlFor={id}>
        {lbl}:
      </label>
      <input
        className={`border rounded-md mb-1 px-3 py-1 outline-none ${As === "products" ? 'focus:border-pink-600' : 'focus:border-green-600'} 
        focus:shadow transition-all`}
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
