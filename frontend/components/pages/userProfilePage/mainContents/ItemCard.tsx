import React, { FC } from 'react';
import NextLink from 'next/link';
import Image from 'next/legacy/image';

import { ContentType } from '@/components/types/ContentType';

type ItemCardProps = {
  id: number;
  type: ContentType;
  imageName: string;
};

/**
 * 特定のアイテム（item/layout）のサムネイル画像とリンクを表示します。
 * 画像は Next.js の Image コンポーネントを使用して最適化されます。
 *
 * @param id: アイテムの一意識別子
 * @param type: アイテムのタイプ（'item' または 'layout'）
 * @param imageName: 画像のURL
 * 
 * @returns 特定のアイテム（item/layout）のサムネイル画像とリンクを表示するコンポーネント。
 */
const ItemCard: FC<ItemCardProps> = ({ id, type, imageName }) => {
  const pageUrl = `/${type}s/${id}`;
  return (
    <>
      <NextLink href={pageUrl}>
        <Image
          src={imageName}
          alt={`${type} image`}
          layout="responsive"
          width={300}
          height={300}
          objectFit="contain"
          priority
        />
      </NextLink>
    </>
  );
};

export default ItemCard;
