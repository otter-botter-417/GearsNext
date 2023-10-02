import { FC } from 'react';
import NextLink from 'next/link';

import Image from 'next/legacy/image';
import { Box, Grid } from '@mui/material';

import { ItemDataType } from '@/components/types/ItemDataType';
import { EllipsisTypography } from '../atoms/EllipsisTypography';

type ItemThumbnailProps = {
  ItemData: ItemDataType;
};

/**
 * 商品のサムネイル画像と基本情報を表示する
 * - 商品画像
 * - ブランド名
 * - 商品名
 * - 価格
 *
 * @param itemData 商品データ
 * @returns 商品のサムネイル
 */
export const ItemThumbnail: FC<ItemThumbnailProps> = ({ ItemData }) => {
  return (
    <Grid
      container
      spacing={3}
      minWidth={130}
      alignItems="center"
      justifyContent="center"
    >
      {/* 商品画像 */}
      <Grid item xs={12} sm={12} md={12}>
        <NextLink href={`/items/${ItemData.itemId}`}>
          <Image
            src={ItemData.imageName}
            alt="item image"
            layout="responsive"
            width={500}
            height={500}
            objectFit="contain"
            priority
          />
        </NextLink>
      </Grid>

      {/* 基本情報 */}
      <Box display="flex" flexDirection="column" alignItems="center">
        <EllipsisTypography text={ItemData.brandName} />
        <EllipsisTypography text={ItemData.itemName} variant={'body2'} />
        <EllipsisTypography
          text={`¥${ItemData.price.toLocaleString()}`}
          variant={'body2'}
        />
      </Box>
    </Grid>
  );
};
