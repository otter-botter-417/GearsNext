import Link from 'next/link';
import Image from 'next/legacy/image';
import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

import { ItemDataTypes } from '@/components/types/ItemDataTypes';
import { getItemImageUrl } from '@/components/shares/atoms/getItemImageUrl';

type ItemThumbnailProps = {
  ItemData: ItemDataTypes;
};

// TODO アマゾンの価格を更新させる
/**
 * 商品のサムネイル画像と基本情報を表示する
 *
 * @param itemData 商品データ
 * @returns 商品のサムネイル
 */
export const ItemThumbnail: React.FC<ItemThumbnailProps> = ({ ItemData }) => {
  const ItemImagesUrl: string = getItemImageUrl(
    ItemData.brand_name,
    ItemData.image_name,
  );

  return (
    <Grid
      container
      spacing={3}
      minWidth={130}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={12} sm={12} md={12}>
        <Link href={`/items/${ItemData.item_id}`}>
          <Image
            src={ItemImagesUrl}
            alt="item image"
            layout="responsive"
            width={500}
            height={500}
            objectFit="contain"
            priority
          />
        </Link>
      </Grid>
      <Box display="flex" flexDirection="column" alignItems="center">
        {/* レスポンシブ画像 */}
        <Typography variant={'body2'}>{ItemData.brand_name}</Typography>
        <Typography variant={'h6'}>{ItemData.item_name}</Typography>
        <Typography variant={'h6'}>
          ¥{ItemData.price.toLocaleString()}
        </Typography>
      </Box>
    </Grid>
  );
};
