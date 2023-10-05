import { ChangeEvent } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { imageFileState } from '@/components/shares/atoms/state/imageFileState';
import { imagePreviewUrlState } from '@/components/shares/atoms/state/imagePreviewUrlState';
import { imageOriginalSizeState } from '@/components/shares/atoms/state/imageOriginalSizeState';

/**
 * 画像選択時の処理を管理するカスタムフック。
 * このフックは、画像ファイルの選択、プレビュー表示、およびその情報のRecoil Stateへの保存を行います。
 * 画像のオリジナルサイズを取得するために、画像のDOM要素への参照を受け取ります。
 * 
 * @param {RefObject<HTMLImageElement>} imageRef - 画像のDOM要素への参照。
 * @returns {Object} handleFileChange - 画像ファイルが選択されたときに呼び出す関数。
 * 
 * @example
 * const { handleFileChange } = useImageSelector({ imageRef });
 */
export const useImageSelector = () => {
    const setImageOriginalSize = useSetRecoilState(imageOriginalSizeState);
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

        // 画像のオリジナルサイズを取得する
        const image = new Image();
        image.onload = () => {
            const imageSize = { width: image.width, height: image.height };
            if (image.height !== 0) {
                setImageOriginalSize(imageSize);
            }
        };
        image.src = url;
    }
    return { handleFileChange };
};