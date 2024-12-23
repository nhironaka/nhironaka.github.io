import {
  type RefObject,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

export type Listener<T> = (
  boundingClientRect: DOMRect,
  ref: RefObject<T>,
) => void;

export function useRefDimensions<T extends HTMLElement = HTMLElement>(
  listener?: Listener<T>,
) {
  const ref = useRef<T>(null);
  const [boundingClientRect, setBoundingClientRect] = useState<DOMRect>();

  const resetBoundingClientRect = useCallback(() => {
    if (ref.current) {
      const boundingClientRect = ref.current.getBoundingClientRect();
      setBoundingClientRect(boundingClientRect);
      listener?.(boundingClientRect, ref);
    }
  }, [listener]);

  useLayoutEffect(() => {
    resetBoundingClientRect();
    window.addEventListener('resize', resetBoundingClientRect);

    return () => {
      window.removeEventListener('resize', resetBoundingClientRect);
    };
  }, [resetBoundingClientRect]);

  return {
    ref,
    boundingClientRect,
  };
}
