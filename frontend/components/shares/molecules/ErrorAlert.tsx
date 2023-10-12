import React, { FC } from 'react';
import { Alert, AlertTitle } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { errorMessageState } from '../atoms/state/errorMessageState';

export const ErrorAlert = () => {
  const errorMessages = useRecoilValue(errorMessageState);
  if (!errorMessages) return null;
  return (
    <Alert severity="error">
      <AlertTitle>エラー</AlertTitle>
      <strong>{errorMessages}</strong>
    </Alert>
  );
};
