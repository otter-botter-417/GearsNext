import React, { FC } from 'react';
import { FittedImage } from './FittedImage';

// 画像を表示する共通のコンポーネント
type ItemImageProps = {
  item: {
    itemId: number;
    imageName: string;
  };
  imageSize: number;
};

/**
 * コンポーネントは、商品の画像を表示します
 *
 * @param item - 商品情報。itemIdとimageNameが含まれる。
 * @param imageSize - 表示する画像のサイズ
 * @returns {JSX.Element} 商品の画像
 */
export const ItemImage: FC<ItemImageProps> = ({ item, imageSize }) => {
  return (
    <FittedImage
      src={item.imageName}
      alt={`${item.itemId}`}
      containerWidth={imageSize}
      containerHeight={imageSize}
    />
  );
};
