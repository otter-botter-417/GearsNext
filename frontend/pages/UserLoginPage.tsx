import React from 'react';
import Link from '@mui/material/Link';
import { Typography, Box } from '@mui/material';

import { AuthPageTemplate } from '@/components/templates/AuthPageTemplate';
import { useUserLogin } from '@/hooks/UserAuth/useUserLogin';
import { useRecoilValue } from 'recoil';
import { userState } from '@/components/shares/atoms/state/userState';
import { useRouter } from 'next/router';
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
  const { formMethods, onSubmit } = useUserLogin();
  const user = useRecoilValue(userState);
  const router = useRouter();

  // 既にログインしている場合はホームページにリダイレクト
  if (user) {
    router.push('/');
  }

  const title = <Typography variant="h4">ログイン</Typography>;
  const loginForm = <LoginForm />;
  const link = <Link href="/UserRegisterPage">アカウントを持っていない</Link>;

  return <AuthPageTemplate title={title} form={loginForm} link={link} />;
};

export default UserLoginPage;
