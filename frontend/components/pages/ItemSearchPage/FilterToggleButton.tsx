import React, { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

import { filterSwitchState } from '@/components/shares/atoms/state/filterSwitchState';

/**
 * 商品検索ページの絞り込み条件のAND/ORを切り替えるトグルボタン
 * @example
 * <FilterToggleButton />
 */
export const FilterToggleButton = () => {
  const [filterSwitch, setFilterSwitch] = useRecoilState(filterSwitchState);

  /**
   * トグルボタンの状態を更新する
   */
  const handleChangeToggleButton = (
    _: ChangeEvent<{}>,
    newAlignment: string | null,
  ) => {
    if (newAlignment !== null) {
      setFilterSwitch(newAlignment);
    }
  };

  return (
    <ToggleButtonGroup
      value={filterSwitch}
      size="small"
      exclusive
      onChange={handleChangeToggleButton}
    >
      <ToggleButton value="or">OR</ToggleButton>
      <ToggleButton value="and">AND</ToggleButton>
    </ToggleButtonGroup>
  );
};
