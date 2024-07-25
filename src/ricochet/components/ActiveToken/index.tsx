import {
  type Dispatch,
  type SetStateAction,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { coord } from '@shared/helpers/grid';
import { MotionBox } from '@ui/Motion';
import { Popover } from '@ui/Popover';
import type { BoardState } from '../../services/BoardState';
import type { CellState } from '../../services/CellState';
import type { Coord, TokenState, Token as TokenType } from '../../types/board';
import { CellAction } from '../CellActions';
import { Token } from '../Token';

interface Props {
  board: BoardState;
  token: TokenType;
  boardRef: HTMLDivElement | null;
  cell: CellState;
  tokenState: TokenState;
  setTokenState: Dispatch<SetStateAction<Record<TokenType, Coord>>>;
}

export function ActiveToken({
  board,
  token,
  boardRef,
  cell,
  tokenState,
  setTokenState,
}: Props) {
  const timerRef = useRef<number>();
  const ref = useRef<HTMLDivElement>(null);
  const { x, y } = cell;
  const coordinates = coord`${[x, y]}`;
  const [clientRect, setClientRect] =
    useState<Pick<DOMRect, 'left' | 'top' | 'width' | 'height'>>();

  useLayoutEffect(() => {
    const adjustLocation = () => {
      const boardCell = boardRef?.querySelector(`[data-key="${coordinates}"]`);
      const boardInner = boardCell?.querySelector('.inner');

      if (boardRef && boardInner && boardCell && ref.current) {
        const { width, height, x, y } = boardCell.getBoundingClientRect();

        const { top: scrollTop, left: scrollLeft } =
          boardRef.getBoundingClientRect();

        setClientRect({
          width,
          height,
          top: y + scrollTop * -1, // top + (isDesktop ? 2 : 1) + parentTop * -1,
          left: x + scrollLeft * -1, // left + (isDesktop ? 2 : 1) + parentLeft * -1,
        });
      }
    };
    const scrollTimer = () => {
      if (timerRef.current != null) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(adjustLocation, 150);
    };
    adjustLocation();
    window.addEventListener('scroll', scrollTimer, false);
    window.addEventListener('resize', adjustLocation);

    return () => {
      window.removeEventListener('resize', adjustLocation);
      window.removeEventListener('scroll', scrollTimer);
    };
  }, [coordinates, boardRef]);

  return (
    <Popover
      className="cell-action"
      popoverContent={
        <CellAction
          token={token}
          setTokenState={setTokenState}
          coord={[x, y]}
          board={board}
          tokenState={tokenState}
        />
      }
    >
      <MotionBox
        ref={ref}
        position="absolute"
        cursor="pointer"
        p={{ base: '1.5', lg: '2.5' }}
        style={{
          left: clientRect?.left ?? 0,
          top: clientRect?.top ?? 0,
          width: clientRect?.width ?? 0,
          height: clientRect?.height ?? 0,
        }}
      >
        <Token
          top={{ base: '1px', md: '0.5' }}
          left={{ base: '1px', md: '0.5' }}
          token={token}
        />
      </MotionBox>
    </Popover>
  );
}
