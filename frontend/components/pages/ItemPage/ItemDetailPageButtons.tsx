import { FC, useEffect, useState } from 'react';
import { Box } from '@mui/material';

import { FavoriteIconButton } from './FavoriteIconButton';
import { ItemShareButton } from './ItemShareButton';
import { InventoryIconButton } from './InventoryIconButton';
import { userItemStatesState } from '@/components/shares/atoms/state/userItemStatesState';
import { useRecoilValue } from 'recoil';
import { useAuthGuard } from '@/hooks/UserAuth/useAuthGuard';

interface ItemDetailPageButtonsProps {
  itemId: string | string[] | undefined;
  itemName: string;
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
export const ItemDetailPageButtons: FC<ItemDetailPageButtonsProps> = ({
  itemId,
  itemName,
}) => {
  const userItemStates = useRecoilValue(userItemStatesState);
  const numericItemId = Number(itemId);
  const isLogin = useAuthGuard(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    if (isLogin) {
      setShowButtons(true);
    }
  }, [isLogin]);

  if (!showButtons || !userItemStates) {
    return null;
  }

  return (
    <Box>
      {/* いいねアイコン */}
      <FavoriteIconButton
        itemId={numericItemId}
        isLoggedIn={userItemStates.isLoggedIn}
        isFavorited={userItemStates.isFavorited}
      />
      {/* 持っている物アイコン */}
      <InventoryIconButton
        itemId={numericItemId}
        isLoggedIn={userItemStates.isLoggedIn}
        isInInventory={userItemStates.isInInventory}
      />
      {/* シェアボタン */}
      <ItemShareButton itemId={numericItemId} itemName={itemName} />
    </Box>
  );
};
