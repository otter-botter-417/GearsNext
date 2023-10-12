import React from 'react';
import { Typography } from '@mui/material';

import { useRedirectIfAuthenticated } from '@/hooks/UserAuth/useRedirectIfAuthenticated';

import { AuthPageTemplate } from '@/components/templates/AuthPageTemplate';
import { LoginForm } from '@/components/pages/userLoginPage/LoginForm';
import { LinkButton } from '@/components/shares/molecules/LinkButton';

/**
 * ユーザーログインページ
 *
 * @remarks
 * このページには以下の要素が含まれます：
 * - タイトル ("ログイン")
 * - ログインフォーム
 * - 新規登録ページへのリンク
 *
 * @returns ユーザーログインページの要素
 */
const UserLoginPage = () => {
  useRedirectIfAuthenticated();

  const title = <Typography variant="h4">ログイン</Typography>;
  const loginForm = <LoginForm />;
  const link = (
    <LinkButton link={'/UserRegisterPage'} text="新規登録はこちら" pt={26} />
  );

  return <AuthPageTemplate title={title} form={loginForm} link={link} />;
};

export default UserLoginPage;
