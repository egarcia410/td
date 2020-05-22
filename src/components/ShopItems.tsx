import React, { memo } from "react";
import { Grid, Box, Text, Flex } from "@chakra-ui/core";
import { Game } from "../entities";
import Pokeball from "../items/pokeball.png";
import Health from "../items/health-potion.png";

interface IItem {
  item: string;
  img: string;
  price: number;
}

const items: IItem[] = [
  { item: "Pokeball", img: Pokeball, price: 100 },
  { item: "Health", img: Health, price: 100 },
  { item: "Water Block", img: Pokeball, price: 100 },
  { item: "Land Block", img: Pokeball, price: 100 },
];

interface IShopItemsProps {
  game: Game;
}

const ShopItems: React.FC<IShopItemsProps> = ({ game }) => {
  const onPurchaseItem = (item: string, price: number) => {
    game.purchaseItem(item, price);
  };

  const renderShopItems = () => {
    return items.map(({ item, img, price }) => {
      return (
        <Grid
          key={item}
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
          >
            <img
              id={item}
              src={img}
              alt={item}
              onClick={() => onPurchaseItem(item, price)}
            />
          </Flex>
          <Box color="white" textAlign="center">
            <Text>{item}</Text>
            <Text>${price}</Text>
          </Box>
        </Grid>
      );
    });
  };

  return <>{renderShopItems()}</>;
};

export default memo(ShopItems);
