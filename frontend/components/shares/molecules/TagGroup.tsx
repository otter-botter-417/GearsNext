import React, { FC } from 'react';
import { TagFormNamesList } from '@/components/shares/atoms/valueNameList/TagFormNamesList';
import { TagSelector } from '../atoms/form/TagSelector';

/**
 * 複数の TagSelector コンポーネントをまとめて管理します。
 * - TagFormNamesList に定義された各種商品情報入力フィールドを使用
 */
export const TagGroup: FC = () => {
  return (
    <>
      {TagFormNamesList.map((field) => (
        <TagSelector key={field.name} idName={field.name} label={field.label} />
      ))}
    </>
  );
};