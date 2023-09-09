import * as yup from "yup";

export const TableDetailValidatedSchema = () => {
  const schema = yup.object().shape({
    capacity: yup
      .number()
      .positive("収容人数は正の数である必要があります。")
      .required("収容人数は必須です。"),
    fabrics: yup.string().required("素材は必須です。"),
    heightAdjustment: yup.string().required("高さ調節は必須です。"),
  });
  return schema;
};
