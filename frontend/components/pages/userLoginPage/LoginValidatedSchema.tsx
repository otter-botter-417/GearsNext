import * as yup from 'yup';

export const LoginValidatedSchema = yup.object().shape({
  email: yup
    .string()
    .email('有効なメールアドレスを入力してください。')
    .required('メールアドレスは必須です。'),
  password: yup
    .string()
    .min(6, 'パスワードは最低6文字必要です')
    .required('ASINは必須です。')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])/,
      'パスワードは少なくとも1つの英字と1つの数字を含む必要があります',
    ),
});
