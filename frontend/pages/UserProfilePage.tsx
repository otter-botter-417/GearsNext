import React from 'react';

import UserProfilePageTemplate from '@/components/pages/userProfilePage/UserProfilePageTemplate';
import UserProfilePageList from '@/components/pages/userProfilePage/userProfilePageList/UserProfilePageList';
import MainContainer from '@/components/pages/userProfilePage/mainContents/MainContainer';

/**
 * ユーザープロファイルページのメインコンポーネント。
 * ユーザープロファイルページのサイドナビゲーションとメインコンテンツエリアを配置します。
 *
 * @returns ユーザープロファイルページのレイアウト。
 */
const UserProfile = () => {
  return (
    <UserProfilePageTemplate
      SideNavigation={<UserProfilePageList />}
      ContentArea={<MainContainer />}
    />
  );
};

export default UserProfile;
