import React from "react";
import { Grid, Box, Text } from "@chakra-ui/core";
import Pokeball from "../items/pokeball.png";
import HealthPotion from "../items/health-potion.png";

const InventoryItems = () => {
  const onDragStart = (event: any) => {
    event.dataTransfer.setData("text/plain", event.target.id);
  };

  return (
    <Grid
      key="pokeball"
      backgroundColor="gray.400"
      padding="0.15rem"
      borderRadius="0.25rem"
      border="0.15rem solid #9BA9BB"
      alignContent="center"
      justifyContent="center"
    >
      <Box
        draggable
        onDragStart={onDragStart}
        cursor="pointer"
        padding="0.15rem"
        w="6rem"
        h="6rem"
      >
        <img id="pokeball" src={Pokeball} alt="pokeball" />
      </Box>
      <Box color="white" textAlign="center">
        <Text>Pokeball</Text>
      </Box>
    </Grid>
  );
};

export default InventoryItems;
