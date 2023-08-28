import React from 'react';
import { Box, Grid } from '@mui/material';

interface RegisterPageTemplateProps {
  children: React.ReactNode;
}

const RegisterPageTemplate = ({ children }: RegisterPageTemplateProps) => {
  return (
    <Box display="flex" justifyContent="center" sx={{ pt: '5%' }}>
      <Grid container justifyContent="center" item xs={12} sm={4}>
        {children}
      </Grid>
    </Box>
  );
};

export default RegisterPageTemplate;
