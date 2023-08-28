import React from 'react';
import Link from 'next/link';
import { Typography } from '@mui/material';

import { SubmitButton } from '@/components/atoms/form/SubmitButton';
import RegisterForm from '@/components/organisms/RegisterForm';
import RegisterPageTemplate from '@/components/templates/RegisterPageTemplate';
import { useUserRegister } from '@/hooks/useUserRegister';
import { FormMethodsProvider } from '@/hooks/useFormMethods ';

/**
 * ユーザーの新規登録ページ
 */
const UserRegisterPage = () => {
  const { formMethods, onSubmit } = useUserRegister();

  return (
    <RegisterPageTemplate>
      <FormMethodsProvider formMethods={formMethods}>
        <Typography variant="h4">新規登録</Typography>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <RegisterForm />
          <SubmitButton
            loading={formMethods.watch('loading') || false}
            text={'新規登録'}
          />
        </form>
        <Link href="/UserLoginPage">既にアカウントを持っている</Link>
      </FormMethodsProvider>
    </RegisterPageTemplate>
  );
};

export default UserRegisterPage;
