import React, { memo, useEffect, useState } from "react";
import { Grid, Box, Text, Flex } from "@chakra-ui/core";
import { Game } from "../entities";
import { items } from "../utils";
import { TerrainEnum } from "../types";

interface IInventoryItemsProps {
  game: Game;
}

const InventoryItems: React.FC<IInventoryItemsProps> = ({ game }) => {
  const [{ addListener, inventory, terrainColors, terrain }, update] = useState(
    game
  );

  useEffect(() => {
    addListener({
      valuesToWatch: ["inventory", "terrainColors"],
      update,
    });
  }, [addListener]);

  const onDragStart = (event: any) => {
    event.dataTransfer.setData("text/plain", event.target.id);
  };

  const onConsumeItem = (
    id: number,
    isDraggable: boolean,
    quantity: number
  ) => {
    const consumedItem = items.get(id)!;
    if (!isDraggable && quantity > 0) {
      if (consumedItem.item === "Health Potion") {
        game.useHealthPotion();
      }
    }
  };

  const renderInventoryItems = () => {
    const inventoryItems: any[] = [];
    inventory.forEach((quantity, id) => {
      const inventoryItem = items.get(id)!;
      const { isDraggable, item, img, color } = inventoryItem;
      let itemColor: string = "";
      if (typeof img !== "string") {
        if (terrain === TerrainEnum.WATER) {
          itemColor =
            item === "Land Block"
              ? terrainColors.other.secondary
              : item === "Water Block"
              ? terrainColors.main.secondary
              : color!;
        } else {
          itemColor =
            item === "Land Block"
              ? terrainColors.main.secondary
              : item === "Water Block"
              ? terrainColors.other.secondary
              : color!;
        }
      }
      inventoryItems.push(
        <Grid
          key={`iventory-item-${id}`}
          backgroundColor="gray.400"
          padding="0.15rem"
          borderRadius="0.25rem"
          border="0.15rem solid #9BA9BB"
          alignContent="center"
          justifyContent="center"
        >
          <Flex
            justifyContent="center"
            cursor="pointer"
            padding="0.15rem"
            w="6rem"
            id={`${id}`}
            draggable={isDraggable}
            onDragStart={onDragStart}
          >
            {typeof img === "string" ? (
              <img
                id={`${id}`}
                src={img}
                alt={item}
                onClick={() => onConsumeItem(id, isDraggable, quantity)}
              />
            ) : (
              <Box
                as={img}
                w="100%"
                h="100%"
                color={itemColor}
                onClick={() => onConsumeItem(id, isDraggable, quantity)}
              />
            )}
          </Flex>
          <Box color="white" textAlign="center">
            <Text>{item}</Text>
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
