import React from 'react';

import UserFavorites from './UserFavorites';
import UserInventory from './UserInventory';
import UserLayouts from './UserLayouts';
import NotFound from '@/components/shares/atoms/NotFound';
import useFetchUserData from '@/hooks/UserProfilePage/useFetchUserData';

/**
 * ユーザープロファイルページのメインコンテンツエリアのコンポーネントです。
 * サイドナビゲーションで選択されたコンテンツを表示します。
 *
 * @returns ユーザープロファイルページのメインコンテンツエリア
 */
const MainContainer = () => {
  const selectedIndex = useFetchUserData();

  const renderMainComponent = () => {
    switch (selectedIndex) {
      case 'お気に入り':
        return <UserFavorites />;
      case '持っているギア':
        return <UserInventory />;
      case '投稿したレイアウト':
        return <UserLayouts />;
      case '通知':
        return <NotFound />;
      case 'ユーザー情報の変更':
        return <NotFound />;
      default:
        return <UserFavorites />;
    }
  };
  return <>{renderMainComponent()}</>;
};

export default MainContainer;
