import React, { useState, useEffect, memo } from "react";
import styled from "@emotion/styled";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Flex,
  useTheme,
  useColorMode,
} from "@chakra-ui/core";
import { Game } from "../entities";
import { useTypedSelector } from "../hooks";
import { ResetTypeEnum } from "../types";

const BadgeImg = styled.img`
  width: 5rem;
  height: 5rem;
`;

interface IBadgeModalProps {
  game: Game;
}

const BadgeModal: React.FC<IBadgeModalProps> = ({ game }) => {
  const theme: any = useTheme();
  const { colorMode } = useColorMode();
  const { inversePaletteNum } = theme[colorMode];
  const variantColor = useTypedSelector((state) => state.settings.variantColor);
  const vColor = `${variantColor}.${inversePaletteNum}`;
  const [
    { addListener, displayModal, gymLeaders, currentGymLeaderIndex },
    update,
  ] = useState(game);

  const currentGymLeader = gymLeaders[currentGymLeaderIndex];
  const nextGymLeader = gymLeaders[currentGymLeaderIndex + 1];

  useEffect(() => {
    addListener({
      valuesToWatch: ["displayModal", "isGameOver"],
      update,
    });
  }, [addListener]);

  const onNextGymLeader = () => {
    game.nextGymLeader();
  };

  const onRestartJourney = () => {
    game.restartJourney();
  };

  return (
    <Modal closeOnOverlayClick={false} isCentered isOpen={displayModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center" color="gray.400">
          Obtained {currentGymLeader.badgeName} Badge
        </ModalHeader>
        <ModalBody as={Flex} pb={2} flexDirection="column" alignItems="center">
          <Text color="gray.400" mb="1rem" fontWeight="600">
            You defeated {currentGymLeader.name}!
          </Text>
          <BadgeImg src={currentGymLeader.badgeImg} />
        </ModalBody>
        <ModalFooter>
          {nextGymLeader ? (
            <Button
              variantColor={variantColor}
              width="100%"
              onClick={onNextGymLeader}
              _hover={{
                bg: vColor,
              }}
            >
              Next Gym Leader: {nextGymLeader.name}
            </Button>
          ) : (
            <Button
              variantColor={variantColor}
              width="100%"
              onClick={onRestartJourney}
              _hover={{
                bg: vColor,
              }}
            >
              Restart Journey
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default memo(BadgeModal);
