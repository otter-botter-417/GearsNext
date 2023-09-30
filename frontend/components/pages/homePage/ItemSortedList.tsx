import { Box, ImageList } from '@mui/material';
import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { ItemImageList } from './ItemImageList';
import {
  HomeStateType,
  homeDataState,
} from '@/components/shares/atoms/state/homeDataState';

type ItemSortedListProps = {
  value: keyof HomeStateType;
};

export const ItemSortedList: FC<ItemSortedListProps> = ({ value }) => {
  const homeData = useRecoilValue(homeDataState);
  const selectedData = homeData[value];

  if (!selectedData) {
    return null;
  }

  return (
    <Box sx={{ overflowX: 'auto' }}>
      <ImageList cols={10} gap={8}>
        {selectedData.map((data, index) => (
          <ItemImageList data={data} key={index} />
        ))}
      </ImageList>
    </Box>
  );
};
