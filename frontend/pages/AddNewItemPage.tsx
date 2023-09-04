import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useItemForm } from '../hooks/useItemFormToLaravel'; // mongoDBに商品データを送信するためのカスタムフック
import { AddNewItemValidatedSchema } from '@/components/atoms/schema/AddNewItemValidatedSchema';
import { SubmitButton } from '@/components/shares/atoms/SubmitButton';
import AddNewItemPageTemplate from '@/components/templates/AddNewItemPageTemplate';
import BaseItemDataForm from '@/components/shares/organisms/BaseItemDataForm';
import CategoryDetailList from '@/components/shares/molecules/itemAppend/CategoryDetailList';
import { useDetailFormMethods } from '@/hooks/useDetailFormMethods';

// 新規に商品情報をmongoDBに送信、登録するページ
const AddNewItemPage = () => {
  // カスタムフックを利用している
  // itemFormStateにフォームの入力情報、handleFormSubmitでmongoDBに商品データを送信する処理
  const { handleFormSubmit } = useItemForm();

  // バリデーションスキーマを取得するコンポーネント
  const schema = AddNewItemValidatedSchema();

  // textfieldにバリデーションを渡すため
  const formMethods = useForm({
    defaultValues: {
      loading: false,
      itemCategoryName: 'テント',
      itemTags: [],
      colorTags: [],
      brandName: 'ogawa',
    },
    resolver: yupResolver(schema),
  });

  const detailFormMethods = useDetailFormMethods(formMethods);

  // バリデーションチェックを通ったdataをhandleFormSubmit関数でmongoDBに商品データを送信する
  const onSubmit = async (data: any) => {
    console.log('onSubmit function is called');

    // 両方のフォームメソッドのデータを取得
    const baseFormData = formMethods.getValues();
    const detailFormData = detailFormMethods.getValues();

    try {
      await handleFormSubmit(baseFormData, detailFormData);
      console.log('Data submitted successfully');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const wrappedOnSubmit = (data: any) => {
    console.log('1');
    detailFormMethods.handleSubmit(onSubmit)(data);
  };

  return (
    <AddNewItemPageTemplate>
      <form onSubmit={formMethods.handleSubmit(wrappedOnSubmit)}>
        <BaseItemDataForm formMethods={formMethods} />
        <CategoryDetailList
          formMethods={formMethods}
          detailFormMethods={detailFormMethods}
        />
        {/* 送信ボタン */}
        <SubmitButton
          loading={formMethods.watch('loading') || false}
          text={'データ送信'}
        />
      </form>
    </AddNewItemPageTemplate>
  );
};

export default AddNewItemPage;
