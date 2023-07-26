import { FC } from "react";

import { OpenSize } from "../../../atoms/itemPage/ability/OpenSize";
import { StorageSize } from "../../../atoms/itemPage/ability/StorageSize";
import { Weight } from "../../../atoms/itemPage/ability/Weight";
import { Capacity } from "../../../atoms/itemPage/ability/Capacity";
import { Price } from "../../../atoms/itemPage/ability/Price";
import { InnerTent } from "../../../atoms/itemPage/ability/InnerTent";
import { GrandSheet } from "../../../atoms/itemPage/ability/GrandSheet";
import { Accessories } from "../../../atoms/itemPage/ability/Accessories";
import { AmazonLink } from "../../../atoms/itemPage/ability/AmazonLink";
import { Fabrics } from "../../../atoms/itemPage/ability/Fabrics";
import { Box } from "@mui/material";
import { Buttons } from "../Buttons";
import { itemDatas } from "../../../../typs/itemDatas";

export const TentAbilitys: FC<itemDatas> = (props) => {
  const { itemDatas } = props;
  const err = { wide: 255, depth: 245, high: 120 };

  return (
    <Box>
      {/* いいね　と　共有ボタンの表示コンポーネント　共有時の情報を渡す */}
      <Buttons
        itemName={itemDatas.item_name}
        url={
          "https://zenn.dev/ogakuzuko/articles/react-typescript-for-beginner"
        }
      />

      {/* テント各種データ */}
      <Price price={itemDatas.price} />
      {/* <AmazonLink amazonUrl={itemDatas.amazonUrl} /> */}
      <OpenSize
        open_width={itemDatas.open_depth ?? err}
        open_depth={itemDatas.open_depth ?? err}
        open_height={itemDatas.open_height ?? err}
      />
      <StorageSize
        storage_width={itemDatas.storage_width ?? err}
        storage_depth={itemDatas.storage_depth ?? err}
        storage_height={itemDatas.storage_height ?? err}
      />
      <Weight weight={itemDatas.weight ?? 0} />
      <Capacity capacity={itemDatas.capacity ?? 0} />
      <InnerTent innerTent={itemDatas.innerTent ?? "なし"} />
      <GrandSheet grandSheet={itemDatas.grandSheet ?? "なし"} />
      <Fabrics fabrics={itemDatas.fabrics} />
      {/* <Accessories accessories={itemDatas.itemAbility?.accessories} /> */}
    </Box>
  );
};
