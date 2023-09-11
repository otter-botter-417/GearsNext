import { FC } from 'react';
import { ItemDataText } from '@/components/shares/atoms/text/ItemDataText';
import { ItemDetailText } from '@/components/shares/atoms/text/ItemDetailText';

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
export const GrandSheet: FC<grandSheetType> = ({ grandSheet }) => {
  if (!grandSheet) return null;
  return (
    <div>
      <ItemDataText text={'グランドシート'} />
      <ItemDetailText text={`${grandSheet}`} />
    </div>
  );
};
