import { FC } from 'react';
import { Box } from '@mui/material';

import { TimeDifferenceFormatter } from './TimeDifferenceFormatter';

interface LayoutPageButtonsProps {
  createdAt: string;
}

/**
 * 商品詳細ページで商品に関連するボタンを表示する
 * ・いいねボタン
 * ・持っている物ボタン
 * ・シェアボタン
 *
 * @param itemId
 * @param itemName
 * @example
 * <ItemDetailPageButtons
 * itemId={itemId}
 * user={user}
 * itemName={itemName}
 * />
 */
export const LayoutPageButtons: FC<LayoutPageButtonsProps> = ({
  createdAt,
}) => {
  return (
    <Box>
      <TimeDifferenceFormatter time={createdAt} />
    </Box>
  );
};
