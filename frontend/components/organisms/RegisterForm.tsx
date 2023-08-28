import React from 'react';

import { ValidationInputFields } from '../atoms/form/ValidationInputFields';
import { RegisterInputFormFieldsList } from '../atoms/valueNameList/RegisterInputFormFieldsList';

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
