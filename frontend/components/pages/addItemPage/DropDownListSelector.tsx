import { BrandNameList } from '@/components/shares/atoms/SelectNames/BrandNameList';
import { CategoryNameList } from '@/components/shares/atoms/SelectNames/CategoryNameList';

/**
 * 指定されたnameに対応するオプションリストを返します。
 *
 * @param name - プルダウンメニューの name 属性
 * @returns オプションのリスト
 */
export const getOptionList = (name: string): string[] => {
  if (name === 'brandName') {
    return BrandNameList;
  }

  if (name === 'itemCategoryName') {
    return CategoryNameList;
  }

  return [];
};
