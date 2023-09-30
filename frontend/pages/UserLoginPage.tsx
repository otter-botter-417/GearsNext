import React from 'react';
import Link from '@mui/material/Link';
import { Typography } from '@mui/material';

import { useRedirectIfAuthenticated } from '@/hooks/UserAuth/useRedirectIfAuthenticated';

import { AuthPageTemplate } from '@/components/templates/AuthPageTemplate';
import { LoginForm } from '@/components/pages/userLoginPage/LoginForm';

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
  const link = <Link href="/UserRegisterPage">アカウントを持っていない</Link>;

  return <AuthPageTemplate title={title} form={loginForm} link={link} />;
};

export default UserLoginPage;
