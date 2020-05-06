import React, { memo } from "react";
import { Grid, GridProps } from "@chakra-ui/core";
import PlayControls from "./PlayControls";
import OptionControls from "./OptionControls";

const Controls: React.FC<GridProps> = ({ ...rest }) => {
  return (
    <Grid
      templateColumns="1fr"
      templateRows="repeat(2, 1fr)"
      gap="1rem"
      {...rest}
    >
      <OptionControls />
      <PlayControls />
    </Grid>
  );
};

export default memo(Controls);
