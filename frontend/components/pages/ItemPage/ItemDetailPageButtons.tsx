import { FC } from 'react';
import { Box } from '@mui/material';

import { FavoriteIconButton } from './FavoriteIconButton';
import { ItemShareButton } from './ItemShareButton';
import { InventoryIconButton } from './InventoryIconButton';

interface ItemDetailPageButtonsProps {
  itemId: number;
  user: {
    isLoggedIn: boolean;
    isFavorited: boolean;
    isInInventory: boolean;
  };
  itemName: string;
}

/**
 * 商品詳細ページで商品に関連するボタンを表示する
 * ・いいねボタン
 * ・持っている物ボタン
 * ・シェアボタン
 *
 * @param itemId
 * @param user
 * @param itemName
 * @example
 * <ItemDetailPageButtons
 * itemId={itemId}
 * user={user}
 * itemName={itemName}
 * />
 */
export const ItemDetailPageButtons: FC<ItemDetailPageButtonsProps> = ({
  itemId,
  user,
  itemName,
}) => {
  return (
    <Box>
      {/* いいねアイコン */}
      <FavoriteIconButton
        itemId={itemId}
        isLoggedIn={user.isLoggedIn}
        isFavorited={user.isFavorited}
      />
      {/* 持っている物アイコン */}
      <InventoryIconButton
        itemId={itemId}
        isLoggedIn={user.isLoggedIn}
        isInInventory={user.isInInventory}
      />
      {/* シェアボタン */}
      <ItemShareButton itemId={itemId} itemName={itemName} />
    </Box>
  );
};
