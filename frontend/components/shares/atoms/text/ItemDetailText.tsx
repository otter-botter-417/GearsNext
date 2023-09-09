import { Box, Typography } from "@mui/material";
import { FC } from "react";

type itemNameType = {
  text: string;
};

export const ItemDetailText: FC<itemNameType> = (props) => {
  const { text } = props;
  return (
    <Box>
      <Typography variant="h6" padding={"10px"} fontSize={15}>
        {text}
      </Typography>
    </Box>
  );
};
