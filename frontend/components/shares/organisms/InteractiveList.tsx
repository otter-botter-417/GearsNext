import React, { FC } from 'react';
import { List } from '@mui/material';

import InteractiveListItem from '../molecules/InteractiveListItem';

type InteractiveListProps = {
  listItems: string[];
  selectedIndex: string;
  onItemSelected: (item: string) => void;
};

/**
 * 与えられたリストアイテムを選択可能なリストとして表示します。
 * このリストはユーザーが選択した項目に基づいて様々なアクションをトリガーすることができます。
 *
 * @param listItems - 表示するリストアイテムの配列
 * @param selectedIndex - 現在選択されているリストアイテムのインデックス
 * @param onItemSelected - リストアイテムが選択された際に呼び出される関数
 * @returns 選択可能なリストコンポーネント
 */

const InteractiveList: FC<InteractiveListProps> = ({
  listItems,
  selectedIndex,
  onItemSelected,
}) => (
  <List dense={false}>
    {listItems.map((text) => (
      <InteractiveListItem
        key={text}
        text={text}
        isSelected={selectedIndex === text}
        onClick={() => onItemSelected(text)}
      />
    ))}
  </List>
);

export default InteractiveList;
