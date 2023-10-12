import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { Box } from '@mui/material';

import { layoutDetailState } from '@/components/shares/atoms/state/layoutDetailState';

import { ImageGridList } from '@/components/shares/molecules/ImageGridList';
import { ErrorAlert } from '@/components/shares/molecules/ErrorAlert';

/**
 * このコンポーネントは、レイアウトページで選択された商品の画像を表示するためのUIを提供します。
 * - ImageGridList: selectedItemsListState ステートから取得した商品の画像をグリッド形式で表示します。
 *
 * @returns {JSX.Element} 選択された商品の画像を表示するコンポーネントを含むReact要素
 */
export const LayoutPageSelectedItemImageList: FC = () => {
  const layoutDetail = useRecoilValue(layoutDetailState);
  if (!layoutDetail) return null;
  return (
    <Box
      sx={{
        overflowY: 'scroll',
        height: '100',
        width: '100%',
      }}
    >
      <ErrorAlert />
      <ImageGridList
        itemList={layoutDetail.items}
        imageSize={200}
        cols={layoutDetail.items.length}
        isLink={true}
      />
    </Box>
  );
};
