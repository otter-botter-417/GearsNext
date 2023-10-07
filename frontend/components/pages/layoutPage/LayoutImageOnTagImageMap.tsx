import React, { FC, useState } from 'react';
import Image from 'next/image';
import { Box } from '@mui/material';

import { ImageMapType } from '@/components/types/ImageMapType';

import { LayoutLabelItem } from './LayoutLabelItem';

type OnLoadingCompleteResult = { naturalHeight: number; naturalWidth: number };

type LayoutImageOnTagImageMapProps = {
  layoutId: number;
  imageName: string;
  tagPositions: ImageMapType[];
};

const IMAGE_SIZE = 500;

/**
 * このコンポーネントは、レイアウト詳細ページでレイアウト画像とその上のタグ（詳細ラベル）を表示します。
 * - レイアウト画像: 指定された`layoutId`に基づいて画像を表示します。
 * - タグ（商品ラベル）: `tagPositions` プロパティで受け取った座標に基づいて、商品ラベルを画像上に配置します。
 * - タグの表示/非表示: レイアウト画像をクリックすることで、タグ（商品ラベル）の表示・非表示を切り替えます。
 *
 * @returns {JSX.Element}
 */
export const LayoutImageOnTagImageMap: FC<LayoutImageOnTagImageMapProps> = ({
  imageName,
  tagPositions,
}) => {
  const [isTagPositionVisible, setIsTagPositionVisible] = useState(true);
  const [imageSize, setImageSize] = useState({ width: 100, height: 100 });

  // 画像の読み込みが完了した時に実行される関数 (画像のwidth heightを取得する)
  // 画像のwidth heightを取得して、画像のサイズを調整する
  const onImageLoadingComplete = (e: OnLoadingCompleteResult) => {
    let width = e.naturalWidth;
    let height = e.naturalHeight;

    // アスペクト比率を計算
    const aspectRatio = width / height;

    if (width > IMAGE_SIZE || height > IMAGE_SIZE) {
      if (width > height) {
        width = IMAGE_SIZE;
        height = IMAGE_SIZE / aspectRatio;
      } else {
        height = IMAGE_SIZE;
        width = IMAGE_SIZE * aspectRatio;
      }
    }
    setImageSize({ width, height });
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width={imageSize.width}
        height={imageSize.height}
        sx={{
          position: 'relative',
          margin: '0 auto',
        }}
      >
        {/* レイアウト画像 */}
        <Image
          src={imageName}
          alt="layout image"
          fill
          sizes="(max-width: 768px) 100vw"
          priority
          onClick={() => setIsTagPositionVisible((prev) => !prev)}
          onLoadingComplete={(e) => onImageLoadingComplete(e)}
        />

        {/* タグ（商品ラベル） */}
        {isTagPositionVisible &&
          tagPositions.map((tag) => (
            <LayoutLabelItem key={tag.itemId} tagPosition={tag} />
          ))}
      </Box>
    </>
  );
};
