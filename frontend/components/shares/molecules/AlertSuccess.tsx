import React, { FC } from 'react';
import { Alert, AlertTitle } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { successMessageState } from '../atoms/state/successMessageState';

export const AlertSeccess = () => {
  const successMessages = useRecoilValue(successMessageState);
  if (!successMessages) return null;
  return (
    <Alert severity="success">
      <AlertTitle>Seccess</AlertTitle>
      <strong>{successMessages}</strong>
    </Alert>
  );
};
