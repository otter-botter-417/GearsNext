import { useForm, SubmitHandler } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { useItemForm } from '../hooks/useItemFormToLaravel';
import { useDetailFormMethods } from '@/hooks/useDetailFormMethods';

import { AddNewItemValidatedSchema } from '@/components/shares/atoms/schema/AddNewItemValidatedSchema';
import { AddNewItemFormFields, UseFormMethodsForAddNewItem } from '@/components/types/FormMethodsForAddNewItemType';

/**
 * 新規アイテム追加ページのためのカスタムフック
 * 
 * このフックは新規アイテム追加ページにおけるフォームのロジックを管理します。
 * useForm, useDetailFormMethods, および useItemForm カスタムフックを内部で使用しています。
 * 
 * - useItemFormからDBへの送信ロジックを取得
 * - useFormで基本的なフォームメソッドとバリデーションを設定
 * - useDetailFormMethodsでカテゴリーに応じた詳細フォームのメソッドを設定
 * - onSubmitでバリデーションが通った後の送信処理を定義
 *
 * @returns formMethods - 基本的なフォームメソッド
 * @returns wrappedOnSubmit - サブミット時のラッピング関数
 * @returns detailFormMethods - 詳細フォームメソッド
 */
export const useAddNewItemForm = () => {
    // 商品データをDBに送信するためのカスタムフックからメソッドを取得
    const { submitNewItemToDatabase, loading } = useItemForm();

    // useFormを用いて基本的なフォームメソッドを設定
    const formMethods: UseFormMethodsForAddNewItem = useForm<AddNewItemFormFields>({
        defaultValues: {
            itemTags: [],
            colorTags: [],
        },
        resolver: yupResolver(AddNewItemValidatedSchema) as any,
    }); //TODO anyの型を修正する

    // カテゴリーに応じた詳細フォームメソッドを設定
    const detailFormMethods = useDetailFormMethods(formMethods);

    /**
    * onSubmit - フォームのサブミット時に呼ばれる関数
    * この関数は、基本フォームと詳細フォームのデータを取得し、
    * submitNewItemToDatabase関数を通じてバックエンドに送信します。
    */
    const handleBothFormsSubmit: SubmitHandler<AddNewItemFormFields> = async () => {
        const baseFormData = formMethods.getValues();
        const detailFormData = detailFormMethods.getValues();
        try {
            await submitNewItemToDatabase(baseFormData, detailFormData);
            console.log('Data submitted successfully');
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    /**
     * handleSubmitForm関数をラップして、基本フォームと詳細フォームの送信処理を一元化する関数
     * この関数は、formMethods.handleSubmitとdetailFormMethods.handleSubmitを内部で呼び出しています。
     */
    const submitBothForms = formMethods.handleSubmit(() => {
        detailFormMethods.handleSubmit(handleBothFormsSubmit)();
    });

    return { formMethods, submitBothForms, detailFormMethods, loading };
};
