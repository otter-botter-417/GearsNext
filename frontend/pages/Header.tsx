import React from 'react';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

// @mui/material components
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// @mui/material hooks
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/material/styles/useTheme';

// @mui/icons-material
import SearchIcon from '@mui/icons-material/Search';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

import { userState } from '@/components/shares/atoms/state/userState';
import { LinkButtonWithIcon } from '@/components/shares/molecules/LinkButtonWithIcon';
import HeaderAuthButton from '@/components/shares/molecules/HeaderAuthButton';


const FONT_COLOR = '#dedee0';

const Header = () => {
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleLogout = () => {
    ['access_token', 'refresh_token'].forEach((item) =>
      localStorage.removeItem(item),
    );
    setUser(null);
    router.push('/');
  };

  return (
    <AppBar position="fixed" style={{ width: '100%' }}>
      <div
        style={{
          maxWidth: '1080px',
          width: '80%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <Toolbar variant="dense">
          <Grid container alignItems="center">
            <Grid item xs={12} sm={12} md={2}>
              <Box
                display={'flex'}
                justifyContent="space-around"
                alignItems={'center'}
              >
                <NextLink href={`/`}>
                  <Button>
                    <Typography
                      variant={isSmallScreen ? 'h6' : 'h4'}
                      color={FONT_COLOR}
                    >
                      Gears
                    </Typography>
                  </Button>
                </NextLink>
                {isSmallScreen && (
                  <HeaderAuthButton
                    user={user}
                    handleLogout={handleLogout}
                    color={FONT_COLOR}
                  />
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container justifyContent="space-around">
                <Grid item xs={12} sm={4} md={6}>
                  <Box display="flex" justifyContent="center">
                    <LinkButtonWithIcon
                      href="/ItemSearchPage"
                      endIcon={
                        <SearchIcon color="secondary" fontSize="small" />
                      }
                      color={FONT_COLOR}
                    >
                      商品を探す
                    </LinkButtonWithIcon>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={6}>
                  <Box display="flex" justifyContent="center">
                    <LinkButtonWithIcon
                      href="/AddNewLayoutPage"
                      endIcon={
                        <AddAPhotoIcon color="secondary" fontSize="small" />
                      }
                      color={FONT_COLOR}
                    >
                      レイアウトを投稿
                    </LinkButtonWithIcon>
                  </Box>
                </Grid>
                {!isSmallScreen && isMediumScreen && (
                  <Grid item sm={4}>
                    <Box display="flex" justifyContent="center">
                      <HeaderAuthButton
                        user={user}
                        handleLogout={handleLogout}
                        color={FONT_COLOR}
                      />
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Grid>
            {!isMediumScreen && (
              <Grid item xs={2}>
                <Box display="flex" justifyContent="flex-end">
                  <HeaderAuthButton
                    user={user}
                    handleLogout={handleLogout}
                    color={FONT_COLOR}
                  />
                </Box>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </div>
    </AppBar>
  );
};

export default Header;
