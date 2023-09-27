import React, { FC } from 'react';
import Typography from '@mui/material/Typography';

import { LayoutDataType } from '@/components/types/LayoutDataType';

import { TimeDifferenceFormatter } from '@/components/shares/atoms/TimeDifferenceFormatter';

type LayoutInfoProps = {
  layoutDetail: LayoutDataType;
};

/**
 * このコンポーネントは、レイアウトの基本的な情報を表示します。
 * - ユーザー名
 * - 作成日時（相対的な時間形式で表示）
 * - 閲覧数と「いいね」の数
 * - レイアウトのテキスト内容
 *
 * @param layoutDetail - レイアウトの詳細情報。この情報から各項目を抽出して表示します。
 *
 * @returns {JSX.Element} 上記の各情報を整形して表示するReact要素
 */
export const LayoutInfo: FC<LayoutInfoProps> = ({ layoutDetail }) => (
  <>
    {/* ユーザー名 */}
    <Typography variant="h6">{layoutDetail.userName}</Typography>
    {/* 作成日時 */}
    <TimeDifferenceFormatter time={layoutDetail.createdAt} />
    {/* 閲覧数と「いいね」の数 */}
    <Typography variant="body1">
      {`閲覧 ${layoutDetail.viewCount}回 いいね ${layoutDetail.favoriteCount}件`}
    </Typography>
    {/* レイアウトのテキスト内容 */}
    <Typography variant="subtitle1">{layoutDetail.text}</Typography>
  </>
);
