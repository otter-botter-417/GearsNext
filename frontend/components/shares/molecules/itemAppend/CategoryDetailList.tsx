import { ItemInformationInputFields } from '@/components/atoms/form/ValidationInputFields';
import { detailListsForChair } from '@/components/atoms/valueNameList/detailListsForChair';
import { detailListsForLantern } from '@/components/atoms/valueNameList/detailListsForLantern';
import { detailListsForTable } from '@/components/atoms/valueNameList/detailListsForTable';
import { detailListsForTarp } from '@/components/atoms/valueNameList/detailListsForTarp';
import { detailListsForTent } from '@/components/atoms/valueNameList/detailListsForTent';
import { UseFormReturn, useForm } from 'react-hook-form';

interface formMethodsProps {
  formMethods: UseFormReturn<any>;
  detailFormMethods: UseFormReturn<any>;
}

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
