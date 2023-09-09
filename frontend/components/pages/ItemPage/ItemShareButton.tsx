import React, { FC, useState } from 'react';
import { IconButton, Popover, Tooltip } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';

import { ICON_SIZE, BASE_URL } from '@/components/constants';

import { ShareToTwitterButton } from '@/components/shares/atoms/button/ShareToTwitterButton';
import { ShareToLineButton } from '@/components/shares/atoms/button/ShareToLineButton';

//共有用アイコンボタン
type ShareIconButtonProps = {
  itemId: number;
  itemName: string;
};

/**
 * 共有用アイコンボタン
 * twitter と line の共有ボタンを表示する
 * Popoverを使用している
 *
 * @param itemId
 * @param itemName
 * @example
 * <ShareIconButton itemId={itemId} itemName={itemName} />
 */
export const ItemShareButton: FC<ShareIconButtonProps> = ({
  itemId,
  itemName,
}) => {
  // Popoverの開閉状態を管理する
  const [isOpenPopover, setIsOpenPopover] = useState<HTMLButtonElement | null>(
    null,
  );

  const openSharePopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpenPopover(event.currentTarget);
  };

  const closeSharePopover = () => {
    setIsOpenPopover(null);
  };

  const open = Boolean(isOpenPopover);
  const id = open ? 'share-popover' : undefined;
  const url = `${BASE_URL}/items/${itemId}`;

  return (
    <>
      <Tooltip title="共有" placement="right-start">
        <IconButton onClick={openSharePopover}>
          <ShareIcon aria-describedby={id} sx={{ fontSize: ICON_SIZE }} />
        </IconButton>
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={isOpenPopover}
        onClose={closeSharePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <ShareToTwitterButton url={url} title={itemName} />
        <ShareToLineButton url={url} title={itemName} />
      </Popover>
    </>
  );
};
