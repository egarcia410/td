import React, { useState, useEffect } from "react";
import { Grid, Box, Flex, Text } from "@chakra-ui/core";
import { GiPocketBow, GiBroadsword } from "react-icons/gi";
import { IoIosSpeedometer } from "react-icons/io";
import { Game } from "../entities";

interface IPartyTowersProps {
  game: Game;
}

const PartyTowers: React.FC<IPartyTowersProps> = ({ game }) => {
  const [{ addListener, partyTowers }, update] = useState(game);

  useEffect(() => {
    addListener({
      valuesToWatch: ["partyTowers"],
      update,
    });
  }, [addListener]);

  const onDragStart = (event: any) => {
    event.dataTransfer.setData("text/plain", event.target.id);
  };

  const renderPartyTowers = () => {
    const pTowers: any = [];
    partyTowers.forEach(
      ({ id, component, level, range, attack, speed, name, attackColor }) => {
        pTowers.push(
          <Grid
            key={id}
            templateColumns="5rem auto"
            templateRows="6rem"
            background={attackColor}
            padding="0.15rem"
            borderRadius="0.25rem"
            border="0.15rem solid #9BA9BB"
          >
            <Box
              id={`${id}`}
              draggable
              onDragStart={onDragStart}
              cursor="pointer"
              padding="0.15rem"
            >
              <Box as={component} w="100%" h="100%" />
            </Box>
            <Grid
              templateColumns="3.25rem"
              templateRows="repeat(4, 1fr)"
              gap="0.15rem"
            >
              <Flex color="white" alignItems="center" fontSize="1rem">
                <Text fontSize="xs" fontWeight="600" whiteSpace="nowrap">
                  Lvl. {level}
                </Text>
              </Flex>
              <Flex color="white" alignItems="center" fontSize="1rem">
                <Box as={GiPocketBow} paddingRight="0.15rem"></Box>
                <Text fontSize="xs" fontWeight="600">
                  {range}
                </Text>
              </Flex>
              <Flex color="white" alignItems="center" fontSize="1rem">
                <Box as={GiBroadsword} paddingRight="0.15rem"></Box>
                <Text fontSize="xs" fontWeight="600">
                  {attack}
                </Text>
              </Flex>
              <Flex color="white" alignItems="center" fontSize="1rem">
                <Box as={IoIosSpeedometer} paddingRight="0.15rem"></Box>
                <Text fontSize="xs" fontWeight="600">
                  {speed.toFixed(2)}
                </Text>
              </Flex>
            </Grid>
            <Grid color="white" column="1 / span 2" textAlign="center">
              <Text>{name}</Text>
            </Grid>
          </Grid>
        );
      }
    );
    return pTowers;
  };

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap="0.25rem" padding="0.5rem">
      {renderPartyTowers()}
    </Grid>
  );
};

export default PartyTowers;
