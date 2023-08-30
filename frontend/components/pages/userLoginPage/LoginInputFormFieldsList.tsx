/**
 * ログイン画面の入力フォームのフィールド名とラベル名のリスト
 * @returns フィールド名とラベル名のリスト
 */
export const LoginInputFormFieldsList = () => {
  const FormNamesList = [
    { name: 'email', label: 'メールアドレス' },
    { name: 'password', label: 'パスワード' },
  ];
  return FormNamesList;
};
