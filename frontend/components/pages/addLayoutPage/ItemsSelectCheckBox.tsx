import React, { FC } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

import { selectedItemsListState } from '@/components/shares/atoms/state/selectedItemsListState';
import { selectedCategoryNameState } from '@/components/shares/atoms/state/selectedCategoryNameState';
import { userInventoryItemListState } from '@/components/shares/atoms/state/userInventoryItemListState';

import { ItemDataType } from '@/components/types/ItemDataType';
import { apiFetchedItemsState } from '@/components/shares/atoms/state/apiFetchedItemsState';
import { itemSearchQueryState } from '@/components/shares/atoms/state/itemSearchQueryState';

const SELECTED_CATEGORY = '選択中';
const INVENTORY_CATEGORY = '持っている';
const ALL_CATEGORY = 'すべて';
/**
 * このコンポーネントは、ユーザーがレイアウトに使用する商品を選択するためのチェックボックスリストのUIを提供します。
 *
 * - チェックボックス: ユーザーが商品を選択できるUIが提供されます。
 * - カテゴリフィルター: `selectedCategoryName`に基づいて表示する商品をフィルタリングします。
 *
 * @returns {JSX.Element}
 */
export const ItemsSelectCheckBox: FC = () => {
  const userInventoryItemList = useRecoilValue(userInventoryItemListState);
  const apiFetchedItems = useRecoilValue(apiFetchedItemsState);
  const [selectedItemsList, setSelectedItemsList] = useRecoilState(
    selectedItemsListState,
  );
  const selectedCategoryName = useRecoilValue(selectedCategoryNameState);
  const itemSearchQuery = useRecoilValue(itemSearchQueryState);

  /**
   * ユーザーが選択した商品の中に、指定した商品が含まれているかどうかを判定する関数。
   * @param itemId
   * @returns {boolean} 指定した商品が含まれているかどうか。
   */
  const isItemSelected = (itemId: number): boolean =>
    Boolean(selectedItemsList.find((item) => item.itemId === itemId));

  /**
   * チェックボックスの選択状態が変更された際に呼び出されるハンドラー。
   * - チェックボックスの選択状態に応じて、selectedItemsListState ステートを更新する。
   * @param itemId
   */
  const handleChange =
    (itemId: number) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const newSelectedItemsList = (
        event.target.checked
          ? [
              ...selectedItemsList,
              apiFetchedItems.find((item) => item.itemId === itemId),
            ].filter((item): item is ItemDataType => item !== undefined)
          : selectedItemsList.filter((item) => item.itemId !== itemId)
      ) as ItemDataType[];

      setSelectedItemsList(newSelectedItemsList);
    };

  return (
    <FormGroup style={{ paddingLeft: '16px' }}>
      {apiFetchedItems.map((item) => {
        const shouldDisplay =
          (selectedCategoryName === SELECTED_CATEGORY // 選択中のカテゴリー
            ? isItemSelected(item.itemId)
            : // 持っている物の場合
            selectedCategoryName === INVENTORY_CATEGORY
            ? userInventoryItemList.some(
                (inventoryItem) => inventoryItem.id === item.itemId,
              )
            : selectedCategoryName === ALL_CATEGORY ||
              item.categoryName === selectedCategoryName) && // 新しい条件を追加: itemSearchQueryのチェック
          (itemSearchQuery === '' || item.itemName.includes(itemSearchQuery));

        return (
          shouldDisplay && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={isItemSelected(item.itemId)}
                  onChange={handleChange(item.itemId)}
                />
              }
              label={item.itemName}
              key={item.itemId}
            />
          )
        );
      })}
    </FormGroup>
  );
};
