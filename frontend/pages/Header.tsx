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

const Header = () => {
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  const fontColor = '#d6dade';

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    router.push('/');
  };

  return (
    <Box display="flex" justifyContent="center" width="100%">
      <AppBar
        position="fixed"
        style={{ paddingLeft: '10%', paddingRight: '10%' }}
      >
        <Toolbar variant="dense">
          <Box display="flex" justifyContent="space-between" width="100%">
            <Box flex={1}> </Box>
            <Box display="flex" justifyContent="center">
              <NextLink href={`/`}>
                <Button>
                  <Typography variant="h4" color={fontColor}>
                    Gears
                  </Typography>
                </Button>
              </NextLink>
            </Box>
            <Box flex={1} display="flex" justifyContent="flex-end">
              {user ? (
                <>
                  <Button onClick={handleLogout} component="button">
                    <Typography variant="h6"color={fontColor}>ログアウト</Typography>
                  </Button>
                </>
              ) : (
                <NextLink href={`/UserLoginPage`}>
                  <Button>
                    <Typography variant="h6"color={fontColor}>ログイン</Typography>
                  </Button>
                </NextLink>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
