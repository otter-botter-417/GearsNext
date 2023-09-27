import React, { FC } from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { ImageMapType } from '@/components/types/ImageMapType';

import { LabelItem } from './LabelItem';

type EditableLabelProps = {
  item: ImageMapType;
  onRemove?: (itemId: number) => void;
};

/**
 * 編集可能なラベルコンポーネント
 *
 * @param {ImageMapType} item - 表示するアイテムのデータ
 * @param {(itemId: number) => void} onRemove - アイテムを削除するためのコールバック関数
 * @returns {JSX.Element | null} 編集可能なラベル、またはnull
 */
export const EditableLabel: FC<EditableLabelProps> = ({ item, onRemove }) => {
  if (!item) return null;
  return (
    <LabelItem item={item}>
      {onRemove && (
        <IconButton
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
          }}
          onClick={() => onRemove(item.itemId)}
        >
          <DeleteIcon sx={{ color: 'white' }}>edit_icon</DeleteIcon>
        </IconButton>
      )}
    </LabelItem>
  );
};
