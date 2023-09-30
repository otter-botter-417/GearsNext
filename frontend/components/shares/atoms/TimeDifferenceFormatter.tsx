import React, { FC } from 'react';
import { Typography } from '@mui/material';

type TimeDifferenceFormatterProps = {
  time: string;
  variant?: string;
};

// 1分、1時間、1日の秒数
const ONE_MINUTE_IN_SECONDS = 60;
const ONE_HOUR_IN_SECONDS = 3600;
const ONE_DAY_IN_SECONDS = 86400;

/**
 * 指定された時間と現在時間との差を「〜秒前」「〜分前」「〜時間前」「〜日前」の形式で表示するコンポーネント
 *
 * @param time - 指定された時間（ISO形式の文字列）
 * @returns {JSX.Element} フォーマットされた時間差
 */
export const TimeDifferenceFormatter: FC<TimeDifferenceFormatterProps> = ({
  time,
  variant = 'body1',
}) => {
  // 現在のエポック時間（秒）
  const currentEpochTimeInSeconds = Math.floor(Date.now() / 1000);
  // 入力された日付のエポック時間（秒）
  const inputEpochTimeInSeconds = Math.floor(new Date(time).getTime() / 1000);
  // 時間差（秒）
  const timeDifferenceInSeconds =
    currentEpochTimeInSeconds - inputEpochTimeInSeconds;

  // 時間差を適切な単位でフォーマット
  let formattedTimeDifference;

  if (timeDifferenceInSeconds < ONE_MINUTE_IN_SECONDS) {
    formattedTimeDifference = `${timeDifferenceInSeconds}秒前`;
  } else if (timeDifferenceInSeconds < ONE_HOUR_IN_SECONDS) {
    formattedTimeDifference = `${Math.floor(
      timeDifferenceInSeconds / ONE_MINUTE_IN_SECONDS,
    )}分前`;
  } else if (timeDifferenceInSeconds < ONE_DAY_IN_SECONDS) {
    formattedTimeDifference = `${Math.floor(
      timeDifferenceInSeconds / ONE_HOUR_IN_SECONDS,
    )}時間前`;
  } else {
    formattedTimeDifference = `${Math.floor(
      timeDifferenceInSeconds / ONE_DAY_IN_SECONDS,
    )}日前`;
  }

  return (
    <Typography
      variant={variant as 'body1' | 'body2' | 'caption'}
      component="div"
    >
      {formattedTimeDifference}
    </Typography>
  );
};
