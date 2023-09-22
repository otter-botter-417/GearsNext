import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { Box, Button } from '@mui/material';

import { imageMapPositionState } from '@/components/shares/atoms/state/imageMapPositionState';

import { ImageMapTabMenu } from './ImageMapTabMenu';
import { ItemNameSearchField } from './ItemNameSearchField';
import { ImageMapItemSelectorList } from './ImageMapItemSelectorList';

type ImageMapTagEditorType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * このコンポーネントは、ユーザーが画像上でクリックした座標にポップアップ形式で表示され、
 * イメージマップ（クリック可能な領域）に配置するラベルを選択するUIを提供します。
 *
 * @param {Object} props
 * @param {boolean} props.open - コンポーネントの表示/非表示を制御するフラグ
 * @param {Function} props.setOpen - `open` フラグの状態を変更する関数
 *
 * @returns {JSX.Element|null} 選択UIを構成するReactコンポーネント。`open`がfalseの場合はnull。
 */
export const ImageMapTagEditor: FC<ImageMapTagEditorType> = ({
  open,
  setOpen,
}) => {
  const textFieldPosition = useRecoilValue(imageMapPositionState);
  if (!open) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        color: '#474a4d',
        borderColor: '#474a4d',
        borderWidth: '2px',
        borderStyle: 'solid',
        overflow: 'auto',
      }}
      style={{
        width: 400,
        height: 400,
        position: 'absolute',
        top: `${textFieldPosition.y}%`,
        left: `${textFieldPosition.x}%`,
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          p: 0,
          backgroundColor: 'background.default',
        }}
      >
        <Button onClick={() => setOpen(false)}>閉じる</Button>
        <ImageMapTabMenu />
        <ItemNameSearchField />
      </Box>
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <ImageMapItemSelectorList
          setOpen={setOpen}
          textFieldPosition={textFieldPosition}
        />
      </Box>
    </Box>
  );
};
