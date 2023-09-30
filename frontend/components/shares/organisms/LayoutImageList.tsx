import React, { FC } from 'react';
import { Box } from '@mui/system';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Link from '@mui/material/Link';

import { LAYOUT_IMAGE_BASE_URL } from '@/components/constants';
import { FittedImage } from '../atoms/FittedImage';

type LayoutImageListProps = {
  layouts: Array<{
    layoutId: number;
    favoriteCount: number;
    viewCount: number;
  }>;
  height: string;
};

/**
 * 商品に関連するレイアウトをリストで表示する
 * スクロール可能な画像リスト
 *
 * @param layouts layouts{ layoutId: number; favoriteCount: number; viewCount: number;}
 * @param height レイアウトの高さ
 * @example
 * <LayoutImageList
 * layouts={layouts}
 * height={'500px'}
 * />
 */
export const LayoutImageList: FC<LayoutImageListProps> = ({
  layouts = [],
  height,
}) => {
  return (
    <Box
      sx={{
        overflowY: 'scroll',
        height: height,
        width: '100%',
      }}
    >
      <ImageList sx={{ width: 'auto', height: 'auto' }} cols={3}>
        {layouts.map((layout) => (
          <ImageListItem key={layout.layoutId}>
            <Link href={`/layouts/${layout.layoutId}`}>
              <FittedImage
                src={`${LAYOUT_IMAGE_BASE_URL}${layout.layoutId}.jpg`}
                alt={`Layout ${layout.layoutId}`}
                containerWidth={200}
                containerHeight={200}
              />
            </Link>
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};
