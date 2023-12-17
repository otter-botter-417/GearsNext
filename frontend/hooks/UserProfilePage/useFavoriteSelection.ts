
import { useState } from "react";
import { useRecoilValue } from "recoil";

import { ContentType } from "@/components/types/ContentType";
import { UserProfilePageContentType } from "@/components/types/UserProfilePageContentType";
import { userFavoriteItemListState } from "@/components/shares/atoms/state/userFavoriteItemListState";
import { userFavoriteLayoutListState } from "@/components/shares/atoms/state/userFavoriteLayoutListState";
import { useFetchUserFavoriteItem } from "../api/useFetchUserFavoriteItem";
import { useFetchUserFavoriteLayout } from "../api/useFetchUserFavoriteLayout";


type FavoriteSelection = {
    selectedOption: string;
    setSelectedOption: (value: string) => void;
    items: UserProfilePageContentType[];
    type: ContentType;
};

/**
 * useFavoriteSelection フックは、ユーザーの「いいね」セクションにおける選択肢（ギアまたはレイアウト）を管理します。
 * 選択されたオプションに基づいて、対応するアイテムリストとタイプを取得します。
 * Recoil ステートからユーザーのお気に入りアイテムリストまたはレイアウトリストを取得し、
 * 選択されたタイプに応じて、表示すべきリストを決定します。
 *
 * @returns {FavoriteSelection} 選択肢の状態、設定関数、アイテムリスト、およびアイテムのタイプ
 *   - selectedOption: 現在選択されているオプション（'ギア' または 'レイアウト'）
 *   - setSelectedOption: 選択オプションを更新するための関数
 *   - items: 表示するアイテムのリスト
 *   - type: アイテムのタイプ（'item' または 'layout'）
 */
const useFavoriteSelection = (): FavoriteSelection => {
    const [selectedOption, setSelectedOption] = useState('ギア');
    const items = selectedOption === 'ギア'
        ? useRecoilValue(userFavoriteItemListState)
        : useRecoilValue(userFavoriteLayoutListState);
    const type: ContentType = selectedOption === 'ギア' ? "item" as ContentType : "layout" as ContentType;

    return {
        selectedOption,
        setSelectedOption,
        items,
        type,
    };
};

export default useFavoriteSelection;
