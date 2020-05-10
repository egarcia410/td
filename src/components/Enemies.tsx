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
        enemies.map(({ currentPathWayIndex, component, id }) => {
          const Comp = component;
          const { width, height } = fieldCellsBounds![currentPathWayIndex];
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
            </Grid>
          );
        })}
    </>
  );
};

export default memo(Enemies);
