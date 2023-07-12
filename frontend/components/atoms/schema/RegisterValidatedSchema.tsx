import * as yup from "yup";

export const RegisterValidatedSchema = () => {
  const schema = yup.object().shape({
    name: yup
      .string()
      .max(20, "ユーザー名は20文字以内です")
      .required("ユーザー名は必須です"),
    email: yup
      .string()
      .email("有効なメールアドレスを入力してください。")
      .required("メールアドレスは必須です。"),
    password: yup
      .string()
      .min(6, "パスワードは最低6文字必要です")
      .required("ASINは必須です。")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])/,
        "パスワードは少なくとも1つの英字と1つの数字を含む必要があります"
      ),
    loading: yup.boolean(),
  });
  return schema;
};
