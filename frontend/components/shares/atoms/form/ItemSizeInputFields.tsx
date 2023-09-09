import { ValidatedTextField } from "@/components/shares/atoms/form/ValidatedTextFieldForSizes";
import { Grid } from "@mui/material";
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
    <Grid item xs={10}>
      {inputFormFieldsList.map((field) => (
        <ValidatedTextField
          key={field.name}
          name={field.name}
          label={field.label}
          formMethods={formMethods}
        />
      ))}
    </Grid>
  );
};
