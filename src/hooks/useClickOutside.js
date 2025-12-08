import { useEffect, useCallback } from 'react';

export const useClickOutside = (ref, callback) => {
  const handleClick = useCallback(
    (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    },
    [ref, callback]
  );

  useEffect(() => {
    const controller = new AbortController();
    document.addEventListener('click', handleClick, { signal: controller.signal });

    return () => controller.abort();
  }, [handleClick]);
};
