import React, { memo } from "react";
import { useColorMode, useTheme, Stack } from "@chakra-ui/core";
import Controls from "./Controls";
import Details from "./Details";
import TabSection from "./TabSection";
import { Game } from "../entities";

interface ISideBarProps {
  game: Game;
}

const Sidebar: React.FC<ISideBarProps> = ({ game }) => {
  const theme: any = useTheme();
  const { colorMode } = useColorMode();

  return (
    <Stack
      as="section"
      borderLeftColor={theme[colorMode].borderColor}
      borderLeftWidth="0.25rem"
      spacing="1rem"
      minW="305px"
    >
      <Controls game={game} p="0.5rem" />
      <Details game={game} />
      <TabSection game={game} />
    </Stack>
  );
};

export default memo(Sidebar);
