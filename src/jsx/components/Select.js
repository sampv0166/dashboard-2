import { Field, ErrorMessage, useFormikContext, useField } from "formik";

const Select = (props) => {
  const { label, name, options, ...rest } = props;

  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);

  const handleChange = (evt) => {
    const { value } = evt.target;
    setFieldValue(name, value);
  };

  return (
    <div className="mb-3">
      <label htmlFor={name}>{label}</label>
      <Field
        className={`form-select form-control shadow-none rounded ${
          meta.touched && meta.error && "is-invalid "
        }`}
        autoComplete="off"
        as="select"
        id={name}
        name={name}
        {...rest}
        onChange={handleChange}
      >
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Field>

      <ErrorMessage component="div" name={name}  className="error text-danger" />
    </div>
  );
};

export default Select;
