import random from 'random';

import { EMPTY, TOKENS } from '../constants/board';
import { type Position } from '../types/board';

export interface PositionedElements {
  width: number;
  height: number;
  position: Position;
  angle?: number; // Optional, for rotation
}

/**
 * Randomly places N elements of size X by Y on a circular surface without overlapping.
 * @param radius Radius of the circular surface.
 * @param elementWidth Width of each element (X).
 * @param elementHeight Height of each element (Y).
 * @param count Number of elements to place (N).
 * @returns Array of elements with their positions.
 */
function isOverlapping(
  elements: Array<PositionedElements>,
  newElement: PositionedElements,
): boolean {
  return elements.some((existingElement) => {
    const { x: ax1, y: ay1 } = existingElement.position;
    const ax2 = ax1 + existingElement.width;
    const ay2 = ay1 + existingElement.height;

    const { x: bx1, y: by1 } = newElement.position;
    const bx2 = bx1 + newElement.width;
    const by2 = by1 + newElement.height;

    // Check if rectangles overlap
    return ax1 < bx2 && ax2 > bx1 && ay1 < by2 && ay2 > by1;
  });
}

function isInsideCircle(params: {
  x: number;
  y: number;
  radius: number;
  elementWidth: number;
  elementHeight: number;
}): boolean {
  const { x, y, radius, elementWidth, elementHeight } = params;
  const dx = x + elementWidth / 2 - radius;
  const dy = y + elementHeight / 2 - radius;

  return dx * dx + dy * dy <= radius * radius;
}

export function placeRandomElementsInCircle<T>(params: {
  radius: number;
  elementWidth: number;
  elementHeight: number;
  elements: Array<T>;
  allowOverlap?: boolean;
  startingElements?: Array<PositionedElements>;
}): Array<PositionedElements & T> {
  const {
    radius,
    elementWidth,
    elementHeight,
    elements,
    allowOverlap,
    startingElements = [],
  } = params;
  const positionedElements: Array<PositionedElements> = [...startingElements];
  const placedElements: Array<PositionedElements & T> = [];

  for (let i = 0; i < elements.length; i++) {
    let placed = false;
    let tries = 0;

    while (!placed) {
      // Generate a random position within the bounding square of the circle
      const x = random.int(0, 2 * radius - elementWidth + 1);
      const y = random.int(0, 2 * radius - elementHeight + 1);

      const newElement: PositionedElements & T = {
        width: elementWidth,
        height: elementHeight,
        position: { x, y },
        ...elements[i],
      };

      // Check if the element is inside the circle and not overlapping
      if (
        (isInsideCircle({ x, y, elementHeight, elementWidth, radius }) ||
          tries > 8) &&
        (allowOverlap || !isOverlapping(positionedElements, newElement))
      ) {
        positionedElements.push(newElement);
        placedElements.push(newElement);
        placed = true;
      } else {
        tries++;
      }
    }
  }

  return placedElements;
}

/**
 * Places N elements of size height by width equidistantly on a circular surface.
 * @param radius Radius of the circular surface.
 * @param width Width of each element.
 * @param height Height of each element.
 * @param count Number of elements to place.
 * @returns Array of elements with their positions.
 */
export function arrangeItemsInCircle(params: {
  radius: number;
  width: number;
  height: number;
  n: number;
}): PositionedElements[] {
  const { radius, width, height, n } = params;
  const elements: PositionedElements[] = [];

  const centerX = radius;
  const centerY = radius;
  const angleIncrement = (2 * Math.PI) / n;

  for (let i = 0; i < n; i++) {
    const angle = i * angleIncrement;

    // Calculate the position for the center of the element
    const x = centerX + (radius - width / 2) * Math.cos(angle) - width / 2;
    const y = centerY + (radius - height / 2) * Math.sin(angle) - height / 2;

    // Ensure the element is fully within the circular surface
    if (
      (x + width / 2 - centerX) ** 2 + (y + height / 2 - centerY) ** 2 <=
      radius ** 2
    ) {
      elements.push({
        width,
        height,
        position: { x, y },
      });
    } else {
      throw new Error(
        'Element placement would extend outside the circular surface.',
      );
    }
  }

  return elements;
}

const COLUMNS = 5;
const rows = new Array<null | typeof EMPTY>(COLUMNS).fill(null);

export function initializeEmptyRows() {
  return rows.map((_, idx) => {
    const tail = new Array<typeof EMPTY>(idx + 1).fill(EMPTY);
    return rows.slice(0, COLUMNS - (idx + 1)).concat(tail);
  });
}

const tokens = Object.values(TOKENS);
export function initializeEmptyPlays() {
  return Array.from({ length: COLUMNS }, (_, row) =>
    Array.from({ length: COLUMNS }, (_, column) => ({
      token: tokens[(row + column) % tokens.length],
    })),
  );
}

export function getRelativePosition(
  target: HTMLElement | null,
  element: HTMLElement | null,
) {
  if (!target || !element) {
    return {
      x: 0,
      y: 0,
    };
  }
  const targetRect = target.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();
  return {
    x: elementRect.left - targetRect.left,
    y: elementRect.top - targetRect.top,
  };
}
