import React from "react";

export const getItemImageUrl = (brand: string, image_name: string): string => {
  return (
    "https://gears-item-images.s3.ap-northeast-1.amazonaws.com/items/" +
    brand +
    "/" +
    image_name +
    ".jpg"
  );
};

export default getItemImageUrl;
