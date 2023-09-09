
/**
 * レンダリングされたときに背景色を一瞬変更するカスタムフック
 * レンダリングの最適化のために利用する
 */
import { useEffect, useState } from 'react';

export const useFlashBackgroundOnRender = () => {
    const [backgroundColor, setBackgroundColor] = useState('white');
    const [renderCount, setRenderCount] = useState(0);

    useEffect(() => {
        if (renderCount > 0) {
            setBackgroundColor('yellow');
            const timer = setTimeout(() => {
                setBackgroundColor('white');
            }, 500);
            return () => clearTimeout(timer);
        }
        setRenderCount(prevCount => prevCount + 1);
    }, [renderCount]);

    return backgroundColor;
};
