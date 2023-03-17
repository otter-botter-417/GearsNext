import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import themeOptions from "@/styles/themes/themeOptions";
import { useItemApi } from "../../components/api/useItemApi";
import { ItemDataTypes } from "@/components/types/ItemDataTypes";
import { CategorySelecter } from "@/components/organisms/itemPage/CategorySelecter";
import { ItemNameWithImage } from "@/components/molecules/itemPage/ItemNameWithImage";

function ItemPage() {
  const router = useRouter();
  const itemId = router.query.itemId;
  const [itemDatas, setItemDatas] = useState<ItemDataTypes | null>(null);
  const { getItemData } = useItemApi();

  useEffect(() => {
    if (itemId) {
      getItemData({ _id: itemId }).then((response) => {
        setItemDatas(response.data[0]);
      });
    }
  }, [itemId]);
  if (!itemDatas) {
    return null; // ローディングスピナーの代わりに何も表示しない
  }

  // const matches = useMediaQuery("(min-width:577px)");
  const matches = true;

  // レンダリングの内容は変更しない
  return (
    <ThemeProvider theme={themeOptions}>
      <Box
        sx={{
          padding: 10,
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <ItemNameWithImage
          itemName={itemDatas.itemName || ""}
          brandName={itemDatas.brandName || ""}
          imagePath={itemDatas.imagePath || ""}
          amazonUrl={itemDatas.amazonUrl || ""}
          matches={matches}
        />
        <CategorySelecter itemDatas={itemDatas} />
      </Box>
    </ThemeProvider>
  );
}

export default ItemPage;
