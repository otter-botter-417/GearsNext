import React from 'react';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { Box } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import NextLink from 'next/link';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { userState } from '@/components/shares/atoms/state/userState';
import { Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

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

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const authPageLinks = (
    <>
      {user ? (
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <Button onClick={handleLogout} component="button">
            <Typography
              variant={isSmallScreen ? 'body2' : 'h6'}
              color={fontColor}
              minWidth={100}
            >
              {' '}
              ログアウト
            </Typography>
          </Button>
        </Box>
      ) : (
        <NextLink href={`/UserLoginPage`} passHref>
          <Button
            component="button"
            endIcon={<LoginIcon color="secondary" fontSize="small" />}
          >
            <Typography
              variant={isSmallScreen ? 'body2' : 'h6'}
              color={fontColor}
              minWidth={100}
            >
              {' '}
              ログイン
            </Typography>
          </Button>
        </NextLink>
      )}
    </>
  );

  return (
    <AppBar
      position="fixed"
      style={isSmallScreen ? {} : { paddingLeft: '10%', paddingRight: '10%' }}
    >
      <Toolbar variant="dense">
        <Grid container alignItems="center">
          <Grid item xs={12} sm={12} md={2}>
            <Box display={'flex'} justifyContent="space-between">
              <NextLink href={`/`}>
                <Button>
                  <Typography
                    variant={isSmallScreen ? 'h6' : 'h4'}
                    color={fontColor}
                  >
                    Gears
                  </Typography>
                </Button>
              </NextLink>
              {isMediumScreen && (
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  {authPageLinks}
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <Box display="flex" minWidth={120} justifyContent="center">
                  <NextLink href={`/ItemSearchPage`} passHref>
                    <Button
                      component="button"
                      endIcon={
                        <SearchIcon color="secondary" fontSize="small" />
                      }
                    >
                      <Typography
                        variant={isSmallScreen ? 'body2' : 'body1'}
                        color={fontColor}
                      >
                        商品を探す
                      </Typography>
                    </Button>
                  </NextLink>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" minWidth={200} justifyContent="center">
                  <NextLink href={`/AddNewLayoutPage`} passHref>
                    <Button
                      component="button"
                      endIcon={
                        <AddAPhotoIcon color="secondary" fontSize="small" />
                      }
                    >
                      <Typography
                        variant={isSmallScreen ? 'body2' : 'body1'}
                        color={fontColor}
                      >
                        レイアウトを投稿
                      </Typography>
                    </Button>
                  </NextLink>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          {!isMediumScreen && (
            <Grid item xs={2}>
              <Box display="flex" justifyContent="flex-end" alignItems="center">
                {authPageLinks}
              </Box>
            </Grid>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
