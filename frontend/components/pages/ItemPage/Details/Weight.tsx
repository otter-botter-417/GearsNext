import { FC } from 'react';
import { ItemDataText } from '@/components/shares/atoms/text/ItemDataText';
import { ItemDetailText } from '@/components/shares/atoms/text/ItemDetailText';

type WeightType = {
  weight: number;
};

/**
 * 重量の情報を表示する
 *
 * @param weight
 * @example
 * <Weight weight={weight} />
 */
export const Weight: FC<WeightType> = ({ weight = 0 }) => {
  return (
    <div>
      <ItemDataText text={'重量'} />
      <ItemDetailText text={`${weight}kg`} />
    </div>
  );
};
