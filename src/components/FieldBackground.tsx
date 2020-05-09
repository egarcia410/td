import React, { memo, useMemo, useCallback, useRef } from "react";
import { Grid, Box } from "@chakra-ui/core";
import { Game } from "../entities";

interface IFieldBackgroundProps {
  game: Game;
}

const FieldBackground: React.FC<IFieldBackgroundProps> = ({ game }) => {
  const fieldCellsRef = useRef<HTMLDivElement[]>([]);
  const fieldCellsBoundsRef = useRef<DOMRect[]>([]);

  const fieldCellRefCB = useCallback(
    (fieldCell: HTMLDivElement) => {
      fieldCellsBoundsRef.current = [
        ...fieldCellsBoundsRef.current,
        fieldCell.getBoundingClientRect(),
      ];
      fieldCellsRef.current = [...fieldCellsRef.current, fieldCell];
      if (fieldCellsRef.current.length === 100) {
        game.addFieldCells(fieldCellsRef.current, fieldCellsBoundsRef.current);
      }
    },
    [game]
  );

  const renderFieldCells = useMemo(() => {
    const fieldCells = [];
    for (let i = 0; i < 100; i++) {
      const color = game.pathWay.includes(i) ? "#FEB054" : "#00ffa2";
      fieldCells.push(
        <Box id={`field-bg-cell-${i}`} ref={fieldCellRefCB} key={i} bg={color}>
          {i}
        </Box>
      );
    }
    return fieldCells;
  }, [game, fieldCellRefCB]);

  return (
    <Grid
      templateColumns="repeat(10, 1fr)"
      templateRows="repeat(10, 1fr)"
      w="100%"
      h="100%"
    >
      {renderFieldCells}
    </Grid>
  );
};

export default memo(FieldBackground);
