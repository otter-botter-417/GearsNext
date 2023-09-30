import React, { FC } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { ItemSortedList } from './ItemSortedList';
import { HomeLayoutStateType } from '@/components/shares/atoms/state/homeLayoutDataState';

export const LayoutSortSelect: FC = () => {
  const [value, setValue] = React.useState('topViewedLayouts');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const tabKeys: (keyof HomeLayoutStateType)[] = [
    'topViewedLayouts',
    'topFavoriteLayouts',
    'newlyArrivedLayouts',
  ];

  // キーからラベルを生成する関数（任意で調整可能）
  const getKeyLabel = (key: keyof HomeLayoutStateType): string => {
    switch (key) {
      case 'topViewedLayouts':
        return '閲覧数';
      case 'topFavoriteLayouts':
        return 'お気に入り';
      case 'newlyArrivedLayouts':
        return '新着';
      default:
        return 'その他';
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {tabKeys.map((key) => (
              <Tab label={getKeyLabel(key)} value={key} key={key} />
            ))}
          </TabList>
        </Box>
        {tabKeys.map((key) => (
          <TabPanel value={key} key={key}>
            <ItemSortedList value={key as keyof HomeLayoutStateType} />
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};
