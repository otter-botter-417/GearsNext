import React, { FC } from 'react';
import { Box } from '@mui/material';
import { DEFAULT_PAGE_WIDTH } from '../constants';

type ItemSearchPageTemplateProps = {
  filterSection: React.ReactNode;
  itemGridSection: React.ReactNode;
};

/**
 * このコンポーネントは、商品検索ページのテンプレートを提供します。
 * - `filterSection` は検索条件を表示するコンポーネント
 * - `itemGridSection` は商品一覧を表示するコンポーネント
 *
 * @param filterSection - 検索条件を表示するコンポーネント
 * @param itemGridSection - 商品一覧を表示するコンポーネント
 *
 * @example
 * <ItemSearchPageTemplate
 *  filterSection={<FilterSection />}
 * itemGridSection={<ItemGridSection />}
 * />
 */
export const ItemSearchPageTemplate: FC<ItemSearchPageTemplateProps> = ({
  filterSection,
  itemGridSection,
}) => {
  return (
    <Box
      style={{ maxWidth: DEFAULT_PAGE_WIDTH, width: '96%', margin: '0 auto' }}
    >
      {filterSection}
      {itemGridSection}
    </Box>
  );
};
