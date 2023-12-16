import React from 'react';
import { useRecoilState } from 'recoil';

import InteractiveList from '@/components/shares/organisms/InteractiveList';
import { menuListItems } from '../menuListItems';
import { selectedListState } from '@/components/shares/atoms/state/selectedListState';

/**
 * ユーザープロファイルページのメイン表示を切り替えるためのリストを提供します
 * 選択されたリストアイテムに応じて、対応するコンテンツが表示されます
 *
 * @returns ユーザー情報ページ用の選択可能なリストコンポーネント
 */
const UserProfilePageList = () => {
  const [selectedIndex, setSelectedIndex] = useRecoilState(selectedListState);
  return (
    <InteractiveList
      listItems={menuListItems}
      selectedIndex={selectedIndex}
      onItemSelected={setSelectedIndex}
    />
  );
}

export default UserProfilePageList;
