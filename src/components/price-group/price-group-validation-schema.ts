import * as yup from 'yup';
import { CouponType } from '@/types';

export const priceGroupValidationSchema = yup.object().shape({
  naziv: yup
    .string()
    .required('form:error-name-required'),
});
