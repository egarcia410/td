import React, { useState, useEffect } from "react";
import { Grid, Box, Text } from "@chakra-ui/core";
import { Game } from "../entities";

interface IBadgesProps {
  game: Game;
}

const Badges: React.FC<IBadgesProps> = ({ game }) => {
  const [{ addListener, badgeInventory }, update] = useState(game);

  useEffect(() => {
    addListener({
      valuesToWatch: ["badgeInventory"],
      update,
    });
  }, [addListener]);

  const renderBadges = () => {
    const badges: any[] = [];
    badgeInventory.forEach((badgeImg, badgeName) => {
      badges.push(
        <Grid
          key={`${badgeName}-badge`}
          backgroundColor="gray.400"
          padding="0.15rem"
          borderRadius="0.25rem"
          border="0.15rem solid #9BA9BB"
          justifyContent="center"
        >
          <Box
            cursor="pointer"
            padding="0.15rem"
            w="90%"
            h="100%"
            margin="auto"
          >
            <img src={badgeImg} alt={`${badgeName} badge`} />
          </Box>
          <Box color="white" textAlign="center">
            <Text>{badgeName}</Text>
          </Box>
        </Grid>
      );
    });
    return badges.length ? (
      badges
    ) : (
      <Text gridColumn="1 / span 2" textAlign="center" color="gray.400">
        You have no badges!
      </Text>
    );
  };

  return <>{renderBadges()}</>;
};

export default Badges;
