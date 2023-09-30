import { useRecoilValue } from 'recoil';
import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';

import { filteredItemCountState } from '@/components/shares/atoms/state/filteredItemCountState';
import { sortPatternValueState } from '@/components/shares/atoms/state/sortPatternValueState';

import { PullDownSelector } from '@/components/shares/molecules/PullDownSelector';
import { FilterResetButton } from '@/components/pages/ItemSearchPage/FilterResetButton';
import { SortPattern } from '@/components/pages/ItemSearchPage/SortPattern';
import { AccordionSection } from './AccordionSection';
import { MainFilterSection } from './MainFilterSection';

/**
 * 商品検索ページの主要なフィルタリングオプションを表示するコンポーネントです。
 * - 検索バー、カテゴリー、サブカテゴリーの選択（MainFilterSectionコンポーネント）
 * - タグ、カラー、価格範囲などの詳細オプション（AccordionSectionコンポーネント）
 * - 条件のクリアボタン
 * - 並び替えオプション
 * - 現在の検索条件に一致する商品数の表示
 *
 * @returns 商品検索ページのフィルタリングオプションを表示するコンポーネント。
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
        {/* 基本検索条件をまとめたコンポーネント */}
        <Grid item xs={12}>
          <MainFilterSection />
        </Grid>

        {/* 折りたたみ可能なセクション */}
        <Grid item xs={12}>
          <AccordionSection />
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
