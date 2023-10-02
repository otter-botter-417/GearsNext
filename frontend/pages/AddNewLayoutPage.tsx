import React, { FormEvent } from 'react';

import { useFetchUserInventory } from '@/hooks/api/useFetchUserInventory';
import { useFetchItems } from '@/hooks/ItemSearchPage/useFetchItems';
import { useItemNameFilters } from '@/hooks/useItemNameFilters';
import { useLayoutCreate } from '@/hooks/useLayoutCreate';

import { LayoutPageTemplate } from '@/components/templates/LayoutPageTemplate';
import { AddLayoutPageLeftOrganism } from '@/components/pages/addLayoutPage/AddLayoutPageLeftOrganism';
import { AddLayoutPageRightOrganism } from '@/components/pages/addLayoutPage/AddLayoutPageRightOrganism';
import { AddLayoutPageSelectedItemImageList } from '@/components/pages/addLayoutPage/AddLayoutPageSelectedItemImageList';
import { AddLayoutPageTopOrganism } from '@/components/pages/addLayoutPage/AddLayoutPageTopOrganism';
import { useInitAddNewLayoutPage } from '@/hooks/useInitAddNewLayoutPage';

/**
 * レイアウト投稿ページを提供します。
 * クライアントサイドレンダリングでレイアウトの投稿を行う
 */
const AddNewLayoutPage = () => {
  useInitAddNewLayoutPage();
  // 商品を取得する
  useFetchItems();
  // ユーザーのインベントリを取得する
  useFetchUserInventory();

  useItemNameFilters();
  const { layoutPost } = useLayoutCreate();

  /**
   * フォーム送信ロジック
   * レイアウトの投稿処理を呼び出します
   */
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    layoutPost();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <LayoutPageTemplate
        top={<AddLayoutPageTopOrganism />}
        leftSide={<AddLayoutPageLeftOrganism />}
        rightSide={<AddLayoutPageRightOrganism />}
        bottom={<AddLayoutPageSelectedItemImageList />}
      />
    </form>
  );
};

export default AddNewLayoutPage;
