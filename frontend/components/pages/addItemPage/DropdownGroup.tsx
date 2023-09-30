import React, { FC } from 'react';

import { DropdownSelector } from '@/components/shares/atoms/form/DropdownSelector';
import { DropDownFormNamesList } from '@/components/shares/atoms/valueNameList/DropDownFormNamesList';

/**
 * 複数の DropdownSelector コンポーネントをまとめて管理します。
 * - DropDownFormNamesList に定義された各種商品情報入力フィールドを使用
 */
export const DropdownGroup: FC = () => {
  return (
    <>
      {DropDownFormNamesList.map((field) => (
        <DropdownSelector
          key={field.name}
          name={field.name}
          label={field.label}
        />
      ))}
    </>
  );
};
