import * as yup from 'yup';

export const LanternDetailValidatedSchema = yup.object().shape({
  intensity: yup.number().positive('光量は正の数である必要があります。'),
  fuelType: yup.string(),
  batteryCapacity: yup.number(),
  chargingTime: yup.number(),
  runLength: yup.number(),
  fabrics: yup.string(),
});
