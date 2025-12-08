import { useEffect } from 'react';

export const useKeyPress = (keyCode, callback, disabled = false) => {
  const onPress = (key) => {
    if (!disabled) {
      if (key.key === keyCode) {
        key.preventDefault();
        callback();
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    document.addEventListener('keyup', onPress, { signal: controller.signal });

    return () => controller.abort();
  });
};
