import { ValidatedTextField } from "@/components/atoms/form/ValidatedTextFieldForSizes";
import { UseFormReturn } from "react-hook-form";

interface ItemSizeInputFieldsProps {
  formMethods: UseFormReturn<any>;
  inputFormFieldsList: {
    name: string;
    label: string;
  }[];
}

export const ItemSizeInputFields: React.FC<ItemSizeInputFieldsProps> = ({
  formMethods,
  inputFormFieldsList,
}) => {
  return (
    <>
      {inputFormFieldsList.map((field) => (
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
