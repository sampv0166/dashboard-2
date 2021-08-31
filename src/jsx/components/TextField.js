import React from "react";
import { ErrorMessage, useField } from "formik";

const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="mb-3">
      <label htmlFor={field.name}>{label}</label>
      <input
        className={`form-control shadow-none rounded ${
          meta.touched && meta.error && "is-invalid "
        }`}
        autoComplete="off"
        {...field}
        {...props}
      />
      <ErrorMessage component="div" name={field.name}  className="error text-danger" />
    </div>
  );
};

export default TextField;
