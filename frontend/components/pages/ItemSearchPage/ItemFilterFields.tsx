import { useRecoilValue } from 'recoil';
import { TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';

import { CategoryNameList } from '@/components/atoms/itemAppend/SelectNames/CategoryNameList';
import { SubCategoryNameList } from '@/components/atoms/itemAppend/SelectNames/SubCategoryNameList';
import { ItemTagList } from '@/components/atoms/itemAppend/SelectNames/ItemTagList';
import { ColorTagList } from '@/components/atoms/itemAppend/SelectNames/ColorTagList';

import { categoryValueState } from '@/components/shares/atoms/state/categoryValueState';
import { subCategoryValueState } from '@/components/shares/atoms/state/subCategoryValueState';
import { itemTagsState } from '@/components/shares/atoms/state/itemTagsState';
import { colorTagsState } from '@/components/shares/atoms/state/colorTagsState';
import { filteredItemCountState } from '@/components/shares/atoms/state/filteredItemCountState';
import { sortPatternValueState } from '@/components/shares/atoms/state/sortPatternValueState';

import { PullDownSelector } from '@/components/shares/molecules/PullDownSelector';
import { PullDownMultiSelector } from '@/components/shares/molecules/PullDownMultiSelector';

import PriceSlider from '@/components/pages/ItemSearchPage/PriceSlider';
import { FilterResetButton } from '@/components/pages/ItemSearchPage/FilterResetButton';
import { FilterToggleButton } from '@/components/pages/ItemSearchPage/FilterToggleButton';
import { SortPattern } from '@/components/pages/ItemSearchPage/SortPattern';

/**
 * 商品検索ページの条件選択フィールド
 * @returns
 */
export const ItemFilterFields = () => {
  const filteredItemCount = useRecoilValue(filteredItemCountState);

  return (
    <>
      <Box display={'flex'} alignItems="center" width={'80%'} margin={2}>
        {/* //TODO キーワード検索 */}
        <TextField id="keyword" label="キーワードから探す" defaultValue="" />

        {/* カテゴリー */}
        <PullDownSelector
          options={CategoryNameList}
          label="Category"
          stateAtom={categoryValueState}
        />

        {/* サブカテゴリー*/}
        <PullDownSelector
          options={SubCategoryNameList}
          label="SubCategory"
          stateAtom={subCategoryValueState}
        />
      </Box>

      <Box display={'flex'} alignItems="center" width={'80%'}>
        {/* トグルスイッチ */}
        <FilterToggleButton />

        {/* タグ */}
        <PullDownMultiSelector
          options={ItemTagList}
          label="タグ"
          stateAtom={itemTagsState}
        />

        {/* カラータグ */}
        <PullDownMultiSelector
          options={ColorTagList}
          label="カラー"
          stateAtom={colorTagsState}
        />

        {/* 価格スライダー */}
        <Box flexGrow={1} padding={4} width={'100%'}>
          <PriceSlider />
        </Box>

        {/* 条件クリア */}
        <FilterResetButton />

        <Box display={'flex'} justifyContent="flex-end" width={'100%'}>
          {/* 対象商品数 */}
          <Box padding={2}>
            <Typography>{`${filteredItemCount}件`}</Typography>
          </Box>

          {/* 並び替え */}
          <Box justifyContent="flex-end" width={'20%'}>
            <PullDownSelector
              options={SortPattern}
              label="並び替え"
              stateAtom={sortPatternValueState}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};
