import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CategoryAssign from "@/components/molecules/itemAppend/CategoryAssign";

import { useItemForm } from "../hooks/useItemFormToLaravel"; // mongoDBに商品データを送信するためのカスタムフック
import { AddNewItemValidatedSchema } from "@/components/atoms/schema/AddNewItemValidatedSchema";
import { SubmitButton } from "@/components/atoms/form/SubmitButton";
import AddNewItemPageTemplate from "@/components/templates/AddNewItemPageTemplate";
import BaseItemDataForm from "@/components/organisms/BaseItemDataForm";

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
      itemCategoryName: "テント",
      brandName: "ogawa",
    },
    resolver: yupResolver(schema),
  });

  // バリデーションチェックを通ったdataをhandleFormSubmit関数でmongoDBに商品データを送信する
  const onSubmit = async (data: any, event: any) => {
    console.log("onSubmit function is called"); // 追加: コンソールにログを出力
    event.preventDefault();
    try {
      await handleFormSubmit(data);
      console.log("Data submitted successfully");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <AddNewItemPageTemplate>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <BaseItemDataForm formMethods={formMethods} />
        <CategoryAssign formMethods={formMethods} />
        {/* 送信ボタン */}
        <SubmitButton
          loading={formMethods.watch("loading") || false}
          text={"データ送信"}
        />
      </form>
    </AddNewItemPageTemplate>
  );
};

export default AddNewItemPage;
