import React from 'react';

/**
 * 商品画像のURLを取得する
 * @param brandName ブランド名
 * @param imageName 画像名
 * @returns 商品画像のURL
 * @example
 * const ItemImagesUrl = getItemImageUrl(ItemData.brandName, ItemData.imageName);
 */
export const getItemImageUrl = (
  brandName: string,
  imageName: string,
): string => {
  return `https://gears-item-images.s3.ap-northeast-1.amazonaws.com/items/${brandName}/${imageName}.jpg`;
};
