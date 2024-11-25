import * as yup from 'yup';
import { CouponType } from '@/types';

export const chefValidationSchema = yup.object().shape({
  korisnicko_ime: yup
    .string()
    .required('form:error-korisnicko_ime-required'),
  password: yup
    .string()
    .required('form:error-password-required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'form:error-match-passwords')
    .required('form:error-confirm-password'),
});
