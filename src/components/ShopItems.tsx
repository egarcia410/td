import React, { memo, useState, useEffect } from "react";
import { Grid, Box, Text, Flex, Tooltip } from "@chakra-ui/core";
import { Game } from "../entities";
import { items } from "../utils";
import { TerrainEnum } from "../types/tower";

interface IShopItemsProps {
  game: Game;
}

const ShopItems: React.FC<IShopItemsProps> = ({ game }) => {
  const [
    { addListener, currentWaveNumber, terrainColors, terrain },
    update,
  ] = useState(game);

  useEffect(() => {
    addListener({
      valuesToWatch: ["currentWaveNumber", "terrainColors"],
      update,
    });
  }, [addListener]);

  const onPurchaseItem = (id: number, item: string, price: number) => {
    game.purchaseItem(id, item, price);
  };

  const renderShopItems = () => {
    const itms: any[] = [];
    items.forEach(({ id, item, img, price, description }) => {
      const adjustedPrice = price + currentWaveNumber * 5;
      let itemColor: string = "";
      if (typeof img !== "string") {
        if (terrain === TerrainEnum.WATER) {
          itemColor =
            item === "Land Block"
              ? terrainColors.other.secondary
              : item === "Water Block"
              ? terrainColors.main.secondary
              : "#FEFB54";
        } else {
          itemColor =
            item === "Land Block"
              ? terrainColors.main.secondary
              : item === "Water Block"
              ? terrainColors.other.secondary
              : "#FEFB54";
        }
      }
      itms.push(
        <Tooltip
          key={item}
          label={description}
          placement="bottom"
          aria-label={description}
        >
          <Grid
            backgroundColor="gray.400"
            padding="0.15rem"
            borderRadius="0.25rem"
            border="0.15rem solid #9BA9BB"
            alignContent="center"
            justifyContent="center"
          >
            <Flex
              cursor="pointer"
              justifyContent="center"
              padding="0.15rem"
              w="6rem"
              draggable="false"
            >
              {typeof img === "string" ? (
                <img
                  draggable="false"
                  id={item}
                  src={img}
                  alt={description}
                  onClick={() => onPurchaseItem(id, item, adjustedPrice)}
                />
              ) : (
                <Box
                  as={img}
                  draggable="false"
                  id={item}
                  w="100%"
                  h="100%"
                  color={itemColor}
                  onClick={() => onPurchaseItem(id, item, adjustedPrice)}
                />
              )}
            </Flex>
            <Box color="white" textAlign="center">
              <Text>{item}</Text>
              <Text>${adjustedPrice}</Text>
            </Box>
          </Grid>
        </Tooltip>
      );
    });
    return itms;
  };

  return <>{renderShopItems()}</>;
};

export default memo(ShopItems);
