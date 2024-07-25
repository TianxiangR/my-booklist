import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

function useNavigateBack(defautRoute: string = '/') {
  const router = useRouter();

  const navigateBack = useCallback(() => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(defautRoute);
    }
  }, [defautRoute, router]);

  return navigateBack;
}

export default useNavigateBack;