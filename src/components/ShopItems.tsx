import React, { memo, useState, useEffect } from "react";
import { Grid, Box, Text, Flex, Tooltip } from "@chakra-ui/core";
import { GiCube, GiBulldozer } from "react-icons/gi";
import { IconType } from "react-icons/lib/cjs";
import { Game } from "../entities";
import Pokeball from "../items/pokeball.png";
import HealthPotion from "../items/health-potion.png";
import Pokedoll from "../items/poke-doll.png";

interface IItem {
  item: string;
  img: string | IconType;
  price: number;
  description: string;
}

const items: IItem[] = [
  {
    item: "Pokeball",
    img: Pokeball,
    price: 100,
    description: "A device for catching Pokémon",
  },
  {
    item: "Health Potion",
    img: HealthPotion,
    price: 100,
    description: "Restores 20 Health. NOT DRAGGABLE",
  },
  {
    item: "Poke Doll",
    img: Pokedoll,
    price: 100,
    description: "Remove a Pokémon from the field",
  },
  {
    item: "Bull Dozer",
    img: GiBulldozer,
    price: 100,
    description: "Remove an obstacle from the field",
  },
  {
    item: "Water Block",
    img: GiCube,
    price: 100,
    description: "Allows placement of Water based Pokémon",
  },
  {
    item: "Land Block",
    img: GiCube,
    price: 100,
    description: "Allows placement of Land based Pokémon",
  },
];

interface IShopItemsProps {
  game: Game;
}

const ShopItems: React.FC<IShopItemsProps> = ({ game }) => {
  const [{ addListener, currentWaveNumber, terrainColors }, update] = useState(
    game
  );

  useEffect(() => {
    addListener({
      valuesToWatch: ["currentWaveNumber", "terrainColors"],
      update,
    });
  }, [addListener]);

  const onPurchaseItem = (item: string, price: number) => {
    game.purchaseItem(item, price);
  };

  const renderShopItems = () => {
    return items.map(({ item, img, price, description }) => {
      const adjustedPrice = price + currentWaveNumber * 5;
      let itemColor: string = "";
      if (typeof img !== "string") {
        itemColor =
          item === "Land Block"
            ? terrainColors.main.secondary
            : item === "Water Block"
            ? terrainColors.other.secondary
            : "#FEFB54";
      }
      return (
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
              h="6rem"
              draggable="false"
            >
              {typeof img === "string" ? (
                <img
                  draggable="false"
                  id={item}
                  src={img}
                  alt={item}
                  onClick={() => onPurchaseItem(item, adjustedPrice)}
                />
              ) : (
                <Box
                  as={img}
                  draggable="false"
                  id={item}
                  w="100%"
                  h="100%"
                  color={itemColor}
                  onClick={() => onPurchaseItem(item, adjustedPrice)}
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
  };

  return <>{renderShopItems()}</>;
};

export default memo(ShopItems);
