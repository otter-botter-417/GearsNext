import { ItemInformationInputFields } from "@/components/atoms/form/ItemInformationInputFields";
import { TentDatas } from "@/components/atoms/itemAppend/itemDatas/TentDatas";
import { detailListsForTent } from "@/components/atoms/valueNameList/detailListsForTent";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

interface formMethodsProps {
  formMethods: UseFormReturn<any>;
}

const CategoryAssign: React.FC<formMethodsProps> = ({ formMethods }) => {
  const categoryName = formMethods.getValues("itemCategoryName");

  let detailList: { name: string; label: string }[];
  useEffect(() => {
    console.log(categoryName);
    if (categoryName == "テント") {
      detailList = detailListsForTent();
    }

    return () => {
      <ItemInformationInputFields
        formMethods={formMethods}
        inputFormFieldsList={detailList}
      />;
    };
  }, categoryName);

  return <></>;
};

export default CategoryAssign;
