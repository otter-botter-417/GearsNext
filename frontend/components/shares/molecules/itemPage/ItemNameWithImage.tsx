import { FC } from 'react';
import { BrandName } from '../../../atoms/itemPage/BrandName';
import { ItemName } from '../../../atoms/itemPage/ItemName';
import { Box } from '@mui/material';
import Image from 'next/legacy/image';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import ItemImageUrl from '@/components/atoms/getItemImageUrl';
type itemNameAndBrandType = {
  itemName: string;
  brandName: string;
  imagePath: string;
  asin: string;
  matches: boolean;
};

//商品名　メーカー　画像を表示するコンポーネント
export const ItemNameWithImage: FC<itemNameAndBrandType> = (props) => {
  const { itemName, brandName, imagePath, asin, matches } = props;
  //ウィンドウサイズによってwidthの数値を変えてレスポンシブ処理
  const [width] = useWindowSize();
  let widthSize: number;
  //横画面時はウィンドウの50% 縦表示時は90%
  if (matches) {
    widthSize = width * 0.5;
  } else {
    widthSize = width * 0.9;
  }

  const ItemImagesUrl: string = ItemImageUrl(brandName, imagePath);

  return (
    <div style={{ width: '40%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
        }}
      >
        {/* 商品名　メーカー　を表示 */}
        <BrandName brandName={brandName} />
        <ItemName itemName={itemName} />
      </Box>
      {/* 商品画像とクリックでアマゾンへのリンク */}
      {/* レスポンシブ画像 */}

      <Image
        height={widthSize}
        width={widthSize}
        src={ItemImagesUrl}
        // https://gears-item-images.s3.ap-northeast-1.amazonaws.com/items/BUNDOK/solobase_ex.jpg
        alt=""
        priority
        objectFit="contain"
      />
    </div>
  );
};
