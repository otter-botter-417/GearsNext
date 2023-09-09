import React, { FC } from 'react';
import { IconButton } from '@mui/material';
import { LineIcon, LineShareButton } from 'react-share';

import { ICON_SIZE } from '@/components/constants';

type ShareToLineProps = {
  url: string;
  title: string;
};

/**
 * Line共有用アイコンボタン
 * このコンポーネントは指定された URL とタイトルを使用して Line でコンテンツを共有するためのボタンを表示します。
 *
 * @param url - 共有するコンテンツの URL
 * @param title - 共有するコンテンツのタイトル
 */
export const ShareToLineButton: FC<ShareToLineProps> = ({ url, title }) => {
  return (
    <IconButton>
      <LineShareButton url={url} title={title}>
        <LineIcon round={true} size={ICON_SIZE} />
      </LineShareButton>
    </IconButton>
  );
};
