import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";

import { Tags } from "../components/atoms/itemAppend/Tags";
import { DropdownSelector } from "../components/atoms/form/DropdownSelector";
import { CategoryNameList } from "../components/atoms/itemAppend/SelectNames/CategoryNameList";
import { brandNameList } from "../components/atoms/itemAppend/SelectNames/BrandNameList";
import { colorTagList } from "../components/atoms/itemAppend/SelectNames/ColorTagList";
import { ItemTagList } from "../components/atoms/itemAppend/SelectNames/ItemTagList";
import CategoryAssign from "@/components/molecules/itemAppend/CategoryAssign";

import { useItemForm } from "../hooks/useItemForm"; // mongoDBに商品データを送信するためのカスタムフック
import { ValidatedSchema } from "@/components/atoms/form/ValidatedSchema";
import { ItemInformationFields } from "@/components/atoms/form/ItemInformationFields";
import { SubmitButton } from "@/components/atoms/form/SubmitButton";

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
    },
    resolver: yupResolver(schema),
  });

  // バリデーションチェックを通ったdataをhandleFormSubmit関数でmongoDBに商品データを送信する
  const onSubmit = (data: any) => {
    handleFormSubmit(data);
  };

  return (
    <Box
      component="form"
      display="flex"
      justifyContent="center"
      // formMethods.handleSubmit() この関数でバリデーションチェックをする　通ればonSubmit関数に進む
    >
      {/* レスポンシブデザインを適応する */}
      <Grid container justifyContent="center" item xs={12} sm={6}>
        {/* 手入力の各種商品情報入力コンポーネント */}
        <ItemInformationFields formMethods={formMethods} />

        {/* SelectValuesに渡したリストを元に、プルダウンで選択できる */}
        <DropdownSelector
          name="Category"
          label="カテゴリー"
          formMethods={formMethods}
          optionsList={CategoryNameList}
        />
        <DropdownSelector
          name="brand"
          label="メーカー"
          formMethods={formMethods}
          optionsList={brandNameList}
        />

        {/* Tagコンポーネントに渡したリストを元に、タグを選択できる */}
        <Tags
          text={"タグ"}
          tagName={(formMethods.watch("itemTags") || []).filter(Boolean)} //
          setTagName={itemFormState.setItemTags}
          items={ItemTagList}
        />
        <Tags
          text={"カラー"}
          tagName={itemFormState.colorTags}
          setTagName={itemFormState.setColorTags}
          items={colorTagList}
        />

        {/* 選択されたカテゴリーによって詳細情報入力画面を切り替える処理 */}
        <CategoryAssign
          categoryValue={itemFormState.categoryValue}
          abilitys={itemFormState.details}
          setAbilitys={itemFormState.setAbilitys}
        />
        {/* 送信ボタン */}
        <SubmitButton
          loading={formMethods.watch("loading") || false}
          onSubmit={formMethods.handleSubmit(onSubmit)} //親のonSubmit処理を直接引き継ぐ為ここに押した時の処理を書く
          text={"データ送信"}
        />
      </Grid>
    </Box>
  );
};

export default AddNewItemPage;
