import * as yup from 'yup';
import { ErrorMessages, UserRoles } from '../../constants';

export const RegisterUserRequest = yup.object().shape({
  name: yup.string().required(),
  surname: yup.string().required(),
  email: yup.string().email().transform((value) => value.toLowerCase()).required(),
  role: yup.mixed().oneOf(Object.values(UserRoles)).required(),
  companyId: yup.string().uuid(),
  password: yup.string()
    .min(8, ErrorMessages.invalid_password_min_length)
    .max(128, ErrorMessages.invalid_password_max_length)
    .matches(/^[^\s]+$/, ErrorMessages.invalid_password_no_spaces)
    .matches(/[\d.@#$%^&*!]/, ErrorMessages.invalid_password_digit_or_special)
    .required(),
});
