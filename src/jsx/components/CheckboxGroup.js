import React from 'react';
import { Field, ErrorMessage } from 'formik';

function CheckboxGroup(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div className="form-check form-switch row my-3 mx-1">
      <label className="mx-2 my-2">{label}</label>
      <Field name={name}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <React.Fragment key={option.key}>
                <div className="d-flex my-2">
                  <input
                    className="my-1 mx-2 "
                    type="checkbox"
                    id={option.value}
                    {...field}
                    {...rest}
                    value={option.value}
                  />
                  <label htmlFor={option.value}>{option.key}</label>
                </div>
              </React.Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage component="div" name={name} />
    </div>
  );
}

export default CheckboxGroup;
