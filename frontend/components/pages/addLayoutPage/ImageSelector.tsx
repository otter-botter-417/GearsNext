import React, { FC, useRef } from 'react';
import { Button } from '@mui/material';
import { useImageSelector } from '@/hooks/useImageSelector';

/**
 * このコンポーネントは、画像を選択するためのボタンと、選択した画像を表示するエリアを提供します。
 * ユーザーが「画像を選択」ボタンをクリックすると、ファイル選択ダイアログが表示されます。
 * 画像が選択されると、その画像が表示されます。
 *
 * @returns {JSX.Element} 「画像を選択」ボタンと画像表示エリアを含むReact要素。
 */
export const ImageSelector: FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { handleFileChange } = useImageSelector();

  return (
    <div>
      <input
        accept="image/*"
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <Button
        onClick={() => fileInputRef.current?.click()}
        variant="contained"
        style={{
          padding: '10px 20px',
          fontSize: '20px',
        }}
      >
        画像を選択
      </Button>
    </div>
  );
};
