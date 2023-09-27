import React from 'react';
import fetch from 'node-fetch';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { GetStaticPropsContext } from 'next';

import { useGetItemDataApi } from '@/hooks/api/useItemShowApi';
import { useFlashBackgroundOnRender } from '@/hooks/useFlashBackgroundOnRender';

import { ItemBaseData } from '@/components/shares/organisms/ItemBaseData';
import { LayoutImageList } from '@/components/shares/organisms/LayoutImageList';
import { ItemDetailHeader } from '@/components/pages/ItemPage/ItemDetailHeader';
import { ItemDetailPageButtons } from '@/components/pages/ItemPage/ItemDetailPageButtons';
import { CategoryDetailSwitcher } from '@/components/shares/organisms/CategoryDetailSwitcher';

import { ItemDataType } from '@/components/types/ItemDataType';
import { API_BASE_URL } from '@/components/constants';

interface ItemData {
  data: {
    data: ItemDataType;
  };
}

// SSG　静的サイト生成のための関数　ビルド時に取得したデータをpropsとして渡す
export async function getStaticProps(context: GetStaticPropsContext) {
  const itemId = context.params?.itemId;
  const response = await fetch(API_BASE_URL + `items/${itemId}`);
  const itemData = (await response.json()) as ItemData;
  return {
    props: {
      itemDetail: itemData.data,
    },
    revalidate: 3600, // 60秒間隔で再生成
  };
}

export async function getStaticPaths() {
  const paths = [{ params: { itemId: '1' } }, { params: { itemId: '2' } }];

  return {
    paths,
    fallback: 'blocking',
  };
}

/**
 * 商品詳細ページ
 * ユーザーの商品に対する状態(いいね、持っているもの)以外は静的サイト生成で表示
 * ユーザーの商品に対する状態はクライアントサイドで取得
 *
 * @param itemDetail
 * @returns
 * @example
 * <ItemPage itemDetail={itemDetail} />
 */
export const ItemPage = ({ itemDetail }: { itemDetail: ItemDataType }) => {
  const router = useRouter();
  const itemId = router.query.itemId;
  const backgroundColor = useFlashBackgroundOnRender();

  useGetItemDataApi(itemId as string);

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
              itemId={itemId}
              itemName={itemDetail.itemName}
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
              itemAttributes={itemDetail.itemAttributes}
            />
          </Grid>
          <Grid item xs={12}>
            {/* レイアウトの画像リスト */}
            {/* <LayoutImageList layouts={itemDetail.layouts} height={'700px'} /> */}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
export default ItemPage;
