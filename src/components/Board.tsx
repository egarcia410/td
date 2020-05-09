import React, { memo, useCallback } from "react";
import { Box } from "@chakra-ui/core";
import FieldBackground from "./FieldBackground";
import Field from "./Field";
import { Game } from "../entities";

interface IBoardProps {
  game: Game;
}

const Board: React.FC<IBoardProps> = ({ game }) => {
  const boardRefCB = useCallback(
    (boardEl) => {
      game.addBoardEl(boardEl);
    },
    [game]
  );

  return (
    <Box ref={boardRefCB} position="relative" overflow="hidden">
      <Field game={game} />
      <FieldBackground game={game} />
    </Box>
  );
};

export default memo(Board);
