import { FC } from 'react';
import { Typography } from '@mui/material';
import { ItemDetailText } from '@/components/shares/atoms/text/ItemDetailText';

type priceType = {
  price: number;
};

/**
 * メーカー希望小売価格の情報を表示する
 *
 * @param price
 * @example
 * <Price price={price} />
 */
export const Price: FC<priceType> = ({ price = 0 }) => {
  return (
    <div>
      <Typography variant={'h6'}>メーカー希望小売価格</Typography>
      <ItemDetailText text={`¥${price.toLocaleString()}`}></ItemDetailText>
    </div>
  );
};
