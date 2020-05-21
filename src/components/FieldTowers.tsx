import React, { memo, useState, useEffect } from "react";
import { Box, Grid, PseudoBox } from "@chakra-ui/core";
import { Game } from "../entities";

interface IFieldTowersProps {
  game: Game;
}

const FieldTowers: React.FC<IFieldTowersProps> = ({ game }) => {
  const [{ addListener, fieldTowers }, update] = useState(game);
  const [isRangeActive, setIsRangeActive] = useState<Map<string, boolean>>(
    new Map()
  );

  useEffect(() => {
    addListener({
      valuesToWatch: ["fieldTowers"],
      update,
    });
  }, [addListener]);

  const onDisplayRange = (id: string) => {
    const newRangeActive = new Map(isRangeActive);
    const isActive = newRangeActive.get(id) || false;
    newRangeActive.set(id, !isActive);
    setIsRangeActive(newRangeActive);
  };

  const renderFieldTowers = () => {
    const fTowers: any[] = [];
    fieldTowers.forEach(({ partyTowerRef, cellRef }, index) => {
      const { component, range, id } = partyTowerRef;
      const {
        width,
        height,
        left,
        top,
      } = cellRef.cellEl.getBoundingClientRect();
      const extendedRange = width * range;
      const bulletRange = (width / 2 + extendedRange) * 2;
      const isActive = isRangeActive.get(id) || false;
      fTowers.push(
        <Grid
          id={`${index}`}
          key={index}
          position="absolute"
          w={`${width}px`}
          h={`${height}px`}
          top={`${top}px`}
          left={`${left}px`}
          justifyContent="center"
          alignContent="center"
        >
          <Box
            as={component}
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
