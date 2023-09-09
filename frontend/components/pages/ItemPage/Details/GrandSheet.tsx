import { FC } from 'react';
import { ItemDataText } from '../../../atoms/itemPage/text/ItemDataText';
import { ItemDetailText } from '../../../atoms/itemPage/text/ItemDetailText';

type grandSheetType = {
  grandSheet: string;
};

/**
 * グランドシートの情報を表示する
 *
 * @param grandSheet
 * @example
 * <GrandSheet grandSheet={grandSheet} />
 */
export const GrandSheet: FC<grandSheetType> = (props) => {
  const { grandSheet } = props;
  return (
    <div>
      <ItemDataText text={'グランドシート'} />
      <ItemDetailText text={`${grandSheet}`} />
    </div>
  );
};
