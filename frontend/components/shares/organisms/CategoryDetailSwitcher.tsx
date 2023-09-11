import { TentDetails } from '../../pages/ItemPage/TentDetails';
import { FC } from 'react';
type CategoryDetailSwitcherProps = {
  categoryName: string;
  itemAttributes: any;
};

/**
 * カテゴリー名によって表示するコンポーネントを切り替える
 * @param categoryName
 * @example
 * <CategoryDetailSwitcher categoryName={categoryName} />
 */
export const CategoryDetailSwitcher: FC<CategoryDetailSwitcherProps> = ({
  categoryName,
  itemAttributes,
}) => {
  if (categoryName === 'テント') {
    return <TentDetails itemAttributes={itemAttributes} />;
  }
  return null;

  //　TODO　テント以外も実装する
  // else if (categoryName === 'タープ') {
  //   return <TarpDetails />;
  // } else if (categoryName === 'シュラフ') {
  //   return <SleepingBagDetails />;
  // }
};
