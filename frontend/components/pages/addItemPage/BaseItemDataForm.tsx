import React, { FC } from 'react';

import { TagGroup } from '@/components/shares/molecules/TagGroup';
import { DropdownGroup } from '@/components/pages/addItemPage/DropdownGroup';
import { ItemSizeInputFields } from '@/components/pages/addItemPage/ItemSizeInputFields';
import { ItemDetailInputFields } from '@/components/pages/addItemPage/ItemDetailInputFields';

/**
 * 商品の基本情報を入力フォームをまとめたコンポーネントです。
 * - 手入力の各種商品情報入力コンポーネント
 * - 商品サイズ入力コンポーネント
 * - プルダウン選択式の各種商品情報入力コンポーネント
 * - タグ選択式の各種商品情報入力コンポーネント
 */
export const BaseItemDataForm: FC = () => {
  return (
    <>
      {/* 手入力の各種商品情報入力コンポーネント */}
      <ItemDetailInputFields />
      {/* 商品サイズ入力コンポーネント */}
      <ItemSizeInputFields />
      {/* プルダウン選択式の各種商品情報入力コンポーネント */}
      <DropdownGroup />
      {/* タグ選択式の各種商品情報入力コンポーネント */}
      <TagGroup />
    </>
  );
};
