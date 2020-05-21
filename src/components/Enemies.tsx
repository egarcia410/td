import React, { memo, useCallback, useState, useEffect } from "react";
import { Box, Grid } from "@chakra-ui/core";
import { Game } from "../entities";

interface IEnemiesProps {
  game: Game;
}

const Enemies: React.FC<IEnemiesProps> = ({ game }) => {
  const [{ addListener, addEnemyElement, enemies }, update] = useState(game);

  useEffect(() => {
    addListener({
      valuesToWatch: ["enemies"],
      update,
    });
  }, [addListener]);

  const enemyRefCB = useCallback(
    (enemyEl: HTMLDivElement) => {
      addEnemyElement(enemyEl);
    },
    [addEnemyElement]
  );

  return (
    <>
      {enemies.map(({ component, id }) => {
        return (
          <Grid
            ref={enemyRefCB}
            id={`enemy-${id}`}
            key={id}
            position="absolute"
            hidden={true}
          >
            <Box as={component} w="100%" h="100%" />
            <Box
              position="absolute"
              top="4.5rem"
              width="80%"
              height=".5rem"
              backgroundColor="white"
              borderRadius=".35rem"
              border=".1rem solid #46476d"
              margin="0.5rem"
            >
              <Box
                height="100%"
                backgroundColor="#00ffa2"
                borderRadius="inherit"
              />
            </Box>
          </Grid>
        );
      })}
    </>
  );
};

export default memo(Enemies);
