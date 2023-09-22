import React, { FormEvent } from 'react';

import { useFetchUserInventory } from '@/hooks/api/useFetchUserInventory';
import { useFetchItems } from '@/hooks/ItemSearchPage/useFetchItems';
import { useItemNameFilters } from '@/hooks/useItemNameFilters';
import { useLayoutCreate } from '@/hooks/useLayoutCreate';

import { AddLayoutPageTemplate } from '@/components/templates/AddLayoutPageTemplate';
import { AddLayoutPageLeftOrganism } from '@/components/pages/addLayoutPage/AddLayoutPageLeftOrganism';
import { AddLayoutPageRightOrganism } from '@/components/pages/addLayoutPage/AddLayoutPageRightOrganism';
import { AddLayoutPageSelectedItemImageList } from '@/components/pages/addLayoutPage/AddLayoutPageSelectedItemImageList';
import { AddLayoutPageTopOrganism } from '@/components/pages/addLayoutPage/AddLayoutPageTopOrganism';

/**
 * レイアウト投稿ページを提供します。
 * クライアントサイドレンダリングでレイアウトの投稿を行う
 */
const AddNewLayoutPage = () => {
  useFetchUserInventory();
  useFetchItems();
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

  // TODO　投稿後の画面遷移

  return (
    <form onSubmit={handleFormSubmit}>
      <AddLayoutPageTemplate
        top={<AddLayoutPageTopOrganism />}
        leftSide={<AddLayoutPageLeftOrganism />}
        rightSide={<AddLayoutPageRightOrganism />}
        bottom={<AddLayoutPageSelectedItemImageList />}
      />
    </form>
  );
};

export default AddNewLayoutPage;
