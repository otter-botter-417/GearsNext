import * as yup from "yup";

export const AddNewItemValidatedSchema = () => {
  const schema = yup.object().shape({
    itemName: yup.string().required("商品名は必須です。"),
    asin: yup
      .string()
      .required("ASINは必須です。")
      .test("len", "ASINは正確に10桁である必要があります", (val) =>
        val ? val.length === 10 : false
      ),
    imageName: yup.string().required("画像パスは必須です。"),
    price: yup
      .number()
      .positive("価格は正の数である必要があります。")
      .required("定価は必須です。"),

    openWidth: yup.number().required("幅は必須です。"),
    openDepth: yup.number().required("長さは必須です。"),
    openHeight: yup.number().required("高さは必須です。"),
    storageWidth: yup.number().required("収納幅は必須です。"),
    storageDepth: yup.number().required("収納長さは必須です。"),
    storageHeight: yup.number().required("収納高さは必須です。"),
    weight: yup.number().required("重量は必須です。"),
    brandName: yup.string().required(),
    itemCategoryName: yup.string().required(),
    itemTags: yup.array().of(yup.string()).notRequired(), //文字列の配列　必須ではない
    colorTags: yup.array().of(yup.string()).notRequired(), //文字列の配列　必須ではない

    // itemSubCategoryName: yup.string().required(),

    // details: yup.array().of(yup.mixed()).notRequired(), // 文字列、数値、日付、ブール値など混合した配列　必須ではない
    loading: yup.boolean(),
  });
  return schema;
};
