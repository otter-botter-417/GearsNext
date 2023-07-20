import * as yup from "yup";

export const ChairDetailValidatedSchema = () => {
  const schema = yup.object().shape({
    seatHeight: yup
      .number()
      .positive("座面高さは正の数である必要があります。")
      .required("座面高さは必須です。"),
    reclining: yup.string().required("リクライニングは必須です。"),
    fabrics: yup.string().required("素材は必須です。"),
  });
  return schema;
};
