import React from 'react';

import { FormProvider } from '@/hooks/useFormMethods';

import { AddNewItemPageTemplate } from '@/components/templates/AddNewItemPageTemplate';
import { BaseItemDataForm } from '@/components/pages/addItemPage/BaseItemDataForm';
import { CategoryDetailList } from '@/components/pages/addItemPage/CategoryDetailList';
import { SubmitButton } from '@/components/shares/atoms/button/SubmitButton';
import { useAddNewItemForm } from '@/hooks/useAddNewItemForm';
import { ImageUploader } from '@/components/pages/addItemPage/ImageUploader';
import { ErrorAlert } from '@/components/shares/molecules/ErrorAlert';
import { AlertSeccess } from '@/components/shares/molecules/AlertSuccess';

/**
 * 新規に商品情報をバックエンドのDBに送信するページ
 * - 商品情報のバリデーションスキーマを取得するコンポーネント
 * @returns
 */
const AddNewItemPage = () => {
  const { formMethods, submitBothForms, detailFormMethods, loading } =
    useAddNewItemForm();

  return (
    <FormProvider formMethods={formMethods}>
      <AddNewItemPageTemplate>
        <form onSubmit={submitBothForms}>
          {/* 全商品共有の基本情報 */}
          <BaseItemDataForm />
          {/* カテゴリー毎の詳細情報 */}
          <CategoryDetailList detailFormMethods={detailFormMethods} />
          <ErrorAlert />
          <AlertSeccess />
          {/* 送信ボタン */}
          <SubmitButton loading={loading} text={'データ送信'} />
        </form>
      </AddNewItemPageTemplate>
    </FormProvider>
  );
};

export default AddNewItemPage;
