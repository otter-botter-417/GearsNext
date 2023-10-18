import React from 'react';
import fetch from 'node-fetch';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { GetStaticPropsContext } from 'next';

import { useGetItemDataApi } from '@/hooks/api/useItemShowApi';

import { ItemBaseData } from '@/components/shares/organisms/ItemBaseData';
import { LayoutImageList } from '@/components/shares/organisms/LayoutImageList';
import { ItemDetailHeader } from '@/components/pages/ItemPage/ItemDetailHeader';
import { ItemDetailPageButtons } from '@/components/pages/ItemPage/ItemDetailPageButtons';
import { CategoryDetailSwitcher } from '@/components/shares/organisms/CategoryDetailSwitcher';

import { ItemDataType } from '@/components/types/ItemDataType';
import { API_BASE_URL, DEFAULT_PAGE_WIDTH } from '@/components/constants';

interface ItemData {
  data: {
    data: ItemDataType;
  };
}

interface ApiResponse {
  data: ItemDataType[];
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
    revalidate: 1800,
  };
}

export async function getStaticPaths() {
  // APIを呼び出してすべてのアイテムのIDを取得
  const response = await fetch(API_BASE_URL + 'items');
  const data = (await response.json()) as ApiResponse;

  // itemsを明示的に型付け
  const items: ItemDataType[] = data.data;

  // 取得したIDを使用して、paths配列を生成
  const paths = items.map((item: ItemDataType) => ({
    // params: { itemId: item.itemId.toString() },
    params: { itemId: '1' },
  }));

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

  useGetItemDataApi(itemId as string);
  return (
    <Box
      sx={{ width: '100%', margin: '0 auto', maxWidth: { DEFAULT_PAGE_WIDTH } }}
    >
      <Grid container maxWidth={DEFAULT_PAGE_WIDTH} margin="0 auto">
        <Grid item xs={12} md={8}>
          {/* 商品画像と商品名とブランド名*/}
          <ItemDetailHeader
            itemName={itemDetail.itemName}
            brandName={itemDetail.brandName}
            imageName={itemDetail.imageName}
          />
        </Grid>
        <Grid item sm={12} md={4}>
          {/* いいね　と　共有ボタンの表示コンポーネント　共有時の情報を渡す */}
          <Box display={'flex'} minHeight={'50px'}>
            <ItemDetailPageButtons
              itemId={itemId}
              itemName={itemDetail.itemName}
            />
          </Box>
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
          <LayoutImageList layouts={itemDetail.layouts} />
        </Grid>
      </Grid>
    </Box>
  );
};
export default ItemPage;
