import { FC } from 'react';

import { Price } from '@/components/pages/ItemPage/Details/Price';
import { OpenSize } from '@/components/pages/ItemPage/Details/OpenSize';
import { StorageSize } from '@/components/pages/ItemPage/Details/StorageSize';
import { Weight } from '@/components/pages/ItemPage/Details/Weight';

type ItemBaseDataProps = {
  price: number;
  openSizes: {
    openWidth: number;
    openDepth: number;
    openHeight: number;
  };
  storageSizes: {
    storageWidth: number;
    storageDepth: number;
    storageHeight: number;
  };
  weight: number;
};

/**
 * 商品の基本情報
 * 価格、Amazonリンク、開封時サイズ、収納時サイズ、重量
 *
 * @param price
 * @param openSizes
 * @param storageSizes
 * @param weight
 * @example
 * <ItemBaseData
 * price={price}
 * openSizes={openSizes}
 * storageSizes={storageSizes}
 * weight={weight}
 */
export const ItemBaseData: FC<ItemBaseDataProps> = ({
  price,
  openSizes,
  storageSizes,
  weight,
}) => {
  return (
    <>
      {/* 商品の共通基本データ */}
      <Price price={price} />
      {/* <AmazonLink amazonUrl={itemDetail.amazonUrl} /> */}
      <OpenSize openSizes={openSizes} />
      <StorageSize storageSizes={storageSizes} />
      <Weight weight={weight} />
    </>
  );
};
