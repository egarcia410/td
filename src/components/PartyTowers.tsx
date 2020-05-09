import React, { useState, useEffect } from "react";
import { Grid, Box, Flex } from "@chakra-ui/core";
import { Game } from "../entities";

interface IPartyTowersProps {
  game: Game;
}

const PartyTowers: React.FC<IPartyTowersProps> = ({ game }) => {
  const [{ partyTowers }, setGame] = useState(game);

  useEffect(() => {
    game.addListener({
      valuesToWatch: ["partyTowers"],
      trigger: setGame,
    });
  }, [game]);

  const onDragStart = (event: any) => {
    event.dataTransfer.setData("text/plain", event.target.id);
  };

  const renderPartyTowers = () => {
    const partyTowers: any = [];
    game.partyTowers.forEach(({ id, component, level }) => {
      partyTowers.push(
        <Box key={id} position="relative">
          <Box
            id={`${id}`}
            draggable
            onDragStart={onDragStart}
            cursor="pointer"
          >
            <Box as={component} />
          </Box>
          <Flex
            position="absolute"
            top="-10px"
            right="-15px"
            bg="blue.400"
            color="gray.200"
            borderRadius="1rem"
            justifyContent="center"
            alignItems="center"
            p="0.2rem 0.6rem"
            fontSize="0.75rem"
          >
            {level}
          </Flex>
        </Box>
      );
    });
    return partyTowers;
  };

  return (
    <Grid
      templateColumns="repeat(2, minmax(80px,125px))"
      gap="2rem"
      padding="1.25rem"
    >
      {renderPartyTowers()}
    </Grid>
  );
};

export default PartyTowers;
