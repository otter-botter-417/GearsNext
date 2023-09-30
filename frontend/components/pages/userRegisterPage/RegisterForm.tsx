import React from 'react';

import { useUserRegister } from '@/hooks/UserAuth/useUserRegister';
import { FormProvider } from '@/hooks/useFormMethods ';

import { AuthForm } from '@/components/pages/userRegisterPage/AuthForm';
import { RegisterInputFormFieldsList } from '@/components/pages/userRegisterPage/RegisterInputFormFieldsList';

/**
 * 新規登録フォーム
 *
 * @remarks
 * このコンポーネントは新規登録ページで使用され、以下の要素を含みます：
 * - ユーザー名
 * - メールアドレス
 * - パスワード
 * - パスワードの確認
 *
 * AuthFormコンポーネントを内部で使用しており、認証に必要なUIとロジックが含まれています。
 *
 * @returns ユーザー新規登録フォーム
 */
export const RegisterForm = () => {
  const { formMethods, onSubmit } = useUserRegister();
  return (
    <FormProvider formMethods={formMethods}>
      <AuthForm
        inputFormFieldsList={RegisterInputFormFieldsList}
        onSubmit={onSubmit}
        buttonText="新規登録"
      />
    </FormProvider>
  );
};
