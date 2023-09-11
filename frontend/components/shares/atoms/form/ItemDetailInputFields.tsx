import { ValidatedTextField } from "@/components/shares/atoms/form/ValidatedTextField";
import { UseFormReturn } from "react-hook-form";

interface ItemInformationFieldsProps {
  formMethods: UseFormReturn<any>;
  inputFormFieldsList: {
    name: string;
    label: string;
  }[];
}

export const ItemDetailInputFields: React.FC<ItemInformationFieldsProps> = ({
  formMethods,
  inputFormFieldsList,
}) => {
  return (
    <>
      {/* {inputFormFieldsList.map((field) => (
        <ValidatedTextField
          key={field.name}
          name={field.name}
          label={field.label}
          formMethods={formMethods}
        />
      ))} */}
    </>
  );
};
