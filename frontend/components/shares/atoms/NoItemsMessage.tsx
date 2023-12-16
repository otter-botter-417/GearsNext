import React from 'react';
import { Box, Typography } from '@mui/material';

/**
 * アイテムやレイアウトがない場合に表示されます。
 *
 * @returns アイテムやレイアウトがない場合に表示するメッセージ
 */
const NoItemsMessage = () => {
  return (
    <Box display="flex" justifyContent="center">
      <Typography variant="body1">
        対象の商品またはレイアウトがありません
      </Typography>
    </Box>
  );
};

export default NoItemsMessage;
