import React from 'react';

/**
 * 商品画像のURLを取得する
 * @param brand ブランド名
 * @param image_name 画像名
 * @returns 商品画像のURL
 * @example
 * const ItemImagesUrl = getItemImageUrl(ItemData.brand_name, ItemData.image_name);
 */
export const getItemImageUrl = (brand: string, image_name: string): string => {
  return (
    'https://gears-item-images.s3.ap-northeast-1.amazonaws.com/items/' +
    brand +
    '/' +
    image_name +
    '.jpg'
  );
};

export default getItemImageUrl;
