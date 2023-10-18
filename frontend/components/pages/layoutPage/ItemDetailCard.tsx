import React, { FC } from 'react';
import Card from '@mui/material/Card';

import { ImageMapType } from '@/components/types/ImageMapType';
import { FittedImage } from '@/components/shares/atoms/FittedImage';
import { Box } from '@mui/system';

type ItemDetailCardProps = {
  item: ImageMapType;
};

/**
 * このコンポーネントは商品詳細のカードを表示します。
 * 現在は商品画像のみを表示しています。
 * 急遽対応 imageUrlを後々変更
 *
 * @param {ImageMapType} item - 表示する商品のデータ
 * @returns {JSX.Element} 商品詳細のカード
 */
export const ItemDetailCard: FC<ItemDetailCardProps> = ({ item }) => {
  return (
    <Card>
      <Box display="flex" justifyContent="center" alignItems="flex-start">
        {item.imageUrl && (
          <FittedImage
            src={item.imageUrl}
            alt={item.itemName}
            containerWidth={100}
            containerHeight={100}
          />
        )}
      </Box>
    </Card>
  );
};