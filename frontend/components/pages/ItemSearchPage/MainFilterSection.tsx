import { Grid } from '@mui/material';

import { CategoryNameList } from '@/components/shares/atoms/SelectNames/CategoryNameList';

import { categoryValueState } from '@/components/shares/atoms/state/categoryValueState';

import { PullDownSelector } from '@/components/shares/molecules/PullDownSelector';
import { SearchBar } from '@/components/pages/ItemSearchPage/SearchBar';
import { SubCategorySelector } from './SubCategorySelector';

/**
 * このコンポーネントは商品検索ページの主要なフィルタリングオプションを提供するセクションです。
 * - キーワードで検索するための検索バー
 * - メインカテゴリーを選択するためのドロップダウンメニュー
 * - 選択されたメインカテゴリーに基づいて変更されるサブカテゴリーセレクター
 *
 * @example
 * ```tsx
 * <MainFilterSection />
 * ```
 *
 * @returns 商品検索ページの主要なフィルタリングオプションを提供するセクション。
 */
export const MainFilterSection = () => {
  const ExtendedCategoryNameList = ['すべてのカテゴリー', ...CategoryNameList];
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SearchBar />
      </Grid>

      {/* カテゴリーとサブカテゴリー */}
      <Grid item xs={12} sm={6}>
        <PullDownSelector
          options={ExtendedCategoryNameList}
          label="Category"
          stateAtom={categoryValueState}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        {/* サブカテゴリー切り替え */}
        <SubCategorySelector />
      </Grid>
    </Grid>
  );
};
