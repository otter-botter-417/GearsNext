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
    <>
      <NextLink href={`/items/${ItemData.itemId}`}>
        <Image
          src={ItemData.imageName}
          alt="item image"
          layout="responsive"
          width={300}
          height={300}
          objectFit="contain"
          priority
        />
      </NextLink>

      {/* 基本情報 */}
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <EllipsisTypography text={ItemData.brandName} />
        <EllipsisTypography text={ItemData.itemName} variant={'body2'} />
        <EllipsisTypography
          text={`¥${ItemData.price.toLocaleString()}`}
          variant={'body2'}
        />
      </Box>
    </>
  );
};
