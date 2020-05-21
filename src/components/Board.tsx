import React, { memo, useCallback } from "react";
import { Box } from "@chakra-ui/core";
import FieldBackground from "./FieldBackground";
import Field from "./Field";
import { Game } from "../entities";

interface IBoardProps {
  game: Game;
}

const Board: React.FC<IBoardProps> = ({ game }) => {
  const { addBoardElement } = game;
  const boardRefCB = useCallback(
    (boardEl) => {
      addBoardElement(boardEl);
    },
    [addBoardElement]
  );

  return (
    <Box ref={boardRefCB} position="relative" overflow="hidden">
      <Field game={game} />
      <FieldBackground game={game} />
    </Box>
  );
};

export default memo(Board);
