import React from 'react';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Search as SearchIcon,
  AddAPhoto as AddAPhotoIcon,
} from '@mui/icons-material';

import { userState } from '@/components/shares/atoms/state/userState';
import { LinkButtonWithIcon } from '@/components/shares/molecules/LinkButtonWithIcon';
import HeaderAuthButton from '@/components/shares/molecules/HeaderAuthButton';

const FONT_COLOR = '#d6dade';

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
    <AppBar
      position="fixed"
      style={isSmallScreen ? {} : { paddingLeft: '10%', paddingRight: '10%' }}
    >
      <Toolbar variant="dense">
        <Grid container alignItems="center">
          <Grid item xs={12} sm={12} md={2}>
            <Box
              display={'flex'}
              justifyContent="space-between"
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
              {isMediumScreen && (
                <HeaderAuthButton
                  user={user}
                  handleLogout={handleLogout}
                  color={FONT_COLOR}
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <Box display="flex" justifyContent="center">
                  <LinkButtonWithIcon
                    href="/ItemSearchPage"
                    endIcon={<SearchIcon color="secondary" fontSize="small" />}
                    color={FONT_COLOR}
                  >
                    商品を探す
                  </LinkButtonWithIcon>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
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
            </Grid>
          </Grid>
          {!isMediumScreen && (
            <Grid item xs={2}>
              <HeaderAuthButton
                user={user}
                handleLogout={handleLogout}
                color={FONT_COLOR}
              />
            </Grid>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
