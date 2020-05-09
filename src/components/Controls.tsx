import React, { memo } from "react";
import { Grid, GridProps } from "@chakra-ui/core";
import PlayControls from "./PlayControls";
import OptionControls from "./OptionControls";
import { Game } from "../entities";

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
      <OptionControls game={game} />
      <PlayControls game={game} />
    </Grid>
  );
};

export default memo(Controls);
