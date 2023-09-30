import * as yup from 'yup';

export const FloorMatDetailValidatedSchema = yup.object().shape({
  capacity: yup.number().positive('収容人数は正の数である必要があります。'),
  thickness: yup.number(),
  insulation: yup.string(),
  fabrics: yup.string(),
});
