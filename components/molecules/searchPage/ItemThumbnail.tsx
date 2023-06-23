import { useRouter } from "next/router";
import Link from "next/link";
import { Box } from "@mui/material";
import { ItemDataTypes } from "../../types/ItemDataTypes";
import Image from "next/legacy/image";
import { useWindowSize } from "../../../hooks/useWindowSize";
import Typography from "@mui/material/Typography";

type ItemThumbnailProps = {
  ItemData: ItemDataTypes;
};
//商品名　メーカー　画像を表示するコンポーネント
export const ItemThumbnail = (props: ItemThumbnailProps) => {
  //ウィンドウサイズによってwidthの数値を変えてレスポンシブ処理
  const { ItemData } = props;
  const [width] = useWindowSize();
  let widthSize: number;
  //横画面時はウィンドウの50% 縦表示時は90%
  const router = useRouter();
  const itemUrl: string = `items/${ItemData._id}`;
  const { itemId } = router.query;

  widthSize = width * 0.22;

  return (
    <>
      {/* 商品名　メーカー　を表示 */}
      <Link href={`/items/${ItemData._id}`}>
        <Image
          src={`/images/items/${ItemData.brandName}/${ItemData.imagePath}`}
          alt="example image"
          layout="responsive"
          width={widthSize}
          height={widthSize}
          objectFit="contain"
          priority
        />
      </Link>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          maxWidth: widthSize,
        }}
      >
        {/* レスポンシブ画像 */}
        <Typography variant={"body2"}>{ItemData.brandName}</Typography>

        <Typography variant={"h6"}>{ItemData.itemName}</Typography>
        <Typography variant={"body2"}>メーカー希望小売価格</Typography>
        <Typography variant={"h6"}> ¥{ItemData.price}</Typography>
      </Box>
    </>
  );
};
