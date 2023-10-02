import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { SUB_CATEGORY_OPTIONS } from '@/components/types/SubCategoryOptions';

import { categoryValueState } from '@/components/shares/atoms/state/categoryValueState';
import { PullDownSelector } from '@/components/shares/molecules/PullDownSelector';
import { subCategoryValueState } from '@/components/shares/atoms/state/subCategoryValueState';

/**
 * カテゴリーの値によって、サブカテゴリーの選択肢を変更します。
 * カテゴリーが変更されたとき、サブカテゴリーを初期化します。
 * @returns
 */
export const SubCategorySelector = () => {
  const categoryValue = useRecoilValue(categoryValueState);
  const setSubCategoryValue = useSetRecoilState(subCategoryValueState);

  /**
   * カテゴリーが変更されたとき、サブカテゴリーを初期化します。
   */
  useEffect(() => {
    setSubCategoryValue('');
  }, [categoryValue, setSubCategoryValue]);

  if (!categoryValue) {
    setSubCategoryValue('');
    return null;
  }
  const category = categoryValue as keyof typeof SUB_CATEGORY_OPTIONS;
  const subCategoryOptions = SUB_CATEGORY_OPTIONS[category] || [];

  return (
    <PullDownSelector
      options={subCategoryOptions}
      label="SubCategory"
      stateAtom={subCategoryValueState}
    />
  );
};
