import React from 'react';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { Box } from '@mui/system';
import NextLink from 'next/link';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { userState } from '@/components/shares/atoms/state/userState';
import { Button } from '@mui/material';

/**
 * このコンポーネントは、ヘッダーを表示します。
 * - ロゴを表示します。 Homeページへのリンクになります。
 * - ログインしている場合、レイアウト投稿ページへのリンクとログアウトボタンを表示します。
 * - ログインしていない場合、ログインページへのリンクを表示します。
 */
const Header = () => {
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();

  /**
   * ログアウト処理
   * - JWTをLocalStorageから削除
   * - ユーザー情報をnullに設定
   * - Homeページに遷移
   */
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    router.push('/');
  };

  return (
    <AppBar position="fixed">
      <Toolbar variant="dense">
        <Box display="flex" justifyContent="center" width="100%">
          <NextLink href={`/`}>
            <Typography variant="h4">Gears</Typography>
          </NextLink>
        </Box>
        <Box display="flex" justifyContent="space-between" width="100%">
          {user ? (
            <>
              <NextLink href={`/AddNewLayoutPage`}>
                <Typography variant="body1">レイアウトを投稿する</Typography>
              </NextLink>
              <Button onClick={handleLogout} component="button">
                <Typography variant="body1">ログアウト</Typography>
              </Button>
            </>
          ) : (
            <NextLink href={`/UserLoginPage`}>
              <Typography variant="body1">ログイン</Typography>
            </NextLink>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
