import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Image from 'next/image';

import { imagePreviewUrlState } from '@/components/shares/atoms/state/imagePreviewUrlState';
import { ImagePlaceholderWithSelector } from '../addLayoutPage/ImagePlaceholderWithSelector';

export const ImageUploader = () => {
  // 選択された画像のプレビューURL

  const [imagePreviewUrl, setImagePreviewUrl] =
    useRecoilState(imagePreviewUrlState);

  useEffect(() => {
    setImagePreviewUrl(null);
  });

  return (
    <>
      {imagePreviewUrl ? (
        <Image
          src={imagePreviewUrl}
          alt="Image Preview"
          layout="responsive"
          width={500}
          height={300}
          sizes="100vw"
          objectFit="contain"
          priority
        />
      ) : (
        <ImagePlaceholderWithSelector />
      )}
    </>
  );
};
