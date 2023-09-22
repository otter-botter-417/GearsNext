import React from 'react';
import { ImageUploaderAndMapEditor } from './ImageUploaderAndMapEditor';

/**
 * このコンポーネントは、レイアウト投稿ページの左側に配置される主要なUIを提供します。
 * - 画像のアップロード: ユーザーが画像をアップロードできます。
 * - イメージマップの座標設定: アップロードした画像上で座標を設定するUIが提供されます。
 *
 * 主な役割は、ImageUploaderAndMapEditor コンポーネントをラップすることです。
 *
 * @returns {JSX.Element}
 */
export const AddLayoutPageLeftOrganism = () => {
  return (
    <>
      <ImageUploaderAndMapEditor />
    </>
  );
};
