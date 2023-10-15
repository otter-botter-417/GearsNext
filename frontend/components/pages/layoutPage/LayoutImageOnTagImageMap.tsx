import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { Box } from '@mui/material';

import { ImageMapType } from '@/components/types/ImageMapType';

import { LayoutLabelItem } from './LayoutLabelItem';
import { IMAGE_SIZE_HEIGHT, IMAGE_SIZE_WIDTH } from '@/components/constants';

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
  const [imageAspect, setImageAspect] = useState<number>(1); // アスペクト比の状態を追加
  const [containerWidth, setContainerWidth] = useState<number>(0); // コンテナの幅の状態を追加

  // 画像の読み込みが完了した時に実行される関数
  // 画像のアスペクト比を計算して、状態を更新する
  const onImageLoadingComplete = (e: OnLoadingCompleteResult) => {
    let width = e.naturalWidth;
    let height = e.naturalHeight;

    // アスペクト比率を計算
    const aspectRatio = width / height;
    setImageAspect(aspectRatio); // アスペクト比の状態を更新
  };

  useEffect(() => {
    // クライアントサイドでのみ実行される
    setContainerWidth(window.innerWidth);
  }, []);

  const calculatedWidth = Math.min(
    imageAspect * IMAGE_SIZE_HEIGHT,
    containerWidth,
  );

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{
        maxWidth: `${calculatedWidth}px`,
        position: 'relative',
        margin: '0 auto',
      }}
    >
      {/* レイアウト画像 */}
      <Image
        src={imageName}
        alt="layout image"
        priority
        width={200}
        height={100}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
        onClick={() => setIsTagPositionVisible((prev) => !prev)}
        onLoadingComplete={(e) => onImageLoadingComplete(e)}
      />
      {/* タグ（商品ラベル） */}
      {isTagPositionVisible &&
        tagPositions.map((tag) => (
          <LayoutLabelItem key={tag.itemId} tagPosition={tag} />
        ))}
    </Box>
  );
};
