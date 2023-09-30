import React, { FC, createContext, useContext } from 'react';
import { UseFormReturn } from 'react-hook-form';

type FormMethodsType = any;

const FormContext = createContext<UseFormReturn<FormMethodsType> | null>(null);

type FormProviderProps = {
  children: React.ReactNode;
  formMethods: UseFormReturn<FormMethodsType>;
};

/**
 * FormProvider コンポーネント。
 * このプロバイダーを通して、子コンポーネントは useFormMethods フックを使って
 * formMethods の値にアクセスできます。
 *
 * @param children - 子コンポーネント
 * @param formMethods - react-hook-form から取得した formMethods
 */
export const FormProvider: FC<FormProviderProps> = ({
  children,
  formMethods,
}) => {
  return (
    <FormContext.Provider value={formMethods}>{children}</FormContext.Provider>
  );
};

/**
 * useFormMethods カスタムフック。
 * このフックを使うことで、FormProvider から提供される formMethods にアクセスできます。
 *
 * @throws エラー このフックは FormProvider の中でしか使用できません。
 * @returns 最も近い上位の FormProvider コンポーネントから提供される formMethods。
 */
export const useFormMethods = () => {
  const formMethodsContext = useContext(FormContext);
  if (!formMethodsContext) {
    throw new Error('useFormMethods は FormProvider の中でしか使用できません。');
  }
  return formMethodsContext;
};