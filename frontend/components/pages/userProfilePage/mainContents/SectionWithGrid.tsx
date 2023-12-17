import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';

import { ContentType } from '@/components/types/ContentType';
import { UserProfilePageContentType } from '@/components/types/UserProfilePageContentType';
import ImageGridContainer from './ImageGridContainer';

type SectionWithGridProps = {
  title: string;
  items: UserProfilePageContentType[];
  type: ContentType;
  toggleButton?: React.ReactNode;
};

/**
 * SectionWithGrid コンポーネントは、特定のセクションのタイトルと、アイテムやレイアウトのグリッド表示を行います。
 * オプションでトグルボタンを追加することができます。
 *
 * @param title - セクションのタイトル
 * @param items - 表示するアイテムの配列
 * @param type - アイテムのタイプ（'item' または 'layout'）
 * @param toggleButton - セクションに追加するトグルボタン（オプション）
 *
 * @returns セクションのタイトルとアイテムやレイアウトのグリッド表示を行うコンポーネント。
 */
const SectionWithGrid: FC<SectionWithGridProps> = ({
  title,
  items,
  type,
  toggleButton,
}) => {
  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box flexGrow={1}>
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          {toggleButton}
        </Box>
        <Box flexGrow={1} />
      </Box>
      <ImageGridContainer items={items} type={type} />
    </Box>
  );
};

export default SectionWithGrid;
