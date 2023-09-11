import { FC } from 'react';
import Link from 'next/link';

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
