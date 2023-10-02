import { Box, Typography } from '@mui/material';
import React from 'react';
import { SortSelect } from './SortSelect';

export const HomeImageGrid = () => {
  return (
    <Box>
      <Box display="flex" justifyContent={'center'}>
        <Typography variant="h5">商品ランキング</Typography>
      </Box>
      <Box height="auto" justifyContent={'center'}>
        <SortSelect
          initialState="topViewedItems"
          tabKeys={['topViewedItems', 'topFavoriteItems', 'newlyArrivedItems']}
        />
      </Box>
      <Box display="flex" justifyContent={'center'}>
        <Typography variant="h5">レイアウトランキング</Typography>
      </Box>
      <Box height="auto" justifyContent={'center'}>
        <SortSelect
          initialState="topViewedLayouts"
          tabKeys={[
            'topViewedLayouts',
            'topFavoriteLayouts',
            'newlyArrivedLayouts',
          ]}
        />
      </Box>
    </Box>
  );
};
