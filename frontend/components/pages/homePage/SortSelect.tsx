import React, { FC } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { ItemSortedList } from './ItemSortedList';
import { HomeDataType } from '@/components/types/HomeDataType';

type SortSelectProps = {
  initialState: string;
  tabKeys: string[];
};

export const SortSelect: FC<SortSelectProps> = ({ initialState, tabKeys }) => {
  const [value, setValue] = React.useState(initialState);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const keyLabel = (key: string) => {
    if (key.includes('View')) {
      return '閲覧数';
    } else if (key.includes('Favorite')) {
      return 'いいね';
    } else if (key.includes('Arrived')) {
      return '新着';
    } else {
      return key;
    }
  };

  return (
    <TabContext value={value}>
      <Box
        sx={{
          borderBottom: 2,
          borderColor: 'divider',
          maxWidth: '96%', //下線のレイアウトを調整
          margin: '0 auto',
        }}
      >
        <TabList onChange={handleChange}>
          {tabKeys.map((key) => (
            <Tab label={keyLabel(key)} value={key} key={key} />
          ))}
        </TabList>
      </Box>
      {tabKeys.map((key) => (
        <TabPanel value={key} key={key}>
          <ItemSortedList value={key as keyof HomeDataType} />
        </TabPanel>
      ))}
    </TabContext>
  );
};
