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
import { DEFAULT_PAGE_WIDTH } from '@/components/constants';

const FONT_COLOR = '#dedee0';

const Header = () => {
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isAboveMd = useMediaQuery(theme.breakpoints.up('sm'));
  const isAboveLg = useMediaQuery(theme.breakpoints.up('md'));
  const isOnlyMediumScreen = isAboveMd && !isAboveLg;

  const handleLogout = () => {
    ['access_token', 'refresh_token'].forEach((item) =>
      localStorage.removeItem(item),
    );
    setUser(null);
    router.push('/');
  };

  return (
    <AppBar position="fixed" style={{ width: '100%' }}>
      <Box
        style={{ maxWidth: DEFAULT_PAGE_WIDTH, width: '80%', margin: '0 auto' }}
      >
        <Toolbar variant="dense">
          <Grid container alignItems="center">
            <Grid item xs={12} sm={12} md={2}>
              <Box
                display={'flex'}
                justifyContent={isMediumScreen ? 'space-around' : 'flex-start'}
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
              <Grid
                container
                justifyContent={
                  isMediumScreen ? 'space-around' : 'space-between'
                }
              >
                <Grid item xs={12} sm={4} md={6}>
                  <Box
                    display="flex"
                    justifyContent={
                      isOnlyMediumScreen ? 'flex-start' : 'center'
                    }
                  >
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
      </Box>
    </AppBar>
  );
};

export default Header;
