import React, { memo } from "react";
import { Grid, GridProps, Flex } from "@chakra-ui/core";
import PlayControls from "./PlayControls";
import OptionControls from "./OptionControls";
import { Game } from "../entities";
import GameTimer from "./GameTimer";

interface IControlsProps extends GridProps {
  game: Game;
}

const Controls: React.FC<IControlsProps> = ({ game, ...rest }) => {
  return (
    <Grid
      templateColumns="1fr"
      templateRows="repeat(2, 1fr)"
      gap="1rem"
      {...rest}
    >
      <Flex direction="row">
        <GameTimer game={game} />
        <OptionControls game={game} />
      </Flex>
      <PlayControls game={game} />
    </Grid>
  );
};

export default memo(Controls);
