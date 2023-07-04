import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CategoryAssign from "@/components/molecules/itemAppend/CategoryAssign";

import { useItemForm } from "../hooks/useItemForm"; // mongoDBに商品データを送信するためのカスタムフック
import { ValidatedSchema } from "@/components/atoms/form/ValidatedSchema";
import { SubmitButton } from "@/components/atoms/form/SubmitButton";
import AddNewItemPageTemplate from "@/components/templates/AddNewItemPageTemplate";
import BaseItemDataForm from "@/components/organisms/BaseItemDataForm";

// 新規に商品情報をmongoDBに送信、登録するページ
const AddNewItemPage = () => {
  // カスタムフックを利用している
  // itemFormStateにフォームの入力情報、handleFormSubmitでmongoDBに商品データを送信する処理
  const { handleFormSubmit } = useItemForm();

  // バリデーションスキーマを取得するコンポーネント
  const schema = ValidatedSchema();

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
        {/* 選択されたカテゴリーによって詳細情報入力画面を切り替える処理 */}
        {/* <CategoryAssign
        categoryValue={itemFormState.categoryValue}
        abilitys={itemFormState.details}
        setAbilitys={itemFormState.setAbilitys}
      /> */}
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
