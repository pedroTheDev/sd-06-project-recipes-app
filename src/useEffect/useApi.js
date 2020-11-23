import { useEffect } from 'react';

export default useApi = (callback) => {
  useEffect(() => {
    callback();
  }, [callback]);
};
