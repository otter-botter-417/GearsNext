import { Box } from '@mui/material';
import { useRecoilValue } from 'recoil';

import { itemDetailState } from '@/components/shares/atoms/state/itemDetailState';

import { CapacityPeople } from '@/components/pages/ItemPage/Details/CapacityPeople';
import { InnerTent } from '@/components/pages/ItemPage/Details/InnerTent';
import { GrandSheet } from '@/components/pages/ItemPage/Details/GrandSheet';
import { Fabrics } from '@/components/pages/ItemPage/Details/Fabrics';

/**
 * テントの詳細情報を表示する
 *
 * @example
 * <TentDetails />
 */
export const TentDetails = () => {
  const itemDetail = useRecoilValue(itemDetailState);

  if (itemDetail)
    return (
      <Box>
        {/* テント各種データ */}
        <CapacityPeople capacity={itemDetail.itemAttributes.capacity} />
        <InnerTent innerTent={itemDetail.itemAttributes.inner_tent} />
        <GrandSheet grandSheet={itemDetail.itemAttributes.grand_sheet} />
        <Fabrics fabrics={itemDetail.itemAttributes.fabrics} />
      </Box>
    );
  else return <></>;
};
