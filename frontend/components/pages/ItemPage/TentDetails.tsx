import { FC } from 'react';
import { Box } from '@mui/material';

import { CapacityPeople } from '@/components/pages/ItemPage/Details/CapacityPeople';
import { InnerTent } from '@/components/pages/ItemPage/Details/InnerTent';
import { GrandSheet } from '@/components/pages/ItemPage/Details/GrandSheet';
import { Fabrics } from '@/components/pages/ItemPage/Details/Fabrics';

type TentDetailsType = {
  itemAttributes: {
    capacity: number;
    inner_tent: string;
    grand_sheet: string;
    fabrics: string;
  };
};

/**
 * テントの詳細情報を表示する
 *
 * @example
 * <TentDetails />
 */
export const TentDetails: FC<TentDetailsType> = ({ itemAttributes }) => {
  if (itemAttributes)
    return (
      <Box>
        {/* テント各種データ */}
        <CapacityPeople capacity={itemAttributes.capacity} />
        <InnerTent innerTent={itemAttributes.inner_tent} />
        <GrandSheet grandSheet={itemAttributes.grand_sheet} />
        <Fabrics fabrics={itemAttributes.fabrics} />
      </Box>
    );
  else return <></>;
};
