import React, { FC } from 'react';
import LibraryAddRoundedIcon from '@mui/icons-material/LibraryAddRounded';

import { useUserInventoryApi } from '@/hooks/api/useUserInventoryApi';

import { UserInteractiveIconButton } from '../../shares/molecules/UserInteractiveIconButton';
import { useInteractiveIcon } from '@/hooks/useInteractiveIcon';
import { ICON_SIZE } from '@/components/constants';

//持っているものに登録用アイコンボタン
type InventoryIconButtonProps = {
  itemId: number;
  isLoggedIn: boolean;
  isInInventory: boolean;
};

/**
 * 持っている物アイコンボタン
 * 未ログインの場合はログインアラートを表示する
 * ログイン済みの場合は持っている物の登録・解除を行う
 *
 * @param itemId
 * @param isLoggedIn
 * @param isInInventory
 */

const ICON_STYLE_ACTIVE = { color: '#008b8b', fontSize: ICON_SIZE };
const ICON_STYLE_INACTIVE = { fontSize: ICON_SIZE };

export const InventoryIconButton: FC<InventoryIconButtonProps> = ({
  itemId,
  isLoggedIn,
  isInInventory,
}) => {
  const { sendUserInventoryRequest } = useUserInventoryApi();

  const { isIconActive, showLoginAlert, onClickIcon } = useInteractiveIcon({
    initialState: isInInventory,
    sendRequest: sendUserInventoryRequest,
    itemId,
    isLoggedIn,
  });
  //TODO ログイン状態が切れたときに不具合　リソースの修正 nullになっている

  return (
    <UserInteractiveIconButton
      title="持っている物"
      loginAlertTitle="ログインが必要です"
      isIconActive={isIconActive}
      inactiveIcon={<LibraryAddRoundedIcon sx={ICON_STYLE_INACTIVE} />}
      activeIcon={<LibraryAddRoundedIcon sx={ICON_STYLE_ACTIVE} />}
      onClick={onClickIcon}
      isLoggedIn={isLoggedIn}
      showLoginAlert={showLoginAlert}
    />
  );
};
