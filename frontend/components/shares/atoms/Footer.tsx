import { Box } from '@mui/system';
import React from 'react';
import Typography from '@mui/material/Typography';

/**
 * フッター
 */
export const Footer = () => {
  return (
    <Box
      display={'flex'}
      pt={'50'}
      pb={'25'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Typography variant="body1">Copyright © 2023 Ren Munetsuna</Typography>
    </Box>
  );
};
