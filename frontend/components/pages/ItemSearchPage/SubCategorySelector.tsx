import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { SUB_CATEGORY_OPTIONS } from '@/components/types/SubCategoryOptions';

import { categoryValueState } from '@/components/shares/atoms/state/categoryValueState';
import { PullDownSelector } from '@/components/shares/molecules/PullDownSelector';
import { subCategoryValueState } from '@/components/shares/atoms/state/subCategoryValueState';
import { useItemListFilters } from '@/hooks/ItemSearchPage/useItemListFilters';

/**
 * カテゴリーの値によって、サブカテゴリーの選択肢を変更します。
 * カテゴリーが変更されたとき、サブカテゴリーを初期化します。
 * @returns
 */
export const SubCategorySelector = () => {
  const categoryValue = useRecoilValue(categoryValueState);
  const [subCategoryValue, setSubCategoryValue] = useRecoilState(
    subCategoryValueState,
  );

  useEffect(() => {
    setSubCategoryValue('すべてのサブカテゴリー');
  }, [categoryValue, setSubCategoryValue]);

  let subCategoryOptions = [];
  if (categoryValue === 'すべてのカテゴリー') {
    subCategoryOptions = ['すべてのサブカテゴリー'];
  } else {
    const category = categoryValue as keyof typeof SUB_CATEGORY_OPTIONS;
    subCategoryOptions = ['すべてのサブカテゴリー'].concat(
      SUB_CATEGORY_OPTIONS[category] || [],
    );
  }
  const validValue = subCategoryOptions.includes(subCategoryValue)
    ? subCategoryValue
    : 'すべてのサブカテゴリー';
  return (
    <PullDownSelector
      options={subCategoryOptions}
      label="SubCategory"
      stateAtom={subCategoryValueState}
      value={validValue}
    />
  );
};
