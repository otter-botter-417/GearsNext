import React, { FC } from 'react';
import Link from '@mui/material/Link';

import { ImageMapType } from '@/components/types/ImageMapType';

import { ItemDetailCard } from './ItemDetailCard';
import { LabelItem } from '../addLayoutPage/LabelItem';

type LayoutLabelItemProps = {
  tagPosition: ImageMapType;
};

/**
 * このコンポーネントは、レイアウト画像上の各タグ（商品ラベル）を表示するためのUIを提供します。
 * - Link: 商品詳細ページへのリンクを提供します。
 * - LabelItem: 商品ラベルを表示します。
 * - ItemDetailCard: 商品詳細カードを表示します。
 *
 * @param tagPosition - 商品ラベルの位置と関連データ
 * @returns {JSX.Element}
 */
export const LayoutLabelItem: FC<LayoutLabelItemProps> = ({ tagPosition }) => {
  return (
    <Link href={`/items/${tagPosition.itemId}`}>
      <LabelItem item={tagPosition}>
        <ItemDetailCard item={tagPosition} />
      </LabelItem>
    </Link>
  );
};
