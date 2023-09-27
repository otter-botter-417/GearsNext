import { FC } from 'react';
import { Box } from '@mui/material';

import { TimeDifferenceFormatter } from '../../shares/atoms/TimeDifferenceFormatter';

import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { LayoutFavoriteButton } from './LayoutFavoriteButton';
interface LayoutPageButtonsProps {
  layoutId: number;
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
export const LayoutPageButtons: FC<LayoutPageButtonsProps> = ({ layoutId }) => {
  return (
    <Box>
      <LayoutFavoriteButton layoutId={layoutId} />
      {/* <BookmarkAddIcon /> */}
    </Box>
  );
};
