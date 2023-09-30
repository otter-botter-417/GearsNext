import { FC, useEffect } from 'react';

import { useFormMethods } from '@/hooks/useFormMethods';

import { TextFieldWithValidation } from '../../shares/atoms/form/TextFieldWithValidation';
import { DETAIL_LISTS, DetailList } from '../../shares/atoms/detailLists';
import { useDetailFormMethods } from '@/hooks/useDetailFormMethods';
import { CategoryName } from '@/components/types/CategoryName';
import { DropdownSelector } from '@/components/shares/atoms/form/DropdownSelector';
import { SUB_CATEGORY_OPTIONS } from '@/components/types/SubCategoryOptions';

type Props = {
  detailFormMethods: ReturnType<typeof useDetailFormMethods>;
};
/**
 * フォームで選択されたカテゴリーに応じて、詳細情報の入力フォームを表示します。
 * @returns 詳細情報の入力フォーム
 */
export const CategoryDetailList: FC<Props> = ({ detailFormMethods }) => {
  const { watch } = useFormMethods();
  const categoryName: CategoryName = watch('itemCategoryName');
  const detailList: DetailList = DETAIL_LISTS[categoryName];

  // カテゴリーに応じた useForm() メソッドを取得
  const subCategoryOptions = SUB_CATEGORY_OPTIONS[categoryName] || [];

  return (
    <>
      {/* ドロップダウンセレクター */}
      <DropdownSelector
        name="itemSubCategoryName"
        label="サブカテゴリー"
        options={subCategoryOptions}
      />

      {/* カテゴリー毎の詳細情報 */}
      {detailList?.map((field) => (
        <TextFieldWithValidation
          key={field.name}
          name={field.name}
          label={field.label}
          formMethods={detailFormMethods}
        />
      ))}
    </>
  );
};
