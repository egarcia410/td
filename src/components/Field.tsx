import React, { memo } from "react";
import { Box } from "@chakra-ui/core";
import Enemies from "./Enemies";
import { Game } from "../entities";
import FieldTowers from "./FieldTowers";
import Bullets from "./Bullets";

interface IFieldProps {
  game: Game;
}

const Field: React.FC<IFieldProps> = ({ game }) => {
  const onDragOver = (event: any) => {
    event.preventDefault();
  };

  const onDrop = (event: any) => {
    event.preventDefault();
    const id = event.dataTransfer.getData("text/plain");
    const { cells } = game.board;
    const { width, height } = cells[0].cellEl.getBoundingClientRect();
    const x = Math.floor(event.pageX / width);
    const y = Math.floor(event.pageY / height);
    const fieldCellId = y < 1 ? x : +`${y}${x}`;
    const fieldCellEl = cells[fieldCellId];
    if (id === "pokeball") {
      game.attemptCapture(fieldCellEl);
    } else {
      game.addFieldTower(id, fieldCellEl);
    }
  };

  return (
    <Box
      position="absolute"
      w="100%"
      h="100%"
      top="0"
      left="0"
      zIndex={2}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <Enemies game={game} />
      <FieldTowers game={game} />
      <Bullets game={game} />
    </Box>
  );
};

export default memo(Field);
