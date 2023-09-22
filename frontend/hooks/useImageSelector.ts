import { ChangeEvent, FC, RefObject } from 'react';
import { useSetRecoilState } from 'recoil';

import { imageFileState } from '@/components/shares/atoms/state/imageFileState';
import { imagePreviewUrlState } from '@/components/shares/atoms/state/imagePreviewUrlState';
import { imageOriginalSizeState } from '@/components/shares/atoms/state/imageOriginalSizeState';

type UseImageSelectorProps = {
    imageRef: RefObject<HTMLImageElement>;
};

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
export const useImageSelector = ({ imageRef }: UseImageSelectorProps) => {
    const setImageFile = useSetRecoilState(imageFileState);
    const setImagePreviewUrl = useSetRecoilState(imagePreviewUrlState);
    const setImageOriginalSize = useSetRecoilState(imageOriginalSizeState);

    /**
     * 画像ファイルが選択されたときの処理。
     * この関数は、選択された画像ファイルとそのプレビューURLをRecoil Stateに保存します。
     * さらに、画像の表示サイズもRecoil Stateに保存します。
     *
     * @param {ChangeEvent<HTMLInputElement>} e - input type="file"からのイベントオブジェクト。
     */
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files ? e.target.files[0] : null;
        if (!selectedFile) return;

        const url = URL.createObjectURL(selectedFile);
        setImageFile(selectedFile);
        setImagePreviewUrl(url);

        // 新しいImageオブジェクトを作成し、画像の表示サイズを取得
        const img = new Image();
        img.onload = () => {
            imageRef.current?.addEventListener('load', () => {
                const displaySize = {
                    width: imageRef.current?.clientWidth || 0,
                    height: imageRef.current?.clientHeight || 0,
                };
                setImageOriginalSize(displaySize);
            });
            imageRef.current?.setAttribute('src', url);
        };
        img.src = url;


    }
    return { handleFileChange };
};