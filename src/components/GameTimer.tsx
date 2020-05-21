import React, { memo, useEffect, useState } from "react";
import { Flex, Box, Text } from "@chakra-ui/core";
import { BsFillClockFill } from "react-icons/bs";
import { Game } from "../entities";

interface IGameTimerProps {
  game: Game;
}

const GameTimer: React.FC<IGameTimerProps> = ({ game }) => {
  const [{ addListener, gameTimer }, update] = useState(game);

  useEffect(() => {
    addListener({
      valuesToWatch: ["gameTimer"],
      update,
    });
  }, [addListener]);

  return (
    <Flex alignItems="center" flexGrow={1}>
      <Box as={BsFillClockFill} color="#8995AE" fontSize="1.5rem" mr="0.5rem" />
      <Text color="#8995AE" fontWeight="600">
        {gameTimer / 1000}
      </Text>
    </Flex>
  );
};

export default memo(GameTimer);
