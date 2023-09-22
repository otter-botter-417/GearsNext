import React, { FC } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

import { selectedItemsListState } from '@/components/shares/atoms/state/selectedItemsListState';
import { selectedCategoryNameState } from '@/components/shares/atoms/state/selectedCategoryNameState';
import { userInventoryItemListState } from '@/components/shares/atoms/state/userInventoryItemListState';

import { ItemDataTypes } from '@/components/types/ItemDataTypes';

const SELECTED_CATEGORY = '選択中';
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
  const [selectedItemsList, setSelectedItemsList] = useRecoilState(
    selectedItemsListState,
  );
  const selectedCategoryName = useRecoilValue(selectedCategoryNameState);

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
              userInventoryItemList.find((item) => item.itemId === itemId),
            ].filter((item): item is ItemDataTypes => item !== undefined)
          : selectedItemsList.filter((item) => item.itemId !== itemId)
      ) as ItemDataTypes[];

      setSelectedItemsList(newSelectedItemsList);
    };

  return (
    <FormGroup style={{ paddingLeft: '16px' }}>
      {userInventoryItemList.map((item) => {
        const shouldDisplay =
          selectedCategoryName === SELECTED_CATEGORY
            ? isItemSelected(item.itemId)
            : selectedCategoryName === ALL_CATEGORY ||
              item.categoryName === selectedCategoryName;

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
