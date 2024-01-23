import type { Selection } from "@/lib/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gctx } from "./canvas";

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

type MarchingArtsOptions = {
  lineLength: number;
  lineGap: number;
  speed: number;
  forward: boolean;
};
export function useCanvasMarchingAnts(
  canvas: React.RefObject<HTMLCanvasElement>,
  selection: Selection,
  { lineGap, lineLength, speed, forward }: MarchingArtsOptions = {
    lineGap: 5,
    lineLength: 5,
    speed: 50,
    forward: true,
  }
) {
  const [offset, setOffset] = useState(3);
  const march = useCallback(() => {
    if (forward) {
      setOffset(offset - 1);
      if (offset < 1) {
        setOffset(10);
      }
    } else {
      setOffset(offset + 1);
      if (offset > 10) {
        setOffset(0);
      }
    }
    if (!canvas.current || !selection) return;

    const can = canvas.current;

    const ctx = gctx(canvas.current);
    ctx.clearRect(0, 0, can.width, can.height);
    ctx.beginPath();

    ctx.setLineDash([lineLength, lineGap]);
    ctx.lineDashOffset = offset;
    ctx.strokeRect(
      selection[0][0],
      selection[0][1],
      selection[1][0],
      selection[1][1]
    );
    ctx.stroke();

    return setTimeout(march, speed);
  }, [canvas.current, offset, lineLength, lineGap, speed]);

  useEffect(() => {
    const id = march();
    return () => clearTimeout(id);
  }, [march]);
}
