import React, { useState, useEffect } from "react";
import { Box, Flex, Text, BoxProps } from "@chakra-ui/core";
import { FaCoins, FaHeart } from "react-icons/fa";
import { TiWaves } from "react-icons/ti";
import { GiWhiteTower } from "react-icons/gi";
import { Game } from "../entities";

interface IDetailsProps extends BoxProps {
  game: Game;
}

const Details: React.FC<IDetailsProps> = ({ game, ...rest }) => {
  const [
    {
      addListener,
      health,
      money,
      currentWaveNumber,
      partyTowers,
      gymLeaders,
      maxPartySize,
    },
    update,
  ] = useState(game);

  useEffect(() => {
    addListener({
      valuesToWatch: [
        "health",
        "money",
        "currentWaveNumber",
        "partyTowers",
        "maxPartySize",
      ],
      update,
    });
  }, [addListener]);

  return (
    <Flex justifyContent="space-around" {...rest}>
      <Flex direction="column" alignItems="center">
        <Box as={FaHeart} aria-label="health" color="red.400" size="1.5rem" />
        <Text fontSize="1.25rem" fontWeight="500" color="gray.400">
          {health}
        </Text>
      </Flex>
      <Flex direction="column" alignItems="center">
        <Box
          as={FaCoins}
          aria-label="total money"
          color="yellow.400"
          size="1.5rem"
        />
        <Text fontSize="1.25rem" fontWeight="500" color="gray.400">
          {money}
        </Text>
      </Flex>
      <Flex direction="column" alignItems="center">
        <Box as={TiWaves} aria-label="wave" color="blue.400" size="1.5rem" />
        <Text fontSize="1.25rem" fontWeight="500" color="gray.400">
          {currentWaveNumber + 1}/{gymLeaders.length * 10}
        </Text>
      </Flex>
      <Flex direction="column" alignItems="center">
        <Box
          as={GiWhiteTower}
          aria-label="tower count"
          color="gray.400"
          size="1.5rem"
        />
        <Text fontSize="1.25rem" fontWeight="500" color="gray.400">
          {partyTowers.size}/{maxPartySize}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Details;
