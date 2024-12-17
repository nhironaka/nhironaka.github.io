import { useRef, useState } from 'react';

export const useFlyingElement = () => {
  const sourceRefs = useRef<Array<HTMLDivElement | null>>([]);
  const targetRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [endPosition, setEndPosition] = useState({ x: 0, y: 0 });
  const [isFlying, setIsFlying] = useState(false);

  const flyToTarget = async (
    sourceRef: HTMLDivElement | null,
    targetRef: HTMLDivElement | null,
  ) => {
    if (!sourceRef || !targetRef) {
      return;
    }

    // Compute positions using Floating UI
    const sourceRect = sourceRef.getBoundingClientRect();
    const targetRect = targetRef.getBoundingClientRect();

    const start = { x: sourceRect.left, y: sourceRect.top };
    const end = { x: targetRect.left, y: targetRect.top };

    setStartPosition(start);
    setEndPosition(end);

    // Trigger the animation
    setIsFlying(true);
  };

  return {
    sourceRefs,
    targetRefs,
    flyToTarget,
    setIsFlying,
    isFlying,
    endPosition,
    startPosition,
  };
};
