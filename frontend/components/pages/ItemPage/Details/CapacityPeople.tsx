import { FC } from 'react';
import { ItemDataText } from '@/components/shares/atoms/text/ItemDataText';
import { ItemDetailText } from '@/components/shares/atoms/text/ItemDetailText';

type capacityType = {
  capacity: number;
};

/**
 * 収容人数を表示する
 *
 * @param props
 * @example
 * <CapacityPeople capacity={capacity} />
 */
export const CapacityPeople: FC<capacityType> = (props) => {
  const { capacity } = props;
  if (!capacity) return null;
  return (
    <div>
      <ItemDataText text={'収容人数'} />
      <ItemDetailText text={`${capacity}人`} />
    </div>
  );
};
