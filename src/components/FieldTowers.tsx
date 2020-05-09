import React, { memo, useState, useEffect } from "react";
import { Game } from "../entities";
import { Box, Grid } from "@chakra-ui/core";

interface IFieldTowersProps {
  game: Game;
}

const FieldTowers: React.FC<IFieldTowersProps> = ({ game }) => {
  const [{ fieldCellsBounds, fieldTowers }, setGame] = useState(game);

  useEffect(() => {
    game.addListener({
      valuesToWatch: ["fieldCellsBounds", "fieldTowers"],
      trigger: setGame,
    });
  }, [game]);

  const renderFieldTowers = () => {
    const fTowers: any = [];
    fieldCellsBounds &&
      fieldTowers.forEach(({ component, fieldCellId }, index) => {
        const Comp = component;
        const { width, height, left, top } = fieldCellsBounds![fieldCellId];
        const size = Math.min(width, height);
        fTowers.push(
          <Grid
            id={`${index}`}
            key={index}
            w={`${size}px`}
            h={`${size}px`}
            position="absolute"
            top={`${top}px`}
            left={`${left}px`}
            justifyContent="center"
            alignContent="center"
          >
            <Box as={Comp} />
          </Grid>
        );
      });
    return fTowers;
  };

  return <>{renderFieldTowers()}</>;
};

export default memo(FieldTowers);
