import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import React, { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';

import { useGetItemDataApi } from '@/hooks/api/useItemShowApi';
import { useFlashBackgroundOnRender } from '@/hooks/useFlashBackgroundOnRender';

import { ItemBaseData } from '@/components/shares/organisms/ItemBaseData';
import { LayoutImageList } from '@/components/shares/organisms/LayoutImageList';
import { ItemDetailHeader } from '@/components/shares/molecules/ItemDetailHeader';
import { itemDetailState } from '@/components/shares/atoms/state/itemDetailState';
import { ItemDetailPageButtons } from '@/components/pages/ItemPage/ItemDetailPageButtons';
import { CategoryDetailSwitcher } from '@/components/shares/organisms/CategoryDetailSwitcher';

export const ItemPage = () => {
  const router = useRouter();
  const itemId = router.query.itemId;
  const itemDetail = useRecoilValue(itemDetailState);
  const backgroundColor = useFlashBackgroundOnRender();

  useGetItemDataApi(itemId as string);

  console.log(itemDetail);

  return useMemo(() => {
    if (itemDetail) {
      return (
        <div className="flashBackground" style={{ backgroundColor }}>
          <Box sx={{ width: '80%', margin: '0 auto' }}>
            <Grid container>
              <Grid item xs={12} sm={7}>
                {/* 商品画像と商品名とブランド名*/}
                <ItemDetailHeader
                  itemName={itemDetail.itemName}
                  brandName={itemDetail.brandName}
                  imageName={itemDetail.imageName}
                />
              </Grid>
              <Grid xs={12} sm={5}>
                {/* いいね　と　共有ボタンの表示コンポーネント　共有時の情報を渡す */}
                <ItemDetailPageButtons
                  itemId={itemDetail.itemId}
                  itemName={itemDetail.itemName}
                  user={itemDetail.user}
                />
                {/* 商品の基本情報 */}
                <ItemBaseData
                  price={itemDetail.price}
                  openSizes={itemDetail.openSize}
                  storageSizes={itemDetail.storageSize}
                  weight={itemDetail.weight}
                />
                {/* カテゴリー毎の詳細情報 */}
                <CategoryDetailSwitcher
                  categoryName={itemDetail.categoryName}
                />
              </Grid>
              <Grid item xs={12}>
                {/* レイアウトの画像リスト */}
                <LayoutImageList
                  layouts={itemDetail.layouts}
                  height={'700px'}
                />
              </Grid>
            </Grid>
          </Box>
        </div>
      );
    } else {
      return null;
    }
  }, [itemDetail]);
};
export default ItemPage;
