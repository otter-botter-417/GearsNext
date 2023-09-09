import { FC } from 'react';
import { ItemDataText } from '@/components/shares/atoms/text/ItemDataText';
import { ItemDetailText } from '@/components/shares/atoms/text/ItemDetailText';

interface storageSizesProps {
  storageSizes: {
    storageWidth: number;
    storageDepth: number;
    storageHeight: number;
  };
}

/**
 * 収納時サイズの情報を表示する
 *
 * @param storageSizes
 * @example
 * <storageSize storageSizes={storageSizes} />
 */
export const StorageSize: FC<storageSizesProps> = (props) => {
  const { storageSizes } = props;
  return (
    <div>
      <ItemDataText text={'収納サイズ (幅×奥行き×高さ)'} />
      <ItemDetailText
        text={`${storageSizes.storageWidth} × ${storageSizes.storageDepth} × ${storageSizes.storageHeight} cm`}
      />
    </div>
  );
};
