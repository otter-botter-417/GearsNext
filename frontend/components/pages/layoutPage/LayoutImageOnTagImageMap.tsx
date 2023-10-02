import React, { FC, useState } from 'react';
import Image from 'next/legacy/image';
import { Box } from '@mui/material';

import { ImageMapType } from '@/components/types/ImageMapType';

import { LayoutLabelItem } from './LayoutLabelItem';

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

  return (
    <>
      <Box
        sx={{
          position: 'relative',
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
