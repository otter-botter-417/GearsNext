import * as yup from 'yup';

export const SleepingBagDetailValidatedSchema = yup.object().shape({
  capacity: yup.number().positive('収容人数は正の数である必要があります。'),
  fillPower: yup.number().nullable().transform((value, originalValue) => {
    return originalValue === "" ? null : value;
  }).positive('フィルパワーは正の数である必要があります。'),
  comfortTemp: yup.number().nullable().transform((value, originalValue) => {
    return originalValue === "" ? null : value;
  }),
  limitTemp: yup.number().nullable().transform((value, originalValue) => {
    return originalValue === "" ? null : value;
  }),
  lowerTemp: yup.number().nullable().transform((value, originalValue) => {
    return originalValue === "" ? null : value;
  }),
  materials: yup.string(),
  fabrics: yup.string(),
});
