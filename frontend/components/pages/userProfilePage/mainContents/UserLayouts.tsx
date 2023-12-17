import React from 'react';
import { useRecoilValue } from 'recoil';

import { ContentType } from '@/components/types/ContentType';
import { userLayoutListState } from '@/components/shares/atoms/state/userLayoutListState';
import SectionWithGrid from './SectionWithGrid';
import { useFetchUserLayout } from '@/hooks/api/useFetchUserLayout';

/**
 * UserLayouts コンポーネントは、ユーザーが投稿したレイアウトの一覧を表示します。
 * useRecoilValue フックを使用して、ユーザーのレイアウトリストの状態を取得します。
 * SectionWithGrid コンポーネントを利用して、レイアウトのグリッド表示を行います。
 */
const UserLayouts = () => {
  useFetchUserLayout();
  const userLayoutList = useRecoilValue(userLayoutListState);
  console.log(userLayoutList);
  return (
    <SectionWithGrid
      title={'投稿したレイアウト'}
      items={userLayoutList}
      type={'layout' as ContentType}
    />
  );
};

export default UserLayouts;
