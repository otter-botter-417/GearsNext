import { ValidatedTextField } from "@/components/atoms/form/ValidatedTextField";
import { UseFormReturn } from "react-hook-form";

interface ItemInformationFieldsProps {
  formMethods: UseFormReturn<any>;
  inputFormFieldsList: {
    name: string;
    label: string;
  }[];
}

export const ItemInformationFields: React.FC<ItemInformationFieldsProps> = ({
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
