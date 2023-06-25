import React, { FormEvent } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { TextField, Grid } from "@mui/material";
import { Box } from "@mui/system";

import { Tags } from "../components/atoms/itemAppend/Tags";
import { SelectValues } from "../components/atoms/form/SelectValues";
import { CategoryNameList } from "../components/atoms/itemAppend/SelectNames/CategoryNameList";
import { brandNameList } from "../components/atoms/itemAppend/SelectNames/BrandNameList";
import { colorTagList } from "../components/atoms/itemAppend/SelectNames/ColorTagList";
import { ItemTagList } from "../components/atoms/itemAppend/SelectNames/ItemTagList";
import CategoryAssign from "@/components/molecules/itemAppend/CategoryAssign";

import { useItemForm } from "../hooks/useItemForm"; // mongoDBに商品データを送信するためのカスタムフック

interface ItemFormState {
  categoryValue: string;
  brandValue: string;
  itemTags: string[];
  colorTags: string[];
  abilitys: unknown[];
  loading: boolean;
  setCategoryValue: (value: string) => void;
  setBrandValue: (value: string) => void;
  setItemTags: (tags: string[]) => void;
  setColorTags: (tags: string[]) => void;
  setAbilitys: (abilities: unknown[]) => void;
}

interface UseItemForm {
  itemFormState: ItemFormState;
  handleFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

// Yupでバリデーションスキーマを定義
const schema = yup.object().shape({
  itemName: yup.string().required("商品名は必須です。"),
  amazonUrl: yup
    .string()
    .url("有効なURLを入力してください。")
    .required("AmazonURLは必須です。"),
  asin: yup
    .string()
    .required("ASINは必須です。")
    .test("len", "ASINは正確に10桁である必要があります", (val) =>
      val ? val.length === 10 : false
    ),
  imagePath: yup.string().required("画像パスは必須です。"),
  price: yup
    .number()
    .positive("価格は正の数である必要があります。")
    .required("定価は必須です。"),
});

// 新規に商品情報をmongoDBに送信、登録するページ
const AddNewItemPage = () => {
  // カスタムフックを利用している
  // itemFormStateにフォームの入力情報、handleFormSubmitでmongoDBに商品データを送信する処理
  const { itemFormState, handleFormSubmit } = useItemForm();

  //   バリデーション用
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    handleFormSubmit(data);
  };

  return (
    <Box
      component="form"
      display="flex"
      justifyContent="center"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* レスポンシブデザインを適応する */}
      <Grid container justifyContent="center" item xs={12} sm={6} mt={4}>
        {/* 手入力の各種商品情報入力 */}
        <TextField
          {...register("itemName")}
          error={!!errors.itemName}
          helperText={errors.itemName?.message}
          id="itemName"
          label="商品名"
          fullWidth
        />
        <TextField
          {...register("amazonUrl")}
          error={!!errors.amazonUrl}
          helperText={errors.amazonUrl?.message}
          id="amazonUrl"
          label="AmazonURL"
          fullWidth
        />
        <TextField
          {...register("asin")}
          error={!!errors.asin}
          helperText={errors.asin?.message}
          id="asin"
          label="ASIN"
          fullWidth
        />
        <TextField
          {...register("imagePath")}
          error={!!errors.imagePath}
          helperText={errors.imagePath?.message}
          id="imagePath"
          label="imagePath"
          fullWidth
        />
        <TextField
          {...register("price")}
          error={!!errors.price}
          helperText={errors.price?.message}
          id="price"
          label="定価"
          fullWidth
        />

        {/* SelectValuesに渡したリストを元に、プルダウンで選択できる */}
        <SelectValues
          id="Category"
          label="カテゴリー"
          value={itemFormState.categoryValue}
          onChange={itemFormState.setCategoryValue}
          optionsList={CategoryNameList}
        />
        <SelectValues
          id="brand"
          label="メーカーを選択"
          value={itemFormState.brandValue}
          onChange={itemFormState.setBrandValue}
          optionsList={brandNameList}
        />

        {/* Tagコンポーネントに渡したリストを元に、タグを選択できる */}
        <Tags
          text={"タグ"}
          tagName={itemFormState.itemTags}
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
          abilitys={itemFormState.abilitys}
          setAbilitys={itemFormState.setAbilitys}
        />
        {/* 送信ボタン */}
        <LoadingButton
          type="submit"
          variant="outlined"
          loading={itemFormState.loading}
          sx={{ mt: 4 }}
        >
          データ送信
        </LoadingButton>
      </Grid>
    </Box>
  );
};

export default AddNewItemPage;
