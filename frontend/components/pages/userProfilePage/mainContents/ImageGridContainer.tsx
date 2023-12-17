import React, { FC } from 'react';

import { ContentType } from '@/components/types/ContentType';
import { UserProfilePageContentType } from '@/components/types/UserProfilePageContentType';
import { useSortedItems } from '@/hooks/UserProfilePage/useSortedItems';
import ImageGrid from './ImageGrid';

type ImageGridContainerProps = {
  items: UserProfilePageContentType[];
  type: ContentType;
};

/**
 * このコンテナコンポーネントは、アイテムのリストとその表示タイプ（item/layout）を受け取り、
 * ソートされたアイテムのリストを ImageGrid コンポーネントに渡します。
 * データフェッチングや状態管理のロジックをカプセル化し、プレゼンテーショナルコンポーネントに対して
 * 必要なデータと機能を提供します。
 *
 * @param items 表示するアイテムのデータオブジェクトの配列
 * @param type 表示するアイテムのタイプ（'item' または 'layout'）
 *
 * @returns ソートされたアイテムのリストを ImageGrid コンポーネントに渡すコンポーネント。
 */
const ImageGridContainer: FC<ImageGridContainerProps> = ({ items, type }) => {
  const { sortedItems, sortAscending, handleSwitchChange } =
    useSortedItems(items);

  return (
    <ImageGrid
      sortedItems={sortedItems}
      type={type}
      sortAscending={sortAscending}
      handleSwitchChange={handleSwitchChange}
    />
  );
};

export default ImageGridContainer;
