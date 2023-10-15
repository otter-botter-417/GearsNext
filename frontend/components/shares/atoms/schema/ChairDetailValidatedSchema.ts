import * as yup from 'yup';

export const ChairDetailValidatedSchema = yup.object().shape({
  seatHeight: yup
    .number()
    .min(0, '座面高さは0以上である必要があります。')
    .required('座面高さは必須です。'),
  heightAdjustment: yup.string().required('高さ調節は必須です。'),
  reclining: yup.string().required('リクライニングは必須です。'),
  fabrics: yup.string().required('素材は必須です。'),
});
