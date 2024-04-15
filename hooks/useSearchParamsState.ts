import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function useSearchParamsState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setSearchParams = (params: Record<string, string>) => {
    const newParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      }
    });
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return [searchParams, setSearchParams] as const;
}

export default useSearchParamsState;