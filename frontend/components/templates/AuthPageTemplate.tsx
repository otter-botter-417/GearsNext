import React, { FC } from 'react';
import { Box } from '@mui/material';

type AuthPageTemplateProps = {
  title: React.ReactNode;
  form: React.ReactNode;
  link: React.ReactNode;
};

/**
 * このコンポーネントは、ログインページと新規登録ページのテンプレートを提供します。
 * @param title - ページのタイトル
 * @param form - フォーム
 * @param link - ページ遷移用のリンク
 * @returns ログインページと新規登録ページのテンプレート
 */
export const AuthPageTemplate: FC<AuthPageTemplateProps> = ({
  title,
  form,
  link,
}) => {
  return (
    <Box
      display="flex"
      width="100%"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box mb={2}>{title}</Box>
      {form}
      {link}
    </Box>
  );
};
