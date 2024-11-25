import * as yup from 'yup';

export const dateIntervalValidationSchema = yup.object().shape({
  year: yup
    .string()
    .required('You must set an year'),
  start_date: yup.date().required('form:error-start-date-required'),
  end_date: yup
    .date()
    .required('form:error-start-date-required')
    .min(yup.ref('end_date'), 'form:error-start-and-end-date'),
});
