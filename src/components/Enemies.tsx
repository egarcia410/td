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
          const size = Math.min(width, height);
          return (
            <Grid
              ref={enemyRefCB}
              id={`enemy-${id}`}
              key={id}
              w={`${size}px`}
              h={`${size}px`}
              position="absolute"
              hidden={true}
            >
              <Box as={Comp} />
            </Grid>
          );
        })}
    </>
  );
};

export default memo(Enemies);

// import React, { memo, useState, useCallback } from "react";
// import { Game } from "../entities";
// import { Box } from "@chakra-ui/core";

// interface IEnemiesProps {
//   game: Game;
// }

// const Enemies: React.FC<IEnemiesProps> = ({ game }) => {
//   const [{ enemyCount, enemies }] = useState(game);

//   const enemyRefCB = useCallback((enemyEl: HTMLDivElement) => {
//     game.addUnassignedEnemy(enemyEl);
//   }, []);

//   const renderBullets = () => {
//     const enemies: any = [];
//     for (let i = 0; i < enemyCount; i++) {
//       enemies.push(
//         <Box
//           key={`enemy-${i}`}
//           id={`enemy-${i}`}
//           ref={enemyRefCB}
//           position="absolute"
//         >
//           <Box as={Comp} />
//         </Box>
//       );
//     }
//     return enemies;
//   };

//   return <>{renderBullets()}</>;
// };

// export default memo(Enemies);
