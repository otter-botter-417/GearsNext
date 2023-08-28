import { ValidatedTextField } from '@/components/atoms/form/ValidatedTextField';

interface ValidationInputFieldsProps {
  inputFormFieldsList: {
    name: string;
    label: string;
  }[];
}

/**
 * バリデーションを行うテキストフィールドに、フィールド名とラベルを渡す
 *
 * @param props.inputFormFieldsList - フォームの手入力の項目のリスト { name: '', label: '' }
 *
 * @example
 * <ItemInformationInputFields
 * inputFormFieldsList={RegisterInputFormFieldsList()}
 * />
 */
export const ValidationInputFields: React.FC<ValidationInputFieldsProps> = ({
  inputFormFieldsList,
}) => {
  return (
    <>
      {inputFormFieldsList.map((field) => (
        <ValidatedTextField
          key={field.name}
          name={field.name}
          label={field.label}
        />
      ))}
    </>
  );
};
