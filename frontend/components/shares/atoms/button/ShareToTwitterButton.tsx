import React, { FC } from 'react';
import { TwitterIcon, TwitterShareButton } from 'react-share';

import { ICON_SIZE } from '@/components/constants';

type ShareToTwitterProps = {
  url: string;
  title: string;
};

/**
 * Twitter共有用アイコンボタン
 * このコンポーネントは指定された URL とタイトルを使用して Twitter でコンテンツを共有するためのボタンを表示します。
 *
 * @param url - 共有するコンテンツの URL
 * @param title - 共有するコンテンツのタイトル
 */
export const ShareToTwitterButton: FC<ShareToTwitterProps> = ({
  url,
  title,
}) => (
  <TwitterShareButton url={url} title={title} style={{ marginRight: '8px' , marginTop:'6px' }}> {/* marginRightを追加 */}
      <TwitterIcon round size={ICON_SIZE} />
    </TwitterShareButton>
);
