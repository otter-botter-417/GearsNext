import { Box, Typography } from "@mui/material";
import { FC } from "react";

type brandNameType = {
  brandName: string;
};

export const BrandName: FC<brandNameType> = (props) => {
  const { brandName } = props;
  return (
    <Box>
      <Typography variant="h4">{brandName}</Typography>
    </Box>
  );
};
