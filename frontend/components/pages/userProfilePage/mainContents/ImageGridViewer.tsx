import React, { FC } from 'react';
import { Grid } from '@mui/material';

import { ContentType } from '@/components/types/ContentType';
import { UserProfilePageContentType } from '@/components/types/UserProfilePageContentType';
import ItemCard from './ItemCard';

type ImageGridViewerProps = {
  items: UserProfilePageContentType[];
  type: ContentType;
};

/**
 * アイテムのリストをグリッド形式で表示します。各アイテムは ItemCard コンポーネントを通じてレンダリングされ、
 * アイテムの画像とリンクが表示されます。
 *
 * @param items: UserProfilePageContentType オブジェクトの配列
 * @param type: アイテムのタイプ（'item' または 'layout'）
 * 
 * @returns アイテムのリストをグリッド形式で表示するコンポーネント。
 */
const ImageGridViewer: FC<ImageGridViewerProps> = ({ items, type }) => {
  return items.map((data) => (
    <Grid item xs={12} sm={6} md={4} key={data.id}>
      <ItemCard id={data.id} type={type} imageName={data.imageName} />
    </Grid>
  ));
};

export default ImageGridViewer;
