import React, { FC } from 'react';
import { LayoutTextFields } from '@/components/pages/addLayoutPage/LayoutTextFields';
import { LayoutItemAdder } from '@/components/pages/addLayoutPage/LayoutItemAdder';

/**
 * このコンポーネントは、レイアウト投稿ページの右側に配置される主要なUIを提供します。
 * - レイアウト説明文の入力: ユーザーがレイアウトの説明文を入力できます。
 * - 商品の選択: レイアウトに使用する商品を選択するUIが提供されます。
 *
 * @returns {JSX.Element} レイアウト説明文フィールドと商品選択コンポーネントを含むReact要素

 */
export const AddLayoutPageRightOrganism: FC = () => {
  return (
    <>
      <LayoutTextFields />
      <LayoutItemAdder />
    </>
  );
};
