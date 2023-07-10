import React, { ReactNode } from "react";
import { Box, Grid } from "@mui/material";

// ReactNodeはReactの型定義の一部で、React要素を表すための型
interface RegisterPageTemplateProps {
  children: ReactNode;
}

const RegisterPageTemplate: React.FC<RegisterPageTemplateProps> = ({
  children,
}) => {
  return (
    <Box display="flex" justifyContent="center" sx={{ pt: "5%" }}>
      <Grid container justifyContent="center" item xs={12} sm={4}>
        {children}
      </Grid>
    </Box>
  );
};

export default RegisterPageTemplate;
