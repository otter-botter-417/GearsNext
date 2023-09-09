import { ItemInformationInputFields } from '@/components/shares/atoms/form/ValidationInputFields';
import { detailListsForChair } from '@/components/shares/atoms/valueNameList/detailListsForChair';
import { detailListsForLantern } from '@/components/shares/atoms/valueNameList/detailListsForLantern';
import { detailListsForTable } from '@/components/shares/atoms/valueNameList/detailListsForTable';
import { detailListsForTarp } from '@/components/shares/atoms/valueNameList/detailListsForTarp';
import { UseFormReturn } from 'react-hook-form';
import { detailListsForTent } from '../atoms/valueNameList/detailListsForTent';

interface formMethodsProps {
  formMethods: UseFormReturn<any>;
  detailFormMethods: UseFormReturn<any>;
}

/**
 * カテゴリーに応じた詳細情報を表示する
 * 商品登録ページで使用
 * 対応したカテゴリーの必要な入力欄を表示する
 * @param param0
 * @returns
 */
const CategoryDetailList: React.FC<formMethodsProps> = ({
  formMethods,
  detailFormMethods,
}) => {
  const { watch } = formMethods;
  const categoryName = watch('itemCategoryName');
  console.log(detailFormMethods.watch('capacity'));

  let detailList: { name: string; label: string }[] = [];
  if (categoryName == 'テント') {
    detailList = detailListsForTent();
    //テント以外は未作成
  } else if (categoryName == 'タープ') {
    detailList = detailListsForTarp();
  } else if (categoryName == 'チェア') {
    detailList = detailListsForChair();
  } else if (categoryName == 'テーブル') {
    detailList = detailListsForTable();
  } else if (categoryName == 'ランタン') {
    detailList = detailListsForLantern();
  }

  return (
    <>
      <ItemInformationInputFields
        formMethods={detailFormMethods}
        inputFormFieldsList={detailList}
      />
    </>
  );
};

export default CategoryDetailList;
