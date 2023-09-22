import React, { FC, useState } from 'react';
import { IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { ImageMapData } from '@/components/types/ImageMapTypes';

type LabelItemProps = {
  item: ImageMapData;
  onRemove?: (itemId: number) => void;
};

/**
 * このコンポーネントは、画像上に設定された商品ラベルを表示します。
 * ホバー時に削除ボタンが表示され、そのボタンを押すと親コンポーネントのonRemoveメソッドが呼び出されます。
 *
 * @param {Object} item - 表示する商品の情報。x, y座標と商品ID、商品名が含まれます。
 * @param {Function} onRemove - 削除ボタンがクリックされた時に呼ばれる関数。オプショナル。
 *
 * @returns {JSX.Element} ラベルと削除ボタンを含むReact要素
 *
 * @example
 * // 削除ボタン付き
 * <LabelItem item={item} onRemove={removeLabel} />
 * // 削除ボタンなし
 * <LabelItem item={item} />
 */
export const LabelItem: FC<LabelItemProps> = ({ item, onRemove }) => {
  const [isHovered, setIsHovered] = useState(false);

  // 動的に座標を設定
  const dynamicLabelStyle = {
    position: 'absolute' as 'absolute',
    padding: '5px',
    borderRadius: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    top: `${item.y}%`,
    left: `${item.x}%`,
  };

  return (
    <div
      style={dynamicLabelStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Typography variant="caption" style={{ color: 'white' }}>
        {item.itemName}
      </Typography>
      {isHovered && onRemove && (
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
    </div>
  );
};
