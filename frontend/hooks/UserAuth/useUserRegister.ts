import { RegisterValidatedSchema } from '@/components/pages/userRegisterPage/RegisterValidatedSchema';
import { RegisterFormDataTypes } from '@/components/types/RegisterFormDataTypes';
import { useUserAuth } from './useUserAuth';

/**
 * ユーザーログインのカスタムフック
 *
 * @remarks
 * このフックは`useUserAuth`フックをラップして、ユーザーログインの専用ロジックを提供します。
 *
 * @returns {object} フォームメソッド、onSubmit関数、ローディング状態
 */
export const useUserRegister = () => {
  return useUserAuth<RegisterFormDataTypes>(
    RegisterValidatedSchema,
    'user/register',
    registerTransformer
  );
};

/**
 * ユーザー登録APIに送信するデータを変換する関数
 * @param data  フォームデータ
 * @returns  APIに送信するデータ
 */
const registerTransformer = (data: RegisterFormDataTypes) => ({
  user_name: data.userName,
  email: data.email,
  password: data.password,
  password_confirmation: data.passwordConfirmation,
});