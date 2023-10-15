import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { useApiRequest } from "./api/useApiRequest";
import { imageFileState } from "@/components/shares/atoms/state/imageFileState";
import { errorMessageState } from "@/components/shares/atoms/state/errorMessageState";
import { isAxiosError } from "axios";
import { successMessageState } from "@/components/shares/atoms/state/successMessageState";

export const useItemForm = () => {
  const { sendRequest } = useApiRequest();
  const [loading, setLoading] = useState(false);
  const imageFile = useRecoilValue(imageFileState);
  const setErrorMessage = useSetRecoilState(errorMessageState);
  const setSuccessMessages = useSetRecoilState(successMessageState);

  const submitNewItemToDatabase = async (baseFormData: any, detailFormData: any) => {
    //フォームの入力情報をまとめる formDataから読み取るのはバリデーションが必要な要素

    const formData = new FormData();

    if (imageFile) {
      formData.append('image', imageFile);
    }

    const itemData = {
      itemData: {
        baseData: {
          item_name: baseFormData.itemName,
          asin: baseFormData.asin,
          price: parseInt(baseFormData.price, 10),
          open_width: parseFloat(baseFormData.openWidth,),
          open_depth: parseFloat(baseFormData.openDepth,),
          open_height: parseFloat(baseFormData.openHeight,),
          storage_width: parseFloat(baseFormData.storageWidth,),
          storage_depth: parseFloat(baseFormData.storageDepth,),
          storage_height: parseFloat(baseFormData.storageHeight,),
          weight: parseFloat(baseFormData.weight,),
          brand_name: baseFormData.brandName,
          item_category_name: baseFormData.itemCategoryName,
          sub_category_name: baseFormData.itemSubCategoryName,
        },
        itemTags: baseFormData.itemTags,
        colorTags: baseFormData.colorTags,
        details: detailFormData,
      },
    };

    formData.append('itemData', JSON.stringify(itemData));

    try {
      //ローディング状態に変更してDBにデータ送信
      setLoading(true);
      setErrorMessage(null);
      setSuccessMessages(null);
      await sendRequest('post', 'items', formData);
      setSuccessMessages('登録に成功しました！');
    } catch (error) {
      if (isAxiosError(error)) {
        // 422エラーの際にエラーレスポンスをthrow
        if (error.response?.status === 422) {
          console.log(error.response)
          setErrorMessage(error.response.data.message);
          return;
        }
      }
    } finally {
      //送信が終わればローディング解除
      setLoading(false);
    }
  };

  return {
    submitNewItemToDatabase,
    loading,
  };
};
