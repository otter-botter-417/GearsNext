import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { userState } from '@/components/atoms/state/userAuth.State';
import { auth } from './firebase';

const Header = () => {
  const user = useRecoilState(userState);
  return (
    <AppBar position="fixed">
      <Toolbar variant="dense">
        <IconButton edge="start" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Link href={`/`}>
          <Typography variant="h4">Gears</Typography>
        </Link>
        <div>
          {user[0] ? (
            <>
              <button
                onClick={async () => {
                  try {
                    await auth.signOut();
                    console.log('Signed out successfully');
                  } catch (error) {
                    console.error('Error signing out:', error);
                  }
                }}
              >
                サインアウト
              </button>
            </>
          ) : (
            <Link href={`/UserLoginPage`}>ログイン</Link>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
