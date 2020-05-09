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
    const towerId = event.dataTransfer.getData("text/plain");
    const x = Math.floor(event.pageX / game.fieldCellsBounds![0].width);
    const y = Math.floor(event.pageY / game.fieldCellsBounds![0].height);
    const fieldCellId = y < 1 ? x : +`${y}${x}`;
    const fieldCellEl = game.fieldCellsEl![fieldCellId];
    // Field cell is not occupied or a pathway
    if (!game.pathWay.includes(fieldCellId) && !fieldCellEl.occupied) {
      game.updateFieldTowers(towerId, fieldCellId);
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
