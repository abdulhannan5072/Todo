import React from 'react';
import {useField} from 'formik';
import {TextField}  from '../';

  export const TextFieldFormik = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <>
        <TextField {...field} {...props} label={label}
          error={meta.touched && meta.error? true : undefined}
          helperText={meta.touched && meta.error ? meta.error : ' '}
        />
      </>
    );
  };