import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FC } from 'react';

type itemNameType = {
  itemName: string;
};

/**
 * 商品名を表示する
 *
 * @param itemName
 * @example
 * <ItemName itemName={itemName} />
 */
export const ItemName: FC<itemNameType> = (props) => {
  const { itemName } = props;

  return (
    <Box>
      <Typography variant="h4">{itemName}</Typography>
    </Box>
  );
};
