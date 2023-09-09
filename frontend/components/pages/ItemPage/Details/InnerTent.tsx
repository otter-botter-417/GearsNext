import { FC } from 'react';
import { ItemDataText } from '../../../atoms/itemPage/text/ItemDataText';
import { ItemDetailText } from '../../../atoms/itemPage/text/ItemDetailText';

type innerTentType = {
  innerTent: string;
};

/**
 * インナーテントの情報を表示する
 *
 * @param innerTent
 * @example
 * <InnerTent innerTent={innerTent} />
 */
export const InnerTent: FC<innerTentType> = (props) => {
  const { innerTent } = props;
  if (!innerTent) return null;
  return (
    <div>
      <ItemDataText text={'インナーテント'} />
      <ItemDetailText text={`${innerTent}`} />
    </div>
  );
};
