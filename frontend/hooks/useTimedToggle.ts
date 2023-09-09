import { useState, useEffect, useCallback } from 'react';

/**
 * 指定した時間後に状態を切り替えるカスタムフック
 * 
 * @returns 
 * @example
 * const [showTooltip, handleShowTooltip] = useTooltip();
 */
export const useTimedToggle = (duration = 2000) => {
  const [isActive, setIsActive] = useState(false);

  const activate = useCallback(() => {
    setIsActive(true);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive) {
      timer = setTimeout(() => {
        setIsActive(false);
      }, duration);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isActive, duration]);

  return [isActive, activate] as const;
};
