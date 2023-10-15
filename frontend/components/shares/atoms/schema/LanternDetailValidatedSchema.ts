import * as yup from 'yup';

export const LanternDetailValidatedSchema = yup.object().shape({
  intensity: yup.number().min(0).nullable().transform((value, originalValue) => {
    return originalValue === "" ? null : value;
  }),
  lightColor: yup.string().nullable(),
  runLength: yup.number().nullable().transform((value, originalValue) => {
    return originalValue === "" ? null : value;
  }),
  batteryCapacity: yup.number().nullable().transform((value, originalValue) => {
    return originalValue === "" ? null : value;
  }),
  chargingTime: yup.number().nullable().transform((value, originalValue) => {
    return originalValue === "" ? null : value;
  }),
  waterproof: yup.string().nullable(),
  burnTime: yup.number().nullable().transform((value, originalValue) => {
    return originalValue === "" ? null : value;
  }),
  fabrics: yup.string().nullable(),
});
