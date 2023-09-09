import { Box, Typography } from '@mui/material';
import { FC } from 'react';

type brandNameType = {
  brandName: string;
};

/**
 * メーカー名を表示する
 *
 * @param brandName
 * @example
 * <BrandName brandName={brandName} />
 */
export const BrandName: FC<brandNameType> = (props) => {
  const { brandName } = props;
  return (
    <Box>
      <Typography variant="h6">{brandName}</Typography>
    </Box>
  );
};
