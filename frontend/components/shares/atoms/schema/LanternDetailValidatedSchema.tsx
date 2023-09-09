import * as yup from "yup";

export const LanternDetailValidatedSchema = () => {
  const schema = yup.object().shape({
    intensity: yup
      .number()
      .positive("光量は正の数である必要があります。")
      .required("光量は必須です。"),
    fabrics: yup.string().required("素材は必須です。"),
    fuelType: yup.string().required("燃料種類は必須です。"),
  });
  return schema;
};
