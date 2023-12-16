import React from 'react';
import { useRecoilValue } from 'recoil';

import { ContentType } from '@/components/types/ContentType';
import { userInventoryItemListState } from '@/components/shares/atoms/state/userInventoryItemListState';
import SectionWithGrid from './SectionWithGrid';
import { useFetchUserInventory } from '@/hooks/api/useFetchUserInventory';

/**
 * UserInventory コンポーネントは、ユーザーが所有しているギアの一覧を表示します。
 * useRecoilValue フックを使用して、ユーザーのインベントリリストの状態を取得します。
 * SectionWithGrid コンポーネントを利用して、商品のグリッド表示を行います。
 */
const UserInventory = () => {
  useFetchUserInventory();

  const userInventoryItemList = useRecoilValue(userInventoryItemListState);
  return (
    <SectionWithGrid
      title={'持っているギア'}
      items={userInventoryItemList}
      type={'item' as ContentType}
    />
  );
};

export default UserInventory;
