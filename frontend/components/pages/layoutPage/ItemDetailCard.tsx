import React, { FC } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

import { ITEM_IMAGE_BASE_URL } from '@/components/constants';
import { ImageMapType } from '@/components/types/ImageMapType';

type ItemDetailCardProps = {
  item: ImageMapType;
};

/**
 * このコンポーネントは商品詳細のカードを表示します。
 * 現在は商品画像のみを表示しています。
 *
 * @param {ImageMapType} item - 表示する商品のデータ
 * @returns {JSX.Element} 商品詳細のカード
 */
export const ItemDetailCard: FC<ItemDetailCardProps> = ({ item }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        alt={item.itemName}
        image={`${ITEM_IMAGE_BASE_URL}${item.itemId}.jpg`}
      />
    </Card>
  );
};
