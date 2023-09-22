import React, { FC } from 'react';
import Image from 'next/image';
import { ImageList, ImageListItem } from '@mui/material';

import { ITEM_IMAGE_BASE_URL } from '@/components/constants';
import { ItemDataTypes } from '@/components/types/ItemDataTypes';

type ImageGridListProps = {
  itemList: ItemDataTypes[];
  imageSize: number;
  cols: number;
};

/**
 * このコンポーネントは、受け取った商品リストから、画像をグリッドで表示するUIを提供します。
 *
 * @param {ItemDataTypes[]} itemList - 表示する商品のリスト
 * @param {number} imageSize - 画像のサイズ（縦・横は同じサイズ）
 * @param {number} cols - 一行に表示する画像の数
 *
 * @returns {JSX.Element} 商品画像をグリッドで表示するコンポーネントを含むReact要素
 *
 * @example
 * <ImageGridList itemList={itemList} imageSize={100} cols={5} />
 */
const ImageGridList: FC<ImageGridListProps> = ({
  itemList,
  imageSize,
  cols,
}) => {
  return (
    <ImageList sx={{ width: 'auto', height: 'auto' }} cols={cols}>
      {itemList.map((item) => (
        <ImageListItem key={item.itemId}>
          <Image
            src={`${ITEM_IMAGE_BASE_URL}${item.itemId}.jpg`}
            alt={`${ITEM_IMAGE_BASE_URL}${item.itemId}.jpg`}
            layout="responsive"
            width={imageSize}
            height={imageSize}
            loading="lazy"
            style={{
              objectFit: 'cover',
            }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ImageGridList;
