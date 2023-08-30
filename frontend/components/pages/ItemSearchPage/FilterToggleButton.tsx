import { filterSwitchState } from '@/components/shares/atoms/state/filterSwitchState';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';

/**
 * 商品検索ページの絞り込み条件のAND/ORを切り替えるトグルボタン
 */
export const FilterToggleButton = () => {
  const [filterSwitch, setFilterSwitch] = useRecoilState(filterSwitchState);

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
      exclusive
      onChange={handleChangeToggleButton}
    >
      <ToggleButton value="or">OR</ToggleButton>
      <ToggleButton value="and">AND</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default FilterToggleButton;
