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
  const [aspectRatio, setAspectRatio] = useState(0);

  // 画像の読み込みが完了した時に実行される関数 (画像のアスペクト比を取得する)
  const onImageLoadingComplete = (e: OnLoadingCompleteResult) => {
    setAspectRatio(e.naturalWidth / e.naturalHeight);
  };
  return (
    <>
      <Box
        sx={{
          aspectRatio: `${aspectRatio || 1}`,
          position: 'relative',
          width: '100%',
          maxHeight: 100,
          paddingTop: '100%',
        }}
      >
        {/* レイアウト画像 */}
        <Image
          src={imageName}
          alt="layout image"
          layout="fill"
          objectFit="contain"
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
