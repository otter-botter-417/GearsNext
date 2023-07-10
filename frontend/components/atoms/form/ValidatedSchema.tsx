import * as yup from "yup";

export const ValidatedSchema = () => {
  const schema = yup.object().shape({
    itemName: yup.string().required("商品名は必須です。"),
    amazonUrl: yup
      .string()
      .url("有効なURLを入力してください。")
      .required("AmazonURLは必須です。"),
    asin: yup
      .string()
      .required("ASINは必須です。")
      .test("len", "ASINは正確に10桁である必要があります", (val) =>
        val ? val.length === 10 : false
      ),
    imagePath: yup.string().required("画像パスは必須です。"),
    price: yup
      .number()
      .positive("価格は正の数である必要があります。")
      .required("定価は必須です。"),
    itemCategoryName: yup.string().required("カテゴリーを選択してください。"),
    brandName: yup.string().required("ブランドを選択してください。"),
    itemTags: yup.array().of(yup.string()).notRequired(), //文字列の配列　必須ではない
    colorTags: yup.array().of(yup.string()).notRequired(), //文字列の配列　必須ではない
    details: yup.array().of(yup.mixed()).notRequired(), // 文字列、数値、日付、ブール値など混合した配列　必須ではない
    loading: yup.boolean(),
  });
  return schema;
};
