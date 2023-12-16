import React, { FC } from 'react';

import { ListItem, ListItemButton, ListItemText } from '@mui/material';

const SELECTED_ITEM_BG_COLOR = '#EFEFEF'; //選択されたアイテムの背景色

type InteractiveListItemProps = {
  text: string;
  isSelected: boolean;
  onClick: () => void;
};

/**
 * リスト内の各アイテムを表示します。
 * これは選択状態に応じてスタイルが変化し、ユーザーがクリックすることで選択状態を切り替えることができます。
 *
 * @param text - リストアイテムに表示されるテキスト
 * @param isSelected - アイテムが現在選択されているかどうかを示すブール値
 * @param onClick - アイテムがクリックされた時に呼び出される関数
 * @returns 選択可能なリストアイテムコンポーネント
 */
const InteractiveListItem: FC<InteractiveListItemProps> = ({
  text,
  isSelected,
  onClick,
}) => {
  return (
    <ListItem disablePadding>
      <ListItemButton
        selected={isSelected}
        onClick={onClick}
        sx={{
          bgcolor: isSelected ? SELECTED_ITEM_BG_COLOR : 'transparent',
        }}
      >
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
};

export default InteractiveListItem;
