import * as yup from 'yup';

export const RegisterValidatedSchema = () => {
  const schema = yup.object().shape({
    userName: yup
      .string()
      .max(30, 'ユーザー名は30文字以内です')
      .required('ユーザー名は必須です'),
    email: yup
      .string()
      .email('有効なメールアドレスを入力してください。')
      .required('メールアドレスは必須です。'),
    password: yup
      .string()
      .min(6, 'パスワードは最低6文字必要です')
      .max(30, 'パスワードは30文字以内です')
      .required('パスワードは必須です。')
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])/,
        'パスワードは少なくとも1つの英字と1つの数字を含む必要があります',
      ),
    passwordConfirmation: yup
      .string()
      .test('passwords-match', 'パスワードが一致しません', function (value) {
        return this.parent.password === value;
      })
      .required('確認用パスワードは必須です'),
    loading: yup.boolean(),
  });
  return schema;
};
