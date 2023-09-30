import React, { FC } from 'react';
import { ImageList, ImageListItem } from '@mui/material';

import Link from '@mui/material/Link';
import { ItemImage } from '../atoms/ItemImage';

type ImageGridListProps = {
  itemList: {
    itemId: number;
    imageName: string;
  }[];

  imageSize: number;
  cols: number;
  isLink?: boolean;
};

/**
 * このコンポーネントは、受け取った商品リストから、画像をグリッドで表示するUIを提供します。
 *
 * @param itemList - 表示する商品のリスト
 * @param imageSize - 画像のサイズ（縦・横は同じサイズ）
 * @param cols - 一行に表示する画像の数
 * @param isLink - 商品画像をクリックしたときに、商品詳細ページに遷移するかどうか
 *
 * @returns {JSX.Element} 商品画像をグリッドで表示するコンポーネントを含むReact要素
 *
 * @example
 * <ImageGridList itemList={itemList} imageSize={100} cols={5} />
 */
export const ImageGridList: FC<ImageGridListProps> = ({
  itemList,
  imageSize,
  cols,
  isLink = false,
}) => {
  return (
    <ImageList sx={{ width: 'auto', height: 'auto' }} cols={cols}>
      {itemList.map((item) => (
        <ImageListItem key={item.itemId}>
          {/* isLink が true の場合、画像を Link コンポーネントで囲む */}
          {isLink ? (
            <Link href={`/items/${item.itemId}`}>
              <ItemImage item={item} imageSize={imageSize} />
            </Link>
          ) : (
            <ItemImage item={item} imageSize={imageSize} />
          )}
        </ImageListItem>
      ))}
    </ImageList>
  );
};
