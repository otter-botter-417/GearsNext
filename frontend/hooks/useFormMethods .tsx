import React, { createContext, useContext } from 'react';
import { UseFormReturn } from 'react-hook-form';

// この部分は適当に型を設定しています。実際には適切な型を設定してください。
type FormMethodsType = any;

const FormMethodsContext = createContext<UseFormReturn<FormMethodsType> | null>(
  null,
);

interface FormMethodsProviderProps {
  children: React.ReactNode;
  formMethods: UseFormReturn<FormMethodsType>;
}

export const FormMethodsProvider: React.FC<FormMethodsProviderProps> = ({
  children,
  formMethods,
}) => {
  return (
    <FormMethodsContext.Provider value={formMethods}>
      {children}
    </FormMethodsContext.Provider>
  );
};

export const useFormMethods = () => {
  const context = useContext(FormMethodsContext);
  if (!context) {
    throw new Error('useFormMethods must be used within a FormMethodsProvider');
  }
  return context;
};
