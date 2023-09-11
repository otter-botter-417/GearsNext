import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Typography } from '@mui/material';

import { useUserLogin } from '@/hooks/UserAuth/useUserLogin';
import { FormMethodsProvider } from '@/hooks/useFormMethods ';

import { SubmitButton } from '@/components/shares/atoms/SubmitButton';
import RegisterPageTemplate from '@/components/templates/RegisterPageTemplate';
import LoginForm from '@/components/pages/userLoginPage/LoginForm';

/**
 * ユーザーのログインページ
 */
const UserLoginPage = () => {
  const { formMethods, onSubmit } = useUserLogin();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('jwt_token'));
  }, []);

  return (
    <RegisterPageTemplate>
      <FormMethodsProvider formMethods={formMethods}>
        <Typography variant="h4">ログイン</Typography>
        {isAuthenticated ? <p>ログアウト</p> : <p>ログインしてください</p>}
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <LoginForm formMethods={formMethods} />
          <SubmitButton
            loading={formMethods.watch('loading') || false}
            text={'ログイン'}
          />
        </form>
        <Link href="/UserRegisterPage">アカウントを持っていない</Link>
      </FormMethodsProvider>
    </RegisterPageTemplate>
  );
};

export default UserLoginPage;
