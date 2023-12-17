import React from 'react';
import { useRecoilValue } from 'recoil';

import { ContentType } from '@/components/types/ContentType';
import { userLayoutListState } from '@/components/shares/atoms/state/userLayoutListState';
import SectionWithGrid from './SectionWithGrid';

/**
 * UserLayouts コンポーネントは、ユーザーが投稿したレイアウトの一覧を表示します。
 * useRecoilValue フックを使用して、ユーザーのレイアウトリストの状態を取得します。
 * SectionWithGrid コンポーネントを利用して、レイアウトのグリッド表示を行います。
 */
const UserLayouts = () => {
  const userLayoutList = useRecoilValue(userLayoutListState);
  return (
    <SectionWithGrid
      title={'投稿したレイアウト'}
      items={userLayoutList}
      type={'layout' as ContentType}
    />
  );
};

export default UserLayouts;
