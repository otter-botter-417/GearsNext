import { ValidatedTextField } from "@/components/atoms/form/ValidatedTextField";
import { UseFormReturn } from "react-hook-form";
import { FormNamesList } from "./FormNamesList";

interface ItemInformationFieldsProps {
  formMethods: UseFormReturn<any>;
}

export const ItemInformationFields: React.FC<ItemInformationFieldsProps> = ({
  formMethods,
}) => {
  // 入力フォームのリスト　要素の編集はFormNamesListを編集する
  const formFields = FormNamesList();

  return (
    <>
      {formFields.map((field) => (
        <ValidatedTextField
          key={field.name}
          name={field.name}
          label={field.label}
          formMethods={formMethods}
        />
      ))}
    </>
  );
};
