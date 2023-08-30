/**
 * ユーザー登録画面の入力フォームのフィールド名とラベル名のリスト
 * @returns フィールド名とラベル名のリスト
 */
export const RegisterInputFormFieldsList = () => {
  const FormNamesList = [
    { name: 'userName', label: 'ユーザー名' },
    { name: 'email', label: 'メールアドレス' },
    { name: 'password', label: 'パスワード' },
    { name: 'passwordConfirmation', label: '確認パスワード' },
  ];
  return FormNamesList;
};
