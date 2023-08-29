import React from 'react';

import { ValidationInputFields } from '@/components/shares/atoms/form/ValidationInputFields';
import { RegisterInputFormFieldsList } from '@/components/pages/userRegisterPage/RegisterInputFormFieldsList';

/**
 * ユーザー登録用のフォームコンポーネント
 *
 * @example
 * <RegisterForm/>
 */
const RegisterForm = () => {
  return (
    <ValidationInputFields
      inputFormFieldsList={RegisterInputFormFieldsList()}
    />
  );
};

export default RegisterForm;
