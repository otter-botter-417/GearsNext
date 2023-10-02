import { ImageListItem, Typography, Box } from '@mui/material';
import React, { FC } from 'react';
import { HomeLayoutType } from '@/components/types/HomeLayoutType';
import { HomeItemType } from '@/components/types/HomeItemType';
import NextLink from 'next/link';
import { EllipsisTypography } from '@/components/shares/atoms/EllipsisTypography';
import Image from 'next/image';

type ItemImageListProps = {
  data: HomeItemType | HomeLayoutType;
};

export const ItemImageList: FC<ItemImageListProps> = ({ data }) => {
  let title: string;
  let subtitle: string;
  let link: string;

  if ('itemId' in data) {
    title = data.itemName;
    subtitle = data.brandName;
    link = `/items/${data.itemId}`;
  } else if ('layoutId' in data) {
    title = data.userName;
    subtitle = '';
    link = `/layouts/${data.layoutId}`;
  } else {
    return null;
  }

  return (
    <ImageListItem
      style={{ width: '200px', height: '250px', overflow: 'hidden' }}
    >
      <NextLink href={link}>
        <div style={{ position: 'relative', height: '200px' }}>
          <Image
            src={data.imageName}
            alt={title}
            loading="eager"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain', // 画像を拡大縮小して容器にフィットさせる
            }}
          />
        </div>
        <div>
          {/* テキストのコンテナ, 高さを固定 */}
          <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>
            <EllipsisTypography text={title} />
            <EllipsisTypography text={subtitle} />
          </Box>
        </div>
      </NextLink>
    </ImageListItem>
  );
};
