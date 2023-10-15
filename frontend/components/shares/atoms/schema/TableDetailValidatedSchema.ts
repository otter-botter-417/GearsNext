import * as yup from 'yup';

export const TableDetailValidatedSchema = yup.object().shape({
  expansionMethod: yup
    .string()
    .required('展開方式は必須です。'),
  fabrics: yup.string().required('素材は必須です。'),
  heightAdjustment: yup.string().required('高さ調節は必須です。'),
});
