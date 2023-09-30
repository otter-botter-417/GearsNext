import { Box, Grid } from '@mui/material';
import React, { FC, ReactNode } from 'react';

interface LayoutTemplateProps {
  top?: ReactNode;
  leftSide: ReactNode;
  rightSide: ReactNode;
  bottom: ReactNode;
}

/**
 * このコンポーネントは、レイアウトページまたはレイアウト投稿ページで用いるテンプレートです。
 * - `top` はオプショナルであり、指定しない場合はレンダリングされません。
 * - `leftSide` は左側、`rightSide` は右側、`bottom` は下部コンテンツを表示するために使用します。
 *
 * @param top - 上部に表示するコンポーネント（オプショナル）
 * @param leftSide - 主に画像を表示するメインのコンポーネント
 * @param rightSide - 主に投稿文や商品の選択を行うコンポーネント
 * @param bottom - 主に選択された商品の一覧を表示するコンポーネント
 *
 * @example
 * <AddLayoutPageTemplate
 *   leftSide={<LeftContent />}
 *   rightSide={<RightContent />}
 *   bottom={<Footer />}
 * />
 */
export const LayoutPageTemplate: FC<LayoutTemplateProps> = ({
  top,
  leftSide,
  rightSide,
  bottom,
}) => {
  return (
    <Box sx={{ width: '80%', maxHeight: '100%', margin: '0 auto' }}>
      <Box display="flex" justifyContent="end" marginBottom={2}>
        {top}
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {leftSide}
        </Grid>
        <Grid item xs={12} md={4}>
          <Box marginLeft={{ md: 2 }}>{rightSide}</Box>
        </Grid>
      </Grid>
      <Box>{bottom}</Box>
    </Box>
  );
};
