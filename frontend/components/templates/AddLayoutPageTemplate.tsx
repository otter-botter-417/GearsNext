import { Box, Grid } from '@mui/material';
import React, { FC, ReactNode } from 'react';

interface LayoutTemplateProps {
  top: ReactNode;
  leftSide: ReactNode;
  rightSide: ReactNode;
  bottom: ReactNode;
}

/**
 * レイアウトページのテンプレート
 * @param top
 * @param leftSide
 * @param rightSide
 * @param bottom
 *
 * @example
 * <LayoutPageTemplate leftSide={leftSide} rightSide={rightSide} />
 */
export const AddLayoutPageTemplate: FC<LayoutTemplateProps> = ({
  top,
  leftSide,
  rightSide,
  bottom,
}) => {
  return (
    <Box sx={{ width: '80%', margin: '0 auto' }}>
      <Box display="flex" justifyContent="end" marginBottom={2}>
        {top}
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {leftSide}
        </Grid>
        <Grid item xs={12} md={4}>
          <Box marginLeft={{ md: 2 }}>{rightSide}</Box>
        </Grid>
      </Grid>
      <Box>{bottom}</Box>
    </Box>
  );
};
