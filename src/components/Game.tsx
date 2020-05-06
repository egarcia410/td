import React, { memo } from "react";
import { Grid, useColorMode, useTheme } from "@chakra-ui/core";
import Board from "./Board";
import Sidebar from "./Sidebar";

const Game = () => {
  const theme: any = useTheme();
  const { colorMode } = useColorMode();
  const { bg } = theme[colorMode];

  return (
    <Grid templateColumns="3fr 1fr" h="100vh" bg={bg}>
      <Board />
      <Sidebar />
    </Grid>
  );
};

export default memo(Game);
