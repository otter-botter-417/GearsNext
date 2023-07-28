import { Box } from "@mui/material";
import { FC } from "react";
import { HeartIcon } from "../../atoms/button/HeartIconButton";
import { ShareIconButton } from "../../atoms/button/ShareIconButton";
import { InventoryIconButton } from "@/components/atoms/button/InventoryIconButton";

type Props = { itemName: string; url: string;itemId: number;};

export const Buttons: FC<Props> = (props) => {
  const { itemName, url, itemId } = props;

  return (
    <Box>
      {/* いいねアイコン */}
      <HeartIcon />
      <ShareIconButton url={url} title={itemName} />
      <InventoryIconButton  itemId={itemId} />
    </Box>
  );
};
