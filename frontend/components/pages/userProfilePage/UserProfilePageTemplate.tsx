import React, { FC } from 'react';
import { Box } from '@mui/material';

type UserProfilePageTemplateProps = {
  SideNavigation: React.ReactNode;
  ContentArea: React.ReactNode;
};

const BOX_BG_COLOR = '#FBFBFB'; //InteractiveListコンポーネントのBoxの背景色

/**
 * ユーザープロファイルページのテンプレートコンポーネント。
 * サイドナビゲーションとメインコンテンツエリアのレイアウトを定義します。
 *
 * @param SideNavigation - サイドナビゲーションエリアに表示されるコンポーネント。
 * @param ContentArea - メインコンテンツエリアに表示されるコンポーネント。
 * @returns ユーザープロファイルページのレイアウトを構成するコンポーネント。
 */
const UserProfilePageTemplate: FC<UserProfilePageTemplateProps> = ({
  SideNavigation,
  ContentArea,
}) => {
  return (
    <>
      {/* サイドナビゲーションエリア */}
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        sx={{
          position: 'fixed',
          top: 0, // ビューポートの上端から開始
          width: '15%', // 幅は全体の15%
          height: '100vh', // 高さはビューポートの高さに合わせる
          overflowY: 'auto', // コンテンツがオーバーフローした場合にスクロール可能
          bgcolor: BOX_BG_COLOR,
          paddingTop: 18,
        }}
      >
        {SideNavigation}
      </Box>

      {/* メインコンテンツエリア */}
      <Box
        width={'80%'}
        marginLeft={'20%'}
        sx={{
          minHeight: '100vh', // スクロールバーを常に表示するための最小高さ
          overflowY: 'hidden', // 内側のスクロールバーを非表示にする
        }}
      >
        {ContentArea}
      </Box>
    </>
  );
};

export default UserProfilePageTemplate;
