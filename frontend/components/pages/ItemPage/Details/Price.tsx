import { FC } from 'react';
import { Typography } from '@mui/material';
import { ItemDetailText } from '../../../atoms/itemPage/text/ItemDetailText';

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
export const Price: FC<priceType> = (props) => {
  const { price } = props;
  return (
    <div>
      <Typography variant={'h6'}>メーカー希望小売価格</Typography>
      <ItemDetailText text={`¥${price.toLocaleString()}`}></ItemDetailText>
    </div>
  );
};
