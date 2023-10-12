import React from 'react';
import { Alert, AlertTitle, Grid } from '@mui/material';

import { AddLayoutPageSubmitButton } from './AddLayoutPageSubmitButton';
import { ReSelectImageButton } from './ReSelectImageButton';
import { ErrorAlert } from '@/components/shares/molecules/ErrorAlert';

/**
 * このコンポーネントは、レイアウト投稿ページの上部に配置される主要なUIを提供します。
 * - 画像の再選択: ユーザーがレイアウトに使用する画像を再選択できます。
 * - レイアウトの投稿ボタン: ユーザーがレイアウトを投稿できます。
 *
 * @returns {JSX.Element}
 */
export const AddLayoutPageTopOrganism = () => {
  return (
    <Grid container>
      <ErrorAlert />
      <Grid item xs={8} container justifyContent="center">
        <ReSelectImageButton />
      </Grid>

      <Grid item xs={4} container justifyContent="end">
        <AddLayoutPageSubmitButton />
      </Grid>
    </Grid>
  );
};
