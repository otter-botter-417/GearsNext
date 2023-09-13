import { Box } from '@mui/system';
import React, { FC } from 'react';
import Image from 'next/legacy/image';
import { LAYOUT_IMAGE_BASE_URL } from '@/components/constants';
import Link from 'next/link';
import { TimeDifferenceFormatter } from './TimeDifferenceFormatter';

type LayoutTextProps = {
  text: string;
  userName: string;
  userId: number;
  createdAt: string;
};

export const LayoutText: FC<LayoutTextProps> = ({
  text,
  userName,
  userId,
  createdAt,
}) => {

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
      }}
    >
      <Link href={`/users/${userId}`}>{userName}</Link>
      <h4>{text}</h4>
    </Box>
  );
};
