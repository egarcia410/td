import React, { memo, useEffect, useState } from "react";
import { Grid, Box, Text } from "@chakra-ui/core";
import { Game } from "../entities";
import Pokeball from "../items/pokeball.png";
import HealthPotion from "../items/health-potion.png";

interface IInventoryItemsProps {
  game: Game;
}

const InventoryItems: React.FC<IInventoryItemsProps> = ({ game }) => {
  const [{ addListener, inventory }, update] = useState(game);

  useEffect(() => {
    addListener({
      valuesToWatch: ["inventory"],
      update,
    });
  }, [addListener]);

  const onDragStart = (event: any) => {
    event.dataTransfer.setData("text/plain", event.target.id);
  };

  const renderInventoryItems = () => {
    const inventoryItems: any[] = [];
    inventory.forEach((quantity, name) => {
      const isDraggable = ["Pokeball", "Pokedoll"].includes(name);
      inventoryItems.push(
        <Grid
          key={name}
          backgroundColor="gray.400"
          padding="0.15rem"
          borderRadius="0.25rem"
          border="0.15rem solid #9BA9BB"
          alignContent="center"
          justifyContent="center"
        >
          <Box
            draggable={isDraggable}
            onDragStart={onDragStart}
            cursor="pointer"
            padding="0.15rem"
            w="6rem"
            h="6rem"
          >
            <img id={name} src={Pokeball} alt={name} />
          </Box>
          <Box color="white" textAlign="center">
            <Text>{name}</Text>
            <Text>Quantity: {quantity}</Text>
          </Box>
        </Grid>
      );
    });
    return inventoryItems;
  };

  return <>{renderInventoryItems()}</>;
};

export default memo(InventoryItems);
