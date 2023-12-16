import { useState, useMemo } from 'react';

import { UserProfilePageContentType } from '@/components/types/UserProfilePageContentType';

type UseSortedItemsReturnType = {
    sortedItems: UserProfilePageContentType[];
    sortAscending: boolean;
    handleSwitchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

/**
 * ユーザープロフィールページのコンテンツを登録日でソートするカスタムフック
 * 
 * このフックは、指定されたアイテムの配列を登録日に基づいてソートし、
 * ソート順をトグルする機能を提供します。ソートは昇順または降順で行われ、
 * その状態は内部で管理されます。
 * 
 * @param items  
 * @returns sortedItems, sortAscending, handleSwitchChange
 */
export const useSortedItems = (items: UserProfilePageContentType[]): UseSortedItemsReturnType => {
    const [sortAscending, setSortAscending] = useState(true);

    // スイッチの状態変更時にソート順を切り替えるハンドラー
    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSortAscending(event.target.checked);
    };

    // ソートされたアイテムのリストをメモ化
    const sortedItems = useMemo(() => {
        const sorted = [...items].sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return sortAscending
                ? dateA.getTime() - dateB.getTime() // 昇順でソート
                : dateB.getTime() - dateA.getTime(); // 降順でソート
        });
        return sorted;
    }, [items, sortAscending]);

    return { sortedItems, sortAscending, handleSwitchChange };
};