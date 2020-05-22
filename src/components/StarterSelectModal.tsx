import React, { useState, useEffect, memo } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Text,
  ModalBody,
  Grid,
  PseudoBox,
  Box,
} from "@chakra-ui/core";
import { Game } from "../entities";
import { IBaseTower } from "../types/IBaseTower";

interface IStarterSelectModalProps {
  game: Game;
}

const StarterSelectModal: React.FC<IStarterSelectModalProps> = ({ game }) => {
  const [
    { addListener, addPartyTower, partyTowers, starters },
    update,
  ] = useState(game);

  useEffect(() => {
    addListener({
      valuesToWatch: ["partyTowers"],
      update,
    });
  }, [addListener]);

  const onSelectStarter = (
    { baseId, level }: IBaseTower,
    isSelected: boolean
  ) => {
    if (!isSelected) {
      addPartyTower(baseId, level);
    }
  };

  return (
    <Modal closeOnOverlayClick={false} isCentered isOpen={partyTowers.size < 2}>
      <ModalOverlay />
      <ModalContent color="white" borderRadius="0.25rem">
        <ModalHeader textAlign="center" color="gray.400">
          <Text fontSize="xl">Select 2</Text>
        </ModalHeader>
        <ModalBody pb={6}>
          <Grid templateColumns="repeat(3, 1fr)" gap="1rem" templateRows="8rem">
            {starters.map((starter, id) => {
              const { component } = starter;
              let isSelected = false;
              partyTowers.forEach((partyTower) => {
                isSelected = partyTower.baseId === starter.baseId;
              });
              return (
                <PseudoBox
                  as="button"
                  onClick={() => onSelectStarter(starter, isSelected)}
                  key={id}
                  p="1rem"
                  _hover={{
                    bg: "gray.400",
                    border: "0.15rem solid #F6F9FC",
                  }}
                  bg={isSelected ? "gray.400" : ""}
                  border={isSelected ? "0.15rem solid #F6F9FC" : ""}
                  cursor={isSelected ? "not-allowed" : ""}
                  borderRadius="0.25rem"
                >
                  <Box as={component} />
                </PseudoBox>
              );
            })}
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default memo(StarterSelectModal);
