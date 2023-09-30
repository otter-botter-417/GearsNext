import React, { FC, ReactNode } from 'react';
import { Box, Grid } from '@mui/material';

interface AddNewItemPageTemplateProps {
  children: ReactNode;
}

/**
 * このコンポーネントは、商品追加ページで用いるテンプレートです。
 *
 */
export const AddNewItemPageTemplate: FC<AddNewItemPageTemplateProps> = ({
  children,
}) => {
  return (
    <Box display="flex" justifyContent="center">
      <Grid container justifyContent="center" item xs={10} sm={5}>
        {children}
      </Grid>
    </Box>
  );
};
