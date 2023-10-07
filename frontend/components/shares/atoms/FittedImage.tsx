import Image from 'next/image';
import React, { FC } from 'react';

type FittedImageProps = {
  src: string;
  alt?: string;
  containerWidth: number;
  containerHeight: number;
};

/**
 * このコンポーネントは、画像をコンテナに収まるように調整して表示します。
 * @param src - 表示する画像のURL
 * @param alt - 画像の説明
 * @param containerWidth - 画像を表示するコンテナの横幅
 * @param containerHeight - 画像を表示するコンテナの縦幅
 * @example
 * <FittedImage src={item.imageName} alt={item.itemName} containerWidth={100} containerHeight={100} />
 */
export const FittedImage: FC<FittedImageProps> = ({
  src,
  alt = '',
  containerWidth,
  containerHeight,
}) => {
  return (
    <div
      style={{
        position: 'relative',
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
      }}
    >
      <Image
        src={src}
        alt={alt}
        layout="fill"
        loading="eager"
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
};
