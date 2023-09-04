import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import themeOptions from '@/styles/themes/themeOptions';
import { ItemDataTypes } from '@/components/types/ItemDataTypes';
import { CategorySelecter } from '@/components/shares/organisms/CategorySelecter';
import { ItemNameWithImage } from '@/components/shares/molecules/itemPage/ItemNameWithImage';
import { useGetItemDataApi } from '@/hooks/useItemShowApi';
import { useIncrementViewCountApi } from '@/hooks/useIncrementViewCountApi';
import { Buttons } from '@/components/shares/molecules/itemPage/Buttons';
import { useRecoilValue } from 'recoil';
import { itemDetailState } from '@/components/shares/atoms/state/itemDetailState';

export const ItemPage = () => {
  const router = useRouter();
  const itemId = router.query.itemId;
  const itemDetail = useRecoilValue(itemDetailState);

  // カスタムフックをコンポーネントのトップレベルで呼び出す
  // const incrementResult = itemId
  //   ? useIncrementViewCountApi(itemId as string)
  //   : null;
  useGetItemDataApi(itemId as string);

  // const matches = useMediaQuery("(min-width:577px)");
  const matches = true;
  console.log(itemDetail);

  // レンダリングの内容は変更しない
  if (itemDetail && Object.keys(itemDetail).length > 0) {
    return (
      <ThemeProvider theme={themeOptions}>
        <Box
          sx={{
            padding: 3,
            display: 'flex',
            justifyContent: 'space-evenly',
          }}
        >
          <ItemNameWithImage matches={matches} />
          {/* いいね　と　共有ボタンの表示コンポーネント　共有時の情報を渡す */}
          <Buttons
            itemName={itemDetail.item_name}
            url={
              'https://zenn.dev/ogakuzuko/articles/react-typescript-for-beginner'
            }
            // userId= {}
            itemId={itemDetail.item_id}
          />
          {/* <CategorySelecter itemDetail={itemDetail} /> */}
        </Box>
      </ThemeProvider>
    );
  } else {
    return null; // またはローディングスピナー、エラーメッセージなど
  }
};
export default ItemPage;
