import { LoginValidatedSchema } from '@/components/pages/userLoginPage/LoginValidatedSchema';
import { LoginFormDataTypes } from '@/components/types/LoginFormDataTypes';
import { useUserAuth } from './useUserAuth';

/**
 * ユーザーログインのカスタムフック
 *
 * @remarks
 * このフックは`useUserAuth`フックをラップして、ユーザーログインの専用ロジックを提供します。
 *
 * @returns {object} フォームメソッド、onSubmit関数、ローディング状態
 */
export const useUserLogin = () => {
  return useUserAuth<LoginFormDataTypes>(
    LoginValidatedSchema,
    'user/login',
    loginTransformer,
    true  // テストユーザーを使用する場合はtrue ポートフォリオ用設定
  );
};

/**
 * ユーザーログインAPIに送信するデータを変換する関数
 * @param data  フォームデータ
 * @returns  APIに送信するデータ
 */
const loginTransformer = (data: LoginFormDataTypes) => ({
  email: data.email,
  password: data.password,
});