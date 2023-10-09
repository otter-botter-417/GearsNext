import React, { FC } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { ItemSortedList } from './ItemSortedList';
import { HomeStateType } from '@/components/shares/atoms/state/homeDataState';

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
    <Box sx={{ maxWidth: '100%', margin: '0 auto' }}>
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 2,
            borderColor: 'divider',
            maxWidth: '96%', // ここで最大幅を100%に制限
            margin: '0 auto',
          }}
        >
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            sx={{
              maxWidth: '100%', // この値も調整して適切な幅を設定してください。
              margin: '0 auto',
            }}
          >
            {tabKeys.map((key) => (
              <Tab label={keyLabel(key)} value={key} key={key} />
            ))}
          </TabList>
        </Box>
        {tabKeys.map((key) => (
          <TabPanel value={key} key={key}>
            <ItemSortedList value={key as keyof HomeStateType} />
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};
