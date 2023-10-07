import React, { FC } from 'react';
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
    
      <LineShareButton url={url} title={title} style={{  marginTop:'6px' }}>
        <LineIcon round={true} size={ICON_SIZE} />
      </LineShareButton>
  );
};
