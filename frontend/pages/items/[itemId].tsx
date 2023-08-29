import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import themeOptions from '@/styles/themes/themeOptions';
import { ItemDataTypes } from '@/components/types/ItemDataTypes';
import { CategorySelecter } from '@/components/organisms/itemPage/CategorySelecter';
import { ItemNameWithImage } from '@/components/shares/molecules/itemPage/ItemNameWithImage';
import { useGetItemDataApi } from '@/hooks/useGetItemDataApi';
import { useIncrementViewCountApi } from '@/hooks/useIncrementViewCountApi';
import { Buttons } from '@/components/shares/molecules/itemPage/Buttons';

function ItemPage() {
  const router = useRouter();
  const itemId = router.query.itemId;
  const [itemDatas, setItemDatas] = useState<ItemDataTypes | null>(null);

  useEffect(() => {
    if (itemId) {
      useIncrementViewCountApi(itemId);
      useGetItemDataApi(itemId).then((response) => {
        setItemDatas(response[0]);
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
          padding: 3,
          display: 'flex',
          justifyContent: 'space-evenly',
        }}
      >
        <ItemNameWithImage
          itemName={itemDatas.item_name || ''}
          brandName={itemDatas.brand.brand_name || ''}
          imagePath={itemDatas.image_name || ''}
          asin={itemDatas.asin || ''}
          matches={matches}
        />
        {/* いいね　と　共有ボタンの表示コンポーネント　共有時の情報を渡す */}
        <Buttons
          itemName={itemDatas.item_name}
          url={
            'https://zenn.dev/ogakuzuko/articles/react-typescript-for-beginner'
          }
          // userId= {}
          itemId={itemDatas.item_id}
        />
        <CategorySelecter itemDatas={itemDatas} />
      </Box>
    </ThemeProvider>
  );
}

export default ItemPage;
