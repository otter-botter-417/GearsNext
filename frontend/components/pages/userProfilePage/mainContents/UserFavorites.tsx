import React from 'react';

import useFavoriteSelection from '@/hooks/UserProfilePage/useFavoriteSelection';
import ToggleButton from './ToggleButton';
import SectionWithGrid from './SectionWithGrid';
import { useFetchUserFavoriteItem } from '@/hooks/api/useFetchUserFavoriteItem';
import { useFetchUserFavoriteLayout } from '@/hooks/api/useFetchUserFavoriteLayout';

/**
 * UserFavorites コンポーネントは、ユーザーがお気に入りに追加したアイテムとレイアウトを表示します。
 * ToggleButton を使用して、「ギア」と「レイアウト」間で切り替えることができます。
 * useFavoriteSelection フックを利用して、選択されたカテゴリに基づいて表示するアイテムを決定します。
 *
 * @returns トグルボタンとユーザーがお気に入りに追加したアイテムとレイアウトを表示するコンポーネント。
 */
const UserFavorites = () => {
  useFetchUserFavoriteItem();
  useFetchUserFavoriteLayout();
  const { selectedOption, setSelectedOption, items, type } =
    useFavoriteSelection();

  const toggleButton = (
    <ToggleButton
      options={['ギア', 'レイアウト']}
      selectedOption={selectedOption}
      onSelect={setSelectedOption}
    />
  );

  return (
    <SectionWithGrid
      title="いいね"
      items={items}
      type={type}
      toggleButton={toggleButton}
    />
  );
};

export default UserFavorites;
