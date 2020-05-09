import React, { memo, useState, useCallback } from "react";
import { Game } from "../entities";
import { Box } from "@chakra-ui/core";

interface IBulletsProps {
  game: Game;
}

const Bullets: React.FC<IBulletsProps> = ({ game }) => {
  const [{ bulletCount }] = useState(game);

  const bulletRefCB = useCallback(
    (bulletEl: HTMLDivElement) => {
      game.addUnassignedBullet(bulletEl);
    },
    [game]
  );

  const renderBullets = () => {
    const bullets: any = [];
    for (let i = 0; i < bulletCount; i++) {
      bullets.push(
        <Box
          key={`bullet-${i}`}
          id={`bullet-${i}`}
          ref={bulletRefCB}
          position="absolute"
        ></Box>
      );
    }
    return bullets;
  };

  return <>{renderBullets()}</>;
};

export default memo(Bullets);
