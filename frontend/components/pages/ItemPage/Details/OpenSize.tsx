import { FC } from 'react';
import { ItemDataText } from '../../../atoms/itemPage/text/ItemDataText';
import { ItemDetailText } from '../../../atoms/itemPage/text/ItemDetailText';
interface openSizesProps {
  openSizes: {
    openWidth: number;
    openDepth: number;
    openHeight: number;
  };
}

/**
 * 展開時サイズの情報を表示する
 *
 * @param openSizes
 * @example
 * <OpenSize openSizes={openSizes} />
 */
export const OpenSize: FC<openSizesProps> = (props) => {
  const { openSizes } = props;
  return (
    <div>
      <ItemDataText text={'サイズ (幅×奥行き×高さ)'} />
      <ItemDetailText
        text={`${openSizes.openWidth} × ${openSizes.openDepth} × ${openSizes.openHeight} cm`}
      />
    </div>
  );
};
