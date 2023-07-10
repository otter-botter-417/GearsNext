import React from "react";
import { ItemInformationFields } from "@/components/atoms/form/ItemInformationFields";
import { UseFormReturn } from "react-hook-form";
import { DropdownSelectors } from "../molecules/DropdownSelectors";
import { TagSelectors } from "../molecules/TagSelectors";
import { NewItemInputFormFieldsList } from "@/components/atoms/valueNameList/NewItemInputFormFieldsList";

interface ItemInformationFieldsProps {
  formMethods: UseFormReturn<any>;
}
const BaseItemDataForm: React.FC<ItemInformationFieldsProps> = ({
  formMethods,
}) => {
  return (
    <>
      {/* 手入力の各種商品情報入力コンポーネント */}
      <ItemInformationFields
        formMethods={formMethods}
        inputFormFieldsList={NewItemInputFormFieldsList()}
      />
      <DropdownSelectors formMethods={formMethods} />
      <TagSelectors formMethods={formMethods} />
      {/* <Tags
        name="itemTags"
        text={"タグ"}
        formMethods={formMethods}
        items={ItemTagList}
      />
      <Tags
        name="colorTags"
        text={"カラー"}
        formMethods={formMethods}
        items={ColorTagList}
      /> */}
    </>
  );
};

export default BaseItemDataForm;
