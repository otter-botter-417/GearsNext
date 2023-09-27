import React, { FC, useState } from 'react';
import { IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { ImageMapType } from '@/components/types/ImageMapType';

type LabelItemProps = {
  item: ImageMapType;
  children?: React.ReactNode;
};

/**
 * このコンポーネントは、画像上に設定された商品ラベルを動的に表示します。
 * ホバー時に表示される削除ボタンなどのカスタム要素は、childrenプロパティを通じて親コンポーネントから渡されるべきです。
 *
 * @param {Object} props - コンポーネントのプロパティ
 * @param {ImageMapType} props.item - 表示する商品の情報。x, y座標と商品ID、商品名が含まれます。
 * @param {React.ReactNode} [props.children] - 追加で表示したい任意のReact要素。オプショナル。
 *
 * @returns {JSX.Element} ラベルと、オプショナルでchildrenを含むReact要素
 *
 * @example
 * // カスタムの子要素を持つ
 * <LabelItem item={item}>{customElement}</LabelItem>
 * // カスタムの子要素なし
 * <LabelItem item={item} />
 */
export const LabelItem: FC<LabelItemProps> = ({ item, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  // 動的に座標を設定
  const dynamicLabelStyle = {
    position: 'absolute' as 'absolute',
    padding: '5px',
    borderRadius: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    top: `${item.yPosition}%`,
    left: `${item.xPosition}%`,
  };

  return (
    <div
      style={dynamicLabelStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Typography variant="caption" style={{ color: 'white' }}>
        {item.itemName}
        {isHovered && children}
      </Typography>
    </div>
  );
};
