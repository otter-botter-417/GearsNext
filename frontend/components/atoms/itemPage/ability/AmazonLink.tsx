import { FC } from "react";
import { Typography } from "@mui/material";
import { ItemDetailText } from "../text/ItemDetailText";
import Link from "next/link";

type priceType = {
  amazonUrl: string;
};

export const AmazonLink: FC<priceType> = (props) => {
  const { amazonUrl } = props;
  return (
    <div>
      <Link href={amazonUrl}>Amazon商品ページ</Link>
    </div>
  );
};
