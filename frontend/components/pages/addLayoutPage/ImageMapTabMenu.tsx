import React from 'react';
import { useRecoilState } from 'recoil';
import { Tab, Tabs } from '@mui/material';

import { selectedTabIndexState } from '@/components/shares/atoms/state/selectedTabIndexState';

const TAB_MENU_ITEMS = [
  'すべて',
  '持っている',
  'レイアウトに登録済み',
] as const;

/**
 * このコンポーネントは、ImageMapTagEditor内で呼び出され、
 * 選択できる商品を絞り込むためのタブメニューを提供します。
 *
 * @returns {JSX.Element} タブメニューを構成するReactコンポーネント。
 */
export const ImageMapTabMenu = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useRecoilState(
    selectedTabIndexState,
  );

  const tabHandleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTabIndex(newValue);
  };

  return (
    <Tabs
      value={selectedTabIndex}
      onChange={tabHandleChange}
      variant="scrollable"
      scrollButtons="auto"
    >
      {TAB_MENU_ITEMS.map((tabName, index) => (
        <Tab label={tabName} key={index} />
      ))}
    </Tabs>
  );
};
