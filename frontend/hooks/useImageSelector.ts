import { ChangeEvent } from 'react';
import { useSetRecoilState } from 'recoil';

import { imageFileState } from '@/components/shares/atoms/state/imageFileState';
import { imagePreviewUrlState } from '@/components/shares/atoms/state/imagePreviewUrlState';

/**
 * 画像選択時の処理を管理するカスタムフック。
 * このフックは、画像ファイルの選択、プレビュー表示、およびその情報のRecoil Stateへの保存を行います。
 * 
 * @param {RefObject<HTMLImageElement>} imageRef - 画像のDOM要素への参照。
 * @returns {Object} handleFileChange - 画像ファイルが選択されたときに呼び出す関数。
 * 
 * @example
 * const { handleFileChange } = useImageSelector({ imageRef });
 */
export const useImageSelector = () => {
    const setImageFile = useSetRecoilState(imageFileState);
    const setImagePreviewUrl = useSetRecoilState(imagePreviewUrlState);

    /**
     * 画像ファイルが選択されたときの処理。
     * この関数は、選択された画像ファイルとそのプレビューURLをRecoil Stateに保存します。
     *
     * @param {ChangeEvent<HTMLInputElement>} e - input type="file"からのイベントオブジェクト。
     */
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files ? e.target.files[0] : null;
        if (!selectedFile) return;

        const url = URL.createObjectURL(selectedFile);
        setImageFile(selectedFile);
        setImagePreviewUrl(url);
    }
    return { handleFileChange };
};