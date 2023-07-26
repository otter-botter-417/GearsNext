import { useFormContext } from "react-hook-form";
import { useItemApi } from "./useItemApi";

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
    };

    try {
      //ローディング状態に変更してmongoDBにデータ送信
      // setValue("loading", true);
      await postItemData(itemDatas);
      console.log(itemDatas);
      // setValue("loading", false);
    } catch (error) {
      //エラーがあればアラート
      alert(error);
    } finally {
      //送信が終わればローディング解除
      // setValue("loading", false);
    }
  };

  return {
    handleFormSubmit,
  };
};
