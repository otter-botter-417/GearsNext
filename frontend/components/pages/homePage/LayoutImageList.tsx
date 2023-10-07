import { ImageListItem, ImageListItemBar } from '@mui/material';
import React, { FC } from 'react';
import NextLink from 'next/link';

import { HomeLayoutType } from '@/components/types/HomeLayoutType';
import Image from 'next/image';

type LayoutImageListProps = {
  item: HomeLayoutType;
};

export const LayoutImageList: FC<LayoutImageListProps> = ({ item }) => {
  return (
    <NextLink href={`/layouts/${item.layoutId}`}>
      <ImageListItem>
        <Image
          src={item.imageName}
          alt={item.layoutId}
          priority
        />
        <ImageListItemBar title={item.userName} position="below" />
      </ImageListItem>
    </NextLink>
  );
};
