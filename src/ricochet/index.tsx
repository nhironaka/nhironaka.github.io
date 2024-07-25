import { useRef, useState } from 'react';

import { coord } from '@shared/helpers/grid';
import { Button } from '@ui/Button';
import { Board } from './components/Board';
import { Controller } from './components/Controller';
import { NextPlay } from './components/NextPlay';
import { DIFFICULTY_TYPES, GOAL_TOKENS, PLAYERS } from './constants/board';
import { getGoalState, getInitialTokenState, isAtGoal } from './helpers/board';
import { BoardState, DEFAULT_GRID_COUNT } from './services/BoardState';
import { Randomizer } from './services/randomizer';
import {
  type Difficulty,
  type GoalState,
  type GoalToken,
  type Player,
  type Token,
  type TokenState,
} from './types/board';

import { Box, Flex } from '@styled/jsx';

interface Props {
  gridSize?: number;
  difficulty?: Difficulty;
}

function reverseTokenState(map: TokenState) {
  return Object.entries(map).reduce(
    (acc, [token, xy]) => {
      acc[coord`${xy}`] = token as Token;
      return acc;
    },
    {} as Record<string, Token>,
  );
}

function reverseGoalState(map: GoalState) {
  return Object.entries(map).reduce(
    (acc, [xy, token]) => {
      acc[token as GoalToken] = xy;
      return acc;
    },
    {} as Record<GoalToken, string>,
  );
}
const goalTokens = Object.values(GOAL_TOKENS);

export function Game({
  difficulty = DIFFICULTY_TYPES.EASY,
  gridSize = DEFAULT_GRID_COUNT,
}: Props) {
  const [playerGoalState, setPlayerGoal] = useState({
    [PLAYERS.ONE]: false,
    [PLAYERS.TWO]: false,
  });
  const altPlayerAnswer = useRef<TokenState>();
  const [activePlayer, setActivePlayer] = useState<Player>(PLAYERS.ONE);
  const [board, setBoard] = useState(new BoardState(gridSize, difficulty));
  const [tokenState, setTokenState] = useState(getInitialTokenState(gridSize));
  const [plays, setPlays] = useState(
    new Randomizer(goalTokens, goalTokens.length).all(),
  );
  const [activeTokenState, setActiveTokenState] = useState(tokenState);
  const [goalState, setGoalState] = useState(getGoalState(board));
  const [history, setHistory] = useState<Array<TokenState>>([]);
  const [numMoves, setNumMoves] = useState(0);
  const shadowTokenState = reverseTokenState(tokenState);
  const [submittedMoves, setSubmittedMoves] = useState(
    new Array<{
      player: Player;
      numMoves: number;
      tie?: boolean;
    }>(),
  );

  const reverseTokenMap = reverseTokenState(activeTokenState);
  const [currentPlay] = plays;

  const atGoal = isAtGoal({
    goalState: reverseGoalState(goalState),
    activeGoal: currentPlay,
    tokenState: reverseTokenMap,
  });

  const nextPlay = () => {
    setPlays((prev) => prev.slice(1));
  };

  const onSubmit = () => {
    if (activePlayer === PLAYERS.ONE) {
      altPlayerAnswer.current = activeTokenState;
    }
    setPlayerGoal((prev) => ({
      ...prev,
      [activePlayer]: atGoal,
    }));
    setActiveTokenState(tokenState);
    setActivePlayer((prev) =>
      prev === PLAYERS.ONE ? PLAYERS.TWO : PLAYERS.ONE,
    );

    setNumMoves(0);
    setHistory([]);
  };

  const onConfirm = (player: Player, tie = false) => {
    if (!altPlayerAnswer.current) {
      return;
    }
    if (player === PLAYERS.ONE) {
      setTokenState(altPlayerAnswer.current);
      setActiveTokenState(altPlayerAnswer.current);
    } else {
      setTokenState(activeTokenState);
    }
    altPlayerAnswer.current = undefined;
    setActivePlayer(PLAYERS.ONE);
    nextPlay();
    setNumMoves(0);
    setHistory([]);
    setSubmittedMoves((prev) =>
      prev.concat({
        player,
        numMoves,
        tie,
      }),
    );
  };

  const undo = () => {
    if (history.length > 0) {
      const updatedHistory = [...history];
      const activeTokenState = updatedHistory.pop();
      if (activeTokenState) {
        setActiveTokenState(activeTokenState);
        setHistory(updatedHistory);
        setNumMoves((prev) => prev - 1);
      }
    }
  };

  const resetGame = () => {
    const newBoard = new BoardState(gridSize, difficulty);
    const tokenState = getInitialTokenState(gridSize);

    setBoard(newBoard);
    setGoalState(getGoalState(newBoard));
    setHistory([]);
    setActiveTokenState(tokenState);
    setTokenState(tokenState);
    setActivePlayer(PLAYERS.ONE);
    setNumMoves(0);
    setPlays(new Randomizer(goalTokens, goalTokens.length).all());
    altPlayerAnswer.current = undefined;
    setPlayerGoal({
      [PLAYERS.ONE]: false,
      [PLAYERS.TWO]: false,
    });
  };

  const switchPlayer = (player: Player) => {
    if (playerGoalState[PLAYERS.ONE] || playerGoalState[PLAYERS.TWO]) {
      onConfirm(player);
    } else {
      setActivePlayer((prev) =>
        prev === PLAYERS.ONE ? PLAYERS.TWO : PLAYERS.ONE,
      );
    }
  };

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="4"
    >
      <Button onClick={resetGame}>New game</Button>
      <NextPlay currentPlay={currentPlay} nextPlay={nextPlay} />

      <Flex maxWidth="1200px" width="full" px={{ base: '1', lg: '6' }}>
        <Board
          shadowTokenState={shadowTokenState}
          board={board}
          tokenState={activeTokenState}
          goalState={goalState}
          gridSize={gridSize}
          activePlayer={activePlayer}
          setTokenState={(tokenState) => {
            setHistory((prev) => prev.concat(activeTokenState));
            setActiveTokenState(tokenState);
            setNumMoves((prev) => prev + 1);
          }}
        />
      </Flex>

      <Controller
        onSubmit={atGoal ? onSubmit : undefined}
        activePlayer={activePlayer}
        numMoves={numMoves}
        undo={history.length > 0 ? undo : undefined}
        atGoal={playerGoalState}
        switchPlayer={switchPlayer}
      />

      <Flex flexDirection="column" px={{ base: '2', lg: '6' }}>
        {submittedMoves.map(({ player, numMoves }, idx) => {
          return (
            <Box key={idx}>
              Round {idx + 1}: Player {player} - {numMoves} moves
            </Box>
          );
        })}
      </Flex>
    </Flex>
  );
}
