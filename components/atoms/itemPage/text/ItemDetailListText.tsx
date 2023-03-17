import { Box, Typography } from "@mui/material";
import { FC } from "react";

type itemNameType = {
  text: string;
};

export const ItemDetailListText: FC<itemNameType> = (props) => {
  const { text } = props;
  return (
    <Box>
      <Typography variant="h6" padding={" 5px 0px 3px 15px"} fontSize={15}>
        {text}
      </Typography>
    </Box>
  );
};
