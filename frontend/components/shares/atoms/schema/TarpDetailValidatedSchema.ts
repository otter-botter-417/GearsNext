import * as yup from 'yup';

export const TarpDetailValidatedSchema = yup.object().shape({
  capacity: yup
    .number()
    .positive('収容人数は正の数である必要があります。')
    .required('収容人数は必須です。'),
  fabrics: yup.string().required('素材は必須です。'),
});
