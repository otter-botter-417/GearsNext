import * as yup from 'yup';

export const SleepingBagDetailValidatedSchema = yup.object().shape({
  capacity: yup.number().positive('収容人数は正の数である必要があります。'),
  fillPower: yup
    .number()
    .positive('フィルパワーは正の数である必要があります。'),
  comfortTemp: yup.number(),
  limitTemp: yup.string(),
  lowerTemp: yup.number(),
  materials: yup.string(),
  fabrics: yup.string(),
});
