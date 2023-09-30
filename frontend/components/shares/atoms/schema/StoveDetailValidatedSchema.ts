import * as yup from 'yup';

export const StoveDetailValidatedSchema = yup.object().shape({
  tankCapacity: yup.number(),
  runLength: yup.number(),
  heatingOutput: yup.number(),
  fabrics: yup.string(),
});
