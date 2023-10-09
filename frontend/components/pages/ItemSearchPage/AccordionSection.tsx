import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';

import { ItemTagList } from '@/components/shares/atoms/SelectNames/ItemTagList';
import { ColorTagList } from '@/components/shares/atoms/SelectNames/ColorTagList';

import { itemTagsState } from '@/components/shares/atoms/state/itemTagsState';
import { colorTagsState } from '@/components/shares/atoms/state/colorTagsState';

import { PullDownMultiSelector } from '@/components/shares/molecules/PullDownMultiSelector';
import { PriceSlider } from '@/components/pages/ItemSearchPage/PriceSlider';
import { FilterToggleButton } from '@/components/pages/ItemSearchPage/FilterToggleButton';

// アコーディオンの外枠のスタイルを定義 通常だと薄いため太くしている
const CustomAccordion = styled(Accordion)({
  border: '1px solid #ccc', // 枠線の太さと色を設定
});

/**
 * このコンポーネントは商品検索ページで提供される詳細オプションのセクションです。
 * - 複数選択が可能なタグフィルタ
 * - 複数選択が可能なカラーフィルタ
 * - 価格帯を選択するためのスライダー
 * - AND/OR フィルタリングを切り替えるためのトグルスイッチ
 *
 * @example
 * ```tsx
 * <AccordionSection />
 * ```
 *
 * @returns 商品検索ページで提供される詳細オプションのセクション。
 */
export const AccordionSection = () => (
  <CustomAccordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography variant="body2">詳細オプション</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Grid container spacing={1}>
        <Grid item xs={12} md={2}>
          <FilterToggleButton />
        </Grid>
        <Grid item xs={6} md={5} >
          <PullDownMultiSelector
            options={ItemTagList}
            label="タグ"
            stateAtom={itemTagsState}
          />
        </Grid>
        <Grid item xs={6} md={5}>
          <PullDownMultiSelector
            options={ColorTagList}
            label="カラー"
            stateAtom={colorTagsState}
          />
        </Grid>
        <Grid item xs={12}>
          <PriceSlider />
        </Grid>
      </Grid>
    </AccordionDetails>
  </CustomAccordion>
);
