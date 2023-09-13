import { Box } from '@mui/system';
import React, { FC, useState } from 'react';
import Image from 'next/legacy/image';
import { LAYOUT_IMAGE_BASE_URL } from '@/components/constants';
import { Button, Typography } from '@mui/material';
import useToggleState from '@/hooks/useToggleState';
import Link from 'next/link';

type LayoutImageOnTagImageMapProps = {
  layoutId: number;
  tagPositions: Array<{
    xPosition: number;
    yPosition: string;
    itemId: string;
    itemName: string;
  }>;
};
// TODO タグをホバーで商品の簡単な情報を表示する
export const LayoutImageOnTagImageMap: FC<LayoutImageOnTagImageMapProps> = ({
  layoutId,
  tagPositions,
}) => {
  const [isTagPosition, setIsTagPosition] = useState(false);

  const handleClick = () => {
    setIsTagPosition(!isTagPosition);
  };

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
      <Button
        onClick={() => handleClick()}
        variant="text"
        sx={{
          color: 'primary.main',
          borderColor: 'primary.main',
          border: 'none',
          p: 0,
        }}
      >
        {isTagPosition ? '返信を閉じる' : '返信を見る'}
      </Button>
      <Box
        sx={{
          position: 'relative', // 必要: 'fill'レイアウトを使うときに親要素に'relative'を設定
          width: '100%',
          paddingTop: '100%', // アスペクト比を保持
        }}
      >
        <Image
          src={`${LAYOUT_IMAGE_BASE_URL}${layoutId}.png`}
          alt={''}
          layout="fill"
          objectFit="contain"
          priority
          style={{ position: 'absolute', top: 0, left: 0 }} // 必要: 'fill'レイアウトを使うときに'absolute'を設定
        />

        {isTagPosition &&
          tagPositions.map((tag, index) => (
            <Box
              key={index}
              sx={{
                position: 'absolute',
                top: `${tag.yPosition}%`,
                left: `${tag.xPosition}%`,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: '2px',
                borderRadius: '10%',
              }}
            >
              <Link href={`/items/${tag.itemId}`} passHref>
                <Typography
                  key={tag.itemId}
                  variant="body2"
                  component="div"
                  color={'#c0c0c0'}
                >
                  {tag.itemName}
                </Typography>
              </Link>
            </Box>
          ))}
      </Box>
    </Box>
  );
};
