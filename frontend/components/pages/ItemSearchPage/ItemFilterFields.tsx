import { useRecoilValue } from 'recoil';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

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
    <Grid container spacing={2}>
      {/* 基本検索条件をまとめたコンポーネント */}
      <Grid xs={12}>
        <MainFilterSection />
      </Grid>
      {/* 折りたたみ可能なセクション */}
      <Grid xs={12}>
        <AccordionSection />
      </Grid>
      {/* 条件クリア */}
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        padding={1}
      >
        <FilterResetButton />
        <Box display="flex" alignItems="center">
          <Typography width={'100px'}>{`${filteredItemCount}件`}</Typography>
          <PullDownSelector
            options={SortPattern}
            label="並び替え"
            stateAtom={sortPatternValueState}
          />
        </Box>
      </Box>
    </Grid>
  );
};
