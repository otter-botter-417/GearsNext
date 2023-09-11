import { useRecoilValue } from 'recoil';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { CategoryNameList } from '@/components/shares/atoms/SelectNames/CategoryNameList';
import { SubCategoryNameList } from '@/components/shares/atoms/SelectNames/SubCategoryNameList';
import { ItemTagList } from '@/components/shares/atoms/SelectNames/ItemTagList';
import { ColorTagList } from '@/components/shares/atoms/SelectNames/ColorTagList';

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
import { SearchBar } from '@/components/pages/ItemSearchPage/SearchBar';

/**
 * 商品検索ページの条件選択フィールド
 * @returns
 */
export const ItemFilterFields = () => {
  const filteredItemCount = useRecoilValue(filteredItemCountState);

  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        style={{ width: '80%', margin: '0 auto' }}
      >
        {/* キーワード検索 */}
        <Grid item xs={12}>
          <SearchBar />
        </Grid>

        {/* カテゴリーとサブカテゴリー */}
        <Grid item xs={6}>
          <PullDownSelector
            options={CategoryNameList}
            label="Category"
            stateAtom={categoryValueState}
          />
        </Grid>
        <Grid item xs={6}>
          <PullDownSelector
            options={SubCategoryNameList}
            label="SubCategory"
            stateAtom={subCategoryValueState}
          />
        </Grid>

        {/* 折りたたみ可能なセクション */}
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="body2">詳細オプション</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={1}>
                {/* トグルスイッチ */}
                <Grid item xs={1} sx={{ minWidth: '90px' }}>
                  <FilterToggleButton />
                </Grid>
                {/* タグ */}
                <Grid item xs={5} sx={{ minWidth: '300px' }}>
                  <PullDownMultiSelector
                    options={ItemTagList}
                    label="タグ"
                    stateAtom={itemTagsState}
                  />
                </Grid>
                {/* カラータグ */}
                <Grid item xs={5} sx={{ minWidth: '300px' }}>
                  <PullDownMultiSelector
                    options={ColorTagList}
                    label="カラー"
                    stateAtom={colorTagsState}
                  />
                </Grid>
                {/* 価格スライダー */}
                <Grid item xs={12}>
                  <PriceSlider />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>


        {/* 条件クリア */}
        <Grid item xs={3}>
          <FilterResetButton />
        </Grid>

        <Grid item xs={7}>
          <Box display={'flex'} justifyContent="flex-end" width={'100%'}>
            {/* 対象商品数と並び替え */}
            <Box padding={2}>
              <Typography>{`${filteredItemCount}件`}</Typography>
            </Box>
            <Box width={'20%'}>
              <PullDownSelector
                options={SortPattern}
                label="並び替え"
                stateAtom={sortPatternValueState}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
