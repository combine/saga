import * as yup from 'yup';
import { patchOptional } from './lib';

export default yup.object().shape({
  name: yup
    .string()
    .required('A product name is required.')
    .when('$patch', patchOptional),
  description: yup.string()
}).noUnknown();
