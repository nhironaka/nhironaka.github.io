import { Dispatch, SetStateAction, useRef, useState } from 'react';

import { coord } from '@shared/helpers/grid';
import { cva } from '@styled/css';
import { Box, Circle, Flex, Grid } from '@styled/jsx';
import { token as pandaToken } from '@styled/tokens';
import { MotionBox } from '@ui/Motion';
import classNames from 'classnames';
import { BOARD_SIZE, TOKENS } from '../constants';
import { BoardState } from '../services/BoardState';
import { Token } from '../types';
import { Cell, tokenRecipe } from './Cell';
import { EmptyCell } from './EmptyCell';

interface Props {
  activePlayer: Token;
  board: BoardState;
  setActivePlayer: Dispatch<SetStateAction<Token>>;
}

const DROP_ROW = new Array<string>(BOARD_SIZE).fill('');

const borderRadiusRecipe = cva({
  variants: {
    top: {
      true: {},
      false: {},
    },
    left: {
      true: {},
      false: {},
    },
    bottom: {
      true: {},
      false: {},
    },
    right: {
      true: {},
      false: {},
    },
  },

  compoundVariants: [
    {
      top: true,
      left: true,
      css: {
        borderTopLeftRadius: { base: 'sm', lg: 'md' },
      },
    },
    {
      top: true,
      right: true,
      css: {
        borderTopRightRadius: { base: 'sm', lg: 'md' },
      },
    },
    {
      bottom: true,
      left: true,
      css: {
        borderBottomLeftRadius: { base: 'sm', lg: 'md' },
      },
    },
    {
      bottom: true,
      right: true,
      css: {
        borderBottomRightRadius: { base: 'sm', lg: 'md' },
      },
    },
  ],
});

export function Board({ board, activePlayer, setActivePlayer }: Props) {
  const { tokenState } = board;
  const boardRef = useRef<HTMLDivElement>(null);
  const [playerWon, setPlayerWon] = useState<Token>();
  const [activeToken, setActiveToken] = useState<{
    x: number;
    y: number;
    top: number;
    left: number;
    width: number;
    height: number;
  }>();

  const dropToken = (col: number) => {
    if (activeToken) {
      return;
    }
    if (playerWon) {
      board.nextGame();
      setPlayerWon(undefined);
      return;
    }
    const played = board.getDroppedTokenLocation(col);

    if (played) {
      const xy = coord`${[played.x, played.y]}`;

      const boardCell = boardRef.current?.querySelector(`[data-key="${xy}"]`);

      if (boardRef.current && boardCell) {
        const { x, y, width, height } = boardCell.getBoundingClientRect();

        const { top: scrollTop, left: scrollLeft } =
          boardRef.current.getBoundingClientRect();

        setActiveToken({
          top: y + scrollTop * -1,
          left: x + scrollLeft * -1,
          width,
          height,
          ...played,
        });
      }
    } else {
      setActiveToken(undefined);
    }
  };

  const onTokenDropped = () => {
    if (!activeToken) {
      return;
    }

    const won = board.dropToken(activeToken, activePlayer);

    setActivePlayer((prev) =>
      prev === TOKENS.RED ? TOKENS.BLACK : TOKENS.RED,
    );

    if (won) {
      setPlayerWon(activePlayer);
    }
    setActiveToken(undefined);
  };

  return (
    <Box width="full">
      <Grid
        width="full"
        gap="1px"
        borderRadius={{ base: 'sm', lg: 'md' }}
        gridTemplateColumns="repeat(7, 1fr)"
      >
        {DROP_ROW.map((_, col) => {
          return (
            <Cell
              key={col}
              bg="white"
              cursor="pointer"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: activeToken ? 0 : 1 }}
              token={activePlayer}
              x={col}
              y={-1}
              onClick={() => dropToken(col)}
            />
          );
        })}
      </Grid>
      <Grid
        ref={boardRef}
        width="full"
        gap="1px"
        borderRadius={{ base: 'sm', lg: 'md' }}
        gridTemplateColumns="repeat(7, 1fr)"
        border="1px solid"
        borderColor="indigo.900"
        bg="indigo.900"
        position="relative"
      >
        {board.cells.map((row, col) => {
          return (
            <Flex
              key={col}
              position="relative"
              flexDirection="column"
              bg="white"
              className={classNames(
                borderRadiusRecipe({
                  top: true,
                  bottom: true,
                  left: col === 0,
                  right: col === BOARD_SIZE - 1,
                }),
              )}
            >
              {activeToken?.x === col && (
                <MotionBox
                  style={{
                    width: activeToken.width,
                    height: activeToken.width,
                  }}
                  position="absolute"
                  p="10%"
                  initial={{ bottom: '100%' }}
                  animate={{ bottom: '0' }}
                  onAnimationComplete={onTokenDropped}
                >
                  <Circle
                    width="100%"
                    height="100%"
                    className={tokenRecipe({ token: activePlayer })}
                  />
                </MotionBox>
              )}
              {row.map((cell) => {
                const xy = coord`${[cell.x, cell.y]}`;
                const token = tokenState[xy];
                const className = borderRadiusRecipe({
                  top: cell.y === 0,
                  bottom: cell.y === BOARD_SIZE - 1,
                  left: cell.x === 0,
                  right: cell.x === BOARD_SIZE - 1,
                });

                if (token) {
                  return (
                    <Cell
                      bg="sky.100"
                      key={xy}
                      className={className}
                      token={tokenState[xy]}
                      x={cell.x}
                      y={cell.y}
                      onClick={() => dropToken(col)}
                    />
                  );
                }

                return (
                  <EmptyCell
                    key={xy}
                    className={className}
                    x={cell.x}
                    y={cell.y}
                    foreground={pandaToken('colors.sky.100')}
                  />
                );
              })}
            </Flex>
          );
        })}
      </Grid>
    </Box>
  );
}
