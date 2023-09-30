import { ImageListItem, ImageListItemBar } from '@mui/material';
import React, { FC } from 'react';
import Link from '@mui/material/Link';
import { HomeLayoutType } from '@/components/types/HomeLayoutType';

type LayoutImageListProps = {
  item: HomeLayoutType;
};

export const LayoutImageList: FC<LayoutImageListProps> = ({ item }) => {
  return (
    <Link href={`/layouts/${item.layoutId}`}>
      <ImageListItem>
        <img src={item.imageName} alt={item.layoutId} loading="lazy" />
        <ImageListItemBar title={item.userName} position="below" />
      </ImageListItem>
    </Link>
  );
};
