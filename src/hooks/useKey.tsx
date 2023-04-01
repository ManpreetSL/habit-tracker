import { useEffect } from 'react';

const useKey = (key: string, callback: (event: Event) => void) => {
  useEffect(() => {
    window.addEventListener('keydown', callback);

    return () => {
      window.removeEventListener('keydown', callback);
    };
  }, [callback]);
};

export default useKey;
