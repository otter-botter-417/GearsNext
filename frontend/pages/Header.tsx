import React from 'react';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { Box } from '@mui/system';
import Link from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { userState } from '@/components/shares/atoms/state/userState';

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
          <Link href={`/`}>
            <Typography variant="h4">Gears</Typography>
          </Link>
        </Box>
        <Box display="flex" justifyContent="space-between" width="100%">
          {user ? (
            <>
              <Link href={`/AddNewLayoutPage`}>
                <Typography variant="body1">レイアウトを投稿する</Typography>
              </Link>
              <Link onClick={handleLogout} component="button">
                <Typography variant="body1">ログアウト</Typography>
              </Link>
            </>
          ) : (
            <Link href={`/UserLoginPage`}>
              <Typography variant="body1">ログイン</Typography>
            </Link>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
