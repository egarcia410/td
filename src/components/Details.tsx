import React from "react";
import { Box, Flex, Text, BoxProps } from "@chakra-ui/core";
import { FaCoins, FaHeart } from "react-icons/fa";
import { TiWaves } from "react-icons/ti";
import { GiWhiteTower } from "react-icons/gi";

const Details: React.FC<BoxProps> = ({ ...rest }) => {
  return (
    <Flex justifyContent="space-around" {...rest}>
      <Flex direction="column" alignItems="center">
        <Box
          as={FaHeart}
          aria-label="decrease game speed"
          color="red.400"
          size="1.5rem"
        />
        <Text fontSize="1.25rem" fontWeight="500" color="gray.400">
          3
        </Text>
      </Flex>
      <Flex direction="column" alignItems="center">
        <Box
          as={FaCoins}
          aria-label="decrease game speed"
          color="yellow.400"
          size="1.5rem"
        />
        <Text fontSize="1.25rem" fontWeight="500" color="gray.400">
          50
        </Text>
      </Flex>
      <Flex direction="column" alignItems="center">
        <Box
          as={TiWaves}
          aria-label="decrease game speed"
          color="blue.400"
          size="1.5rem"
        />
        <Text fontSize="1.25rem" fontWeight="500" color="gray.400">
          1/10
        </Text>
      </Flex>
      <Flex direction="column" alignItems="center">
        <Box
          as={GiWhiteTower}
          aria-label="decrease game speed"
          color="gray.400"
          size="1.5rem"
        />
        <Text fontSize="1.25rem" fontWeight="500" color="gray.400">
          1/6
        </Text>
      </Flex>
    </Flex>
  );
};

export default Details;
