import React from 'react';
import { useRecoilState } from 'recoil';

import { EditableLabel } from './EditableLabel';
import { imageMapDataListState } from '@/components/shares/atoms/state/imageMapDataListState';

/**
 * このコンポーネントは、imageMapDataList ステートから取得した情報を用いて、
 * 選択済みのイメージマップラベルを画面に表示します。
 *
 * @returns {JSX.Element} 選択されたイメージマップのラベル一覧
 *
 * @example
 * <ImageMapLabel />
 */
export const ImageMapLabel = () => {
  const [imageMapDataList, setImageMapDataList] = useRecoilState(
    imageMapDataListState,
  );

  /**
   * イメージマップから指定の要素（アイテムIDによって識別）を削除する
   * @param itemId
   */
  const removeLabel = (itemId: number): void => {
    setImageMapDataList((prevList) =>
      prevList.filter((item) => item.itemId !== itemId),
    );
  };

  if (!imageMapDataList) return null;

  return (
    <>
      {imageMapDataList.map((item) => (
        <EditableLabel key={item.itemId} item={item} onRemove={removeLabel} />
      ))}
    </>
  );
};
