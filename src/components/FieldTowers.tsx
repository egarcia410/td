import React, { memo, useState, useEffect } from "react";
import { Game } from "../entities";
import { Box, Grid, PseudoBox } from "@chakra-ui/core";

interface IFieldTowersProps {
  game: Game;
}

const FieldTowers: React.FC<IFieldTowersProps> = ({ game }) => {
  const [{ fieldCellsBounds, fieldTowers }, setGame] = useState(game);
  const [isRangeActive, setIsRangeActive] = useState<Map<string, boolean>>(
    new Map()
  );

  useEffect(() => {
    game.addListener({
      valuesToWatch: ["fieldCellsBounds", "fieldTowers"],
      trigger: setGame,
    });
  }, [game]);

  const onDisplayRange = (id: string) => {
    const newRangeActive = new Map(isRangeActive);
    const isActive = newRangeActive.get(id) || false;
    newRangeActive.set(id, !isActive);
    setIsRangeActive(newRangeActive);
  };

  const renderFieldTowers = () => {
    const fTowers: any = [];
    fieldCellsBounds &&
      fieldTowers.forEach(({ component, fieldCellId, range, id }, index) => {
        const Comp = component;
        const { width, height, left, top } = fieldCellsBounds![fieldCellId];
        const extendedRange = width * range;
        const bulletRange = (width / 2 + extendedRange) * 2;
        const isActive = isRangeActive.get(id) || false;
        fTowers.push(
          <Grid
            id={`${index}`}
            key={index}
            w={`${width}px`}
            h={`${height}px`}
            position="absolute"
            top={`${top}px`}
            left={`${left}px`}
            justifyContent="center"
            alignContent="center"
          >
            <Box
              as={Comp}
              w="100%"
              h="100%"
              position="absolute"
              onClick={() => onDisplayRange(id)}
              cursor="pointer"
            />
            {isActive && (
              <PseudoBox
                w={bulletRange}
                h={bulletRange}
                borderRadius="30rem"
                bg="gray.400"
                opacity={0.5}
                zIndex={-1}
              />
            )}
          </Grid>
        );
      });
    return fTowers;
  };

  return <>{renderFieldTowers()}</>;
};

export default memo(FieldTowers);
