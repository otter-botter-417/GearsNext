<<<<<<< HEAD
import { useFormContext } from "react-hook-form";
=======
import { useState, FormEvent as ReactFormEvent } from "react";
>>>>>>> main
import { useItemApi } from "../components/api/useItemApi";

// フォームの入力情報をmongoDBに送信するカスタムフック

// itemDatasとhandleFormSubmit関数が扱うイベントの型定義
interface ItemData {
  category: string;
  itemName: string;
  brandName: string;
  price: number;
  asin: string;
  imagePath: string;
  amazonUrl: string;
  colors: string[];
  tags: string[];
  itemAbility: any[];
<<<<<<< HEAD
  loading: boolean; // Add loading to the interface
}

export const useItemForm = () => {
  const { postItemData } = useItemApi(); //mongoDBにデータを送信するAPI
  // const { setValue } = useFormContext(); // useContext to get setValue from useForm

  const handleFormSubmit = async (formData: any) => {
    //フォームの入力情報をまとめる formDataから読み取るのはバリデーションが必要な要素
    const itemDatas = {
      category: formData.categoryValue,
      itemName: formData.itemName,
      brandName: formData.brandValue,
      price: parseInt(formData.price),
      asin: formData.asin,
      imagePath: formData.imagePath,
      amazonUrl: formData.amazonUrl,
      colors: formData.colorTags,
      tags: formData.itemTags,
      itemAbility: formData.details,
=======
}

export const useItemForm = () => {
  const [categoryValue, setCategoryValue] = useState<string>(""); // カテゴリー名
  const [brandValue, setBrandValue] = useState<string>(""); // ブランド名
  const [itemTags, setItemTags] = useState<string[]>([]); // 特徴のタグ
  const [colorTags, setColorTags] = useState<string[]>([]); // カラータグ
  const [abilitys, setAbilitys] = useState<any[]>([]); // カテゴリー毎の詳細な情報
  const [loading, setLoading] = useState<boolean>(false); // 送信中のグルグル

  const { postItemData } = useItemApi(); //mongoDBにデータを送信するAPI

  const handleFormSubmit = async (e: ReactFormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //フォームの入力情報をまとめる
    const itemDatas = {
      category: categoryValue,
      itemName: e.currentTarget.itemName.value,
      brandName: brandValue,
      price: parseInt(e.currentTarget.price.value),
      asin: e.currentTarget.asin.value,
      imagePath: e.currentTarget.imagePath.value,
      amazonUrl: e.currentTarget.amazonUrl.value,
      colors: colorTags,
      tags: itemTags,
      itemAbility: abilitys,
>>>>>>> main
    };

    try {
      //ローディング状態に変更してmongoDBにデータ送信
<<<<<<< HEAD
      // setValue("loading", true);
      await postItemData(itemDatas);
      console.log(itemDatas);
      // setValue("loading", false);
=======
      setLoading(true);
      await postItemData(itemDatas);
      setLoading(false);
>>>>>>> main
    } catch (error) {
      //エラーがあればアラート
      alert(error);
    } finally {
      //送信が終わればローディング解除
<<<<<<< HEAD
      // setValue("loading", false);
=======
      setLoading(false);
>>>>>>> main
    }
  };

  return {
<<<<<<< HEAD
=======
    itemFormState: {
      categoryValue,
      brandValue,
      itemTags,
      colorTags,
      abilitys,
      loading,
      setCategoryValue,
      setBrandValue,
      setItemTags,
      setColorTags,
      setAbilitys,
    },
>>>>>>> main
    handleFormSubmit,
  };
};
