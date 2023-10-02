import React, { FC } from 'react';
import { Box } from '@mui/system';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import NextLink from 'next/link';

import { LAYOUT_IMAGE_BASE_URL } from '@/components/constants';
import { FittedImage } from '../atoms/FittedImage';

type LayoutImageListProps = {
  layouts: Array<{
    layoutId: number;
    favoriteCount: number;
    viewCount: number;
  }>;
};

/**
 * 商品に関連するレイアウトをリストで表示する
 * スクロール可能な画像リスト
 *
 * @param layouts layouts{ layoutId: number; favoriteCount: number; viewCount: number;}
 * @example
 * <LayoutImageList
 * layouts={layouts}
 * height={'500px'}
 * />
 */
export const LayoutImageList: FC<LayoutImageListProps> = ({ layouts = [] }) => {
  return (
    <Box>
      <ImageList
        sx={{ width: 'auto', height: 'auto' }}
        cols={layouts.length + 10}
      >
        {layouts.map((layout) => (
          <ImageListItem key={layout.layoutId}>
            <NextLink href={`/layouts/${layout.layoutId}`}>
              <FittedImage
                src={`${LAYOUT_IMAGE_BASE_URL}${layout.layoutId}.jpg`}
                alt={`Layout ${layout.layoutId}`}
                containerWidth={200}
                containerHeight={200}
              />
            </NextLink>
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};
