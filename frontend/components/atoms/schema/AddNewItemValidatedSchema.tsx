import * as yup from "yup";

export const AddNewItemValidatedSchema = () => {
  const schema = yup.object().shape({
    itemName: yup.string().required("商品名は必須です。"),
    brandName: yup.string().required("ブランドを選択してください。"),
    price: yup
      .number()
      .positive("価格は正の数である必要があります。")
      .required("定価は必須です。"),
    asin: yup
      .string()
      .required("ASINは必須です。")
      .test("len", "ASINは正確に10桁である必要があります", (val) =>
        val ? val.length === 10 : false
      ),
    imagePath: yup.string().required("画像パスは必須です。"),
    sizes: yup.array().of(yup.number()).notRequired(),
    itemTags: yup.array().of(yup.string()).notRequired(), //文字列の配列　必須ではない
    colorTags: yup.array().of(yup.string()).notRequired(), //文字列の配列　必須ではない
    itemCategoryName: yup.string().required("カテゴリーを選択してください。"),
    itemSubCategoryName: yup
      .string()
      .required("サブカテゴリーを選択してください。"),

    details: yup.array().of(yup.mixed()).notRequired(), // 文字列、数値、日付、ブール値など混合した配列　必須ではない
    loading: yup.boolean(),
  });
  return schema;
};
