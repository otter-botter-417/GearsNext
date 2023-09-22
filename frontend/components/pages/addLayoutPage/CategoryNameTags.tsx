import React, { FC } from 'react';
import { Tab, Tabs } from '@mui/material';
import { useRecoilState } from 'recoil';

import { selectedCategoryNameState } from '@/components/shares/atoms/state/selectedCategoryNameState';

type CategoryNameTagsProps = {
  selectCategoryName: string[];
};

/**
 * このコンポーネントは、絞り込むカテゴリー名を選択できるUIを提供します。
 * ユーザーがタブをクリックすると、選択されたカテゴリ名が Recoil State に保存されます。
 *
 * @param {string[]} selectCategoryName - 選択可能なカテゴリ名の配列
 *
 * @returns {JSX.Element} カテゴリ名のタブを含む React 要素
 *
 * @example
 * const selectCategoryName = ['選択中', ...CategoryNameList];
 */
export const CategoryNameTags: FC<CategoryNameTagsProps> = ({
  selectCategoryName,
}) => {
  const [selectedCategoryName, setSelectedCategoryName] = useRecoilState(
    selectedCategoryNameState,
  );
  const selectedTabIndex = selectCategoryName.indexOf(selectedCategoryName);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedCategoryName(selectCategoryName[newValue]);
  };

  return (
    <Tabs
      value={selectedTabIndex}
      onChange={handleTabChange}
      variant="scrollable"
      scrollButtons="auto"
      aria-label="scrollable auto tabs example"
    >
      {selectCategoryName.map((categoryName, index) => (
        <Tab label={categoryName} key={index} />
      ))}
    </Tabs>
  );
};
