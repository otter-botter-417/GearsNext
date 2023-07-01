import React, { ReactNode } from "react";
import { Box, Grid } from "@mui/material";

// ReactNodeはReactの型定義の一部で、React要素を表すための型
interface AddNewItemPageTemplateProps {
  children: ReactNode;
}

const AddNewItemPageTemplate: React.FC<AddNewItemPageTemplateProps> = ({
  children,
}) => {
  return (
    <Box component="form" display="flex" justifyContent="center">
      <Grid container justifyContent="center" item xs={12} sm={6}>
        {children}
      </Grid>
    </Box>
  );
};

export default AddNewItemPageTemplate;
