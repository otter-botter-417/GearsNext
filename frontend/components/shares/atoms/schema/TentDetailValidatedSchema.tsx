import * as yup from "yup";

export const TentDetailValidatedSchema = () => {
  const schema = yup.object().shape({
    capacity: yup
      .number()
      .positive("収容人数は正の数である必要があります。")
      .required("収容人数は必須です。"),
    innerTent: yup.string().required("インナーテントは必須です。"),
    grandSheet: yup.string().required("インナーテントは必須です。"),
    fabrics: yup.string().required("素材は必須です。"),
  });
  return schema;
};
