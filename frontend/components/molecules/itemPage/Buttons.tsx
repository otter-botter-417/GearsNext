import { Box } from "@mui/material";
import { FC } from "react";
import { HeartIcon } from "../../atoms/button/HeartIconButton";
import { ShareIconButton } from "../../atoms/button/ShareIconButton";

type Props = { itemName: string; url: string };

export const Buttons: FC<Props> = (props) => {
  const { itemName, url } = props;

  return (
    <Box>
      {/* いいねアイコン */}
      <HeartIcon />
      <ShareIconButton url={url} title={itemName} />
    </Box>
  );
};
