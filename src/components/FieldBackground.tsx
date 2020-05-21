import React, { memo, useMemo, useCallback, useState, useEffect } from "react";
import { Grid, Box } from "@chakra-ui/core";
import { Game } from "../entities";

interface IFieldBackgroundProps {
  game: Game;
}

const FieldBackground: React.FC<IFieldBackgroundProps> = ({ game }) => {
  const [{ addListener, addFieldCellElement }, update] = useState(game);

  useEffect(() => {
    addListener({
      valuesToWatch: ["path"],
      update,
    });
  }, [addListener]);

  const fieldCellRefCB = useCallback(
    (fieldCell: HTMLDivElement) => {
      addFieldCellElement(fieldCell);
    },
    [addFieldCellElement]
  );

  const renderFieldCells = useMemo(() => {
    const fieldCells: any[] = [];
    for (let i = 0; i < 100; i++) {
      const key = `field-bg-cell-${i}`;
      fieldCells.push(<Box id={key} key={key} ref={fieldCellRefCB} />);
    }
    return fieldCells;
  }, [fieldCellRefCB]);

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
