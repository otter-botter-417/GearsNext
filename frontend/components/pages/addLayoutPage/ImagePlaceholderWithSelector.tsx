import React, { FC } from 'react';

import { ImageSelector } from './ImageSelector';

/**
 * このコンポーネントは、画像が選択されていない場合に、
 * 外枠と画像選択コンポーネントを中央に表示します。
 *
 * @returns {JSX.Element} 外枠と画像選択コンポーネントを含むReact要素
 *
 * @example
 * <ImagePlaceholderWithSelector />
 */
export const ImagePlaceholderWithSelector: FC = () => {
  return (
    // 外枠のスタイル
    <div
      style={{
        border: '2px dashed #ccc',
        width: '100%',
        paddingTop: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ccc',
      }}
    >
      {/* 画像選択コンポーネントを中央に表示する為のスタイル */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ImageSelector />
      </div>
    </div>
  );
};
