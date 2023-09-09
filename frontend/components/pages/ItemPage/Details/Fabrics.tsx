import { FC } from 'react';
import { ItemDataText } from '@/components/shares/atoms/text/ItemDataText';
import { ItemDetailListText } from '@/components/shares/atoms/text/ItemDetailListText';

type fabricsType = {
  fabrics: string;
};

/**
 * 素材の情報を表示する
 *
 * @param fabrics
 * @example
 * <Fabrics fabrics={fabrics} />
 */
export const Fabrics: FC<fabricsType> = (props) => {
  const { fabrics } = props;
  if (!fabrics) return null;

  return (
    <div>
      <ItemDataText text={'素材'} />
      <ItemDetailListText text={`${fabrics}`} />
    </div>
  );
};
