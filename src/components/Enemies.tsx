import React, { memo, useState, useEffect, useCallback } from "react";
import { Game } from "../entities";
import { Box, Grid } from "@chakra-ui/core";

interface IEnemiesProps {
  game: Game;
}

const Enemies: React.FC<IEnemiesProps> = ({ game }) => {
  const [{ fieldCellsBounds, enemies }, setGame] = useState(game);

  useEffect(() => {
    game.addListener({
      valuesToWatch: ["initializeEnemies"],
      trigger: setGame,
    });
  }, [game]);

  const enemyRefCB = useCallback(
    (enemyEl: HTMLDivElement) => {
      game.addUnassignedEnemy(enemyEl);
    },
    [game]
  );

  return (
    <>
      {fieldCellsBounds &&
        enemies.map(
          ({ currentPathWayIndex, component, id, health, maxHealth }) => {
            const Comp = component;
            const { width, height } = fieldCellsBounds![currentPathWayIndex];
            const percentage = (health / maxHealth) * 100;
            return (
              <Grid
                ref={enemyRefCB}
                id={`enemy-${id}`}
                key={id}
                w={`${width}px`}
                h={`${height}px`}
                position="absolute"
                hidden={true}
              >
                <Box as={Comp} w="100%" h="100%" />
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
                    width={`${percentage}%`}
                    height="100%"
                    backgroundColor="#00ffa2"
                    borderRadius="inherit"
                  />
                </Box>
              </Grid>
            );
          }
        )}
    </>
  );
};

export default memo(Enemies);
