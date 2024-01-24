import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Hook to run an async effect on mount and another on unmount.
 * @see https://marmelab.com/blog/2023/01/11/use-async-effect-react.html
 */
export function useAsyncEffect<M>(
  mountCallback: () => Promise<M>
): UseAsyncEffectResult<M>;
export function useAsyncEffect<M>(
  mountCallback: () => Promise<M>,
  deps: React.DependencyList
): UseAsyncEffectResult<M>;
export function useAsyncEffect<M>(
  mountCallback: () => Promise<M>,
  deps: React.DependencyList,
  unmountCallback: () => Promise<void>
): UseAsyncEffectResult<M>;

export function useAsyncEffect<M>(
  mountCallback: () => Promise<M>,
  deps: React.DependencyList = [],
  unmountCallback: (() => Promise<void>) | null = null
): UseAsyncEffectResult<M> {
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(undefined);
  const [result, setResult] = useState<M>();

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    let mountSucceeded = false;

    (async () => {
      await Promise.resolve(); // wait for the initial cleanup in Strict mode - avoids double mutation
      if (!isMounted.current || ignore) {
        return;
      }
      setIsLoading(true);
      try {
        const result = await mountCallback();
        mountSucceeded = true;
        if (isMounted.current && !ignore) {
          setError(undefined);
          setResult(result);
          setIsLoading(false);
        } else {
          // Component was unmounted before the mount callback returned, cancel it
          unmountCallback && unmountCallback();
        }
      } catch (error) {
        if (!isMounted.current) return;
        setError(error);
        setIsLoading(false);
      }
    })();

    return () => {
      ignore = true;
      if (mountSucceeded && unmountCallback) {
        unmountCallback()
          .then(() => {
            if (!isMounted.current) return;
            setResult(undefined);
          })
          .catch((error: unknown) => {
            if (!isMounted.current) return;
            setError(error);
          });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return useMemo(
    () => ({ result, error, isLoading }),
    [result, error, isLoading]
  );
}

export type UseAsyncEffectResult<R> = {
  result: R | undefined;
  error: unknown;
  isLoading: boolean;
};
