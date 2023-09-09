import { TentDetails } from '../../pages/ItemPage/TentDetails';
import { FC } from 'react';
type CategoryDetailSwitcherProps = {
  categoryName: string;
};

/**
 * カテゴリー名によって表示するコンポーネントを切り替える
 * @param categoryName
 * @example
 * <CategoryDetailSwitcher categoryName={categoryName} />
 */
export const CategoryDetailSwitcher: FC<CategoryDetailSwitcherProps> = ({
  categoryName,
}) => {
  if (categoryName === 'テント') {
    return <TentDetails />;
  } else if (categoryName === 'タープ') {
    return <TarpDetails />;
  } else if (categoryName === 'シュラフ') {
    return <SleepingBagDetails />;
  }
};
