import Image from 'next/image';
import React, { FC } from 'react';

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
  console.log(item);
  return (
    <Image
      src={item.imageName}
      alt={`${item.itemId}`}
      layout="responsive"
      width={imageSize}
      height={imageSize}
      loading="lazy"
      style={{
        objectFit: 'cover',
      }}
    />
  );
};
