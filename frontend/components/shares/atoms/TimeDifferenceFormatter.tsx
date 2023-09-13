import { Typography } from '@mui/material';
import React, { FC } from 'react';

type TimeDifferenceFormatterProps = {
  time: string;
};

export const TimeDifferenceFormatter: FC<TimeDifferenceFormatterProps> = ({
  time,
}) => {
  const currentEpochTimeInSeconds = Math.floor(Date.now() / 1000);
  const inputDateObject = new Date(time);
  const inputEpochTimeInSeconds = Math.floor(inputDateObject.getTime() / 1000);
  const timeDifferenceInSeconds =
    currentEpochTimeInSeconds - inputEpochTimeInSeconds;

  const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);
  const timeDifferenceInHours = Math.floor(timeDifferenceInSeconds / 3600);
  const timeDifferenceInDays = Math.floor(timeDifferenceInSeconds / 86400);

  let formattedTimeDifference;

  if (timeDifferenceInSeconds < 60) {
    formattedTimeDifference = `${timeDifferenceInSeconds}秒前`;
  } else if (timeDifferenceInSeconds < 3600) {
    formattedTimeDifference = `${timeDifferenceInMinutes}分前`;
  } else if (timeDifferenceInSeconds < 86400) {
    formattedTimeDifference = `${timeDifferenceInHours}時間前`;
  } else {
    formattedTimeDifference = `${timeDifferenceInDays}日前`;
  }

  return (
    <Typography variant="caption" component="div">
      {formattedTimeDifference}
    </Typography>
  );
};
