import * as yup from 'yup';

export const CampBedDetailValidatedSchema = yup.object().shape({
  capacity: yup.number().positive('収容人数は正の数である必要があります。'),
  assembly: yup.string(),
  loadCapacity: yup.string(),
  fabrics: yup.string(),
});
