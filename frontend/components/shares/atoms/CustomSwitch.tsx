import React, { FC } from 'react';
import { Switch } from '@mui/material';

type CustomSwitchProps = {
  switchState: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

/**
 * 二項目の切り替えスイッチとして機能する、Material-UI の Switch コンポーネントをラップしたカスタムコンポーネントです。
 * このコンポーネントは、boolean 型の状態（`switchState`）に基づいてスイッチのオン/オフを表示し、
 * ユーザーの操作に応じて状態を切り替えることができます。
 *
 * @param switchState: スイッチの現在の状態を表す boolean
 * @param handleChange: スイッチの状態を切り替える際に発火するハンドラー関数。React の ChangeEvent<HTMLInputElement> を引数に取ります
 */
const CustomSwitch: FC<CustomSwitchProps> = ({ switchState, handleChange }) => {
  return <Switch checked={switchState} onChange={handleChange} />;
};

export default CustomSwitch;
