import {
  ImageListItem,
  Typography,
  Box,
} from '@mui/material';
import React, { FC } from 'react';
import { HomeItemType } from '@/components/types/HomeItemType';
import Link from '@mui/material/Link';
import { HomeLayoutType } from '@/components/types/HomeLayoutType';

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
      <Link href={link} underline="none" color="primary">
        <div style={{ position: 'relative', height: '200px' }}>
          {' '}
          {/* img のコンテナ, 高さを固定 */}
          <img
            src={data.imageName}
            alt={title}
            loading="eager"
            style={{
              width: '100%', // 横幅を固定
              height: '100%', // 縦幅は自動
              position: 'absolute', // 絶対位置指定
              left: '50%', // 中央に配置
              top: '50%', // 中央に配置
              transform: 'translate(-50%, -50%)', // 中央に配置
              objectFit: 'contain', // 画像を拡大縮小して容器にフィットさせる
            }}
          />
        </div>
        <div style={{ height: '50px' }}>
          {' '}
          {/* テキストのコンテナ, 高さを固定 */}
          <Box
            display={'flex'}
            alignItems={'center'}
            flexDirection={'column'}
          >
            <Typography>{title}</Typography>
            <Typography>{subtitle}</Typography>
          </Box>
        </div>
      </Link>
    </ImageListItem>
  );
};
