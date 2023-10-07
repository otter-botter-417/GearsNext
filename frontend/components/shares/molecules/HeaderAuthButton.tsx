import React, { FC } from 'react';
import { Typography, Button, Box } from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';

import { LinkButtonWithIcon } from '@/components/shares/molecules/LinkButtonWithIcon';

type UserObject = {
  userId: number;
  userName: string;
};

type HeaderAuthButtonProps = {
  user: UserObject | null;
  handleLogout: () => void;
  color: string;
};

/**
 * ログインボタンとログアウトボタンをuserの有無で表示します
 * @param user ログインしているユーザー情報
 * @param handleLogout ログアウト処理
 * @param color ボタンの色
 * @returns
 */
const HeaderAuthButton: FC<HeaderAuthButtonProps> = ({
  user,
  handleLogout,
  color,
}) => {
  return user ? (
    <Button onClick={handleLogout}>
      <Typography variant={'body1'} color={color} minWidth={80}>
        ログアウト
      </Typography>
    </Button>
  ) : (
    <LinkButtonWithIcon
      href="/UserLoginPage"
      endIcon={<LoginIcon color="secondary" fontSize="small" />}
      color={color}
    >
      ログイン
    </LinkButtonWithIcon>
  );
};

export default HeaderAuthButton;
