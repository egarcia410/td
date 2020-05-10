import React, {
  memo,
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  Grid,
  useColorMode,
  useTheme,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Box,
  PseudoBox,
  Text,
} from "@chakra-ui/core";
import Board from "./Board";
import Sidebar from "./Sidebar";
import { Game as G } from "../entities";
import { GameStatusEnum, RegionsEnum } from "../types/game";
import { TerrainEnum, IBaseTower } from "../types/tower";
import { regionStarters } from "../utils/starters";

const Game = () => {
  const theme: any = useTheme();
  const { colorMode } = useColorMode();
  const { bg } = theme[colorMode];
  const gameRef = useRef<G>(new G());
  const game = gameRef.current;
  const [{ status, partyTowers }, setGame] = useState<G>(game);
  const [starters, setStarters] = useState<IBaseTower[]>([]);
  const [selectedStarters, setSelectedStarters] = useState<number[]>([]);

  const thenRef = useRef(performance.now());
  const requestIdRef = useRef(0);

  useEffect(() => {
    // TODO: Update valuesToWatch to no trigger for partyTowers
    game.addListener({
      valuesToWatch: ["status", "partyTowers"],
      trigger: setGame,
    });
    // TODO: Base region & terrain type from user's selection
    setStarters(regionStarters.get(RegionsEnum.KANTO)!);
    game.initialize(TerrainEnum.LAND, RegionsEnum.KANTO);
  }, [game]);

  const handleResize = useCallback(() => {
    game.updateBoardBounds();
    game.updateFieldCellsBounds();
    game.updateGameStatus(GameStatusEnum.PAUSED);
  }, [game]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useLayoutEffect(() => {
    const animate = () => {
      const fps = 30;
      const interval = 1000 / fps;
      const now = performance.now();
      const delta = now - thenRef.current;
      const requestId = requestAnimationFrame(animate);
      requestIdRef.current = requestId;

      if (delta > interval) {
        thenRef.current = now - (delta % interval);
        game.animate();
      }
    };

    if (status === GameStatusEnum.STARTED) {
      animate();
    } else {
      cancelAnimationFrame(requestIdRef.current);
    }
  }, [status, game]);

  const onSelectStarter = (starter: IBaseTower) => {
    if (!selectedStarters.includes(starter.baseId)) {
      setSelectedStarters((prevVal) => [...prevVal, starter.baseId]);
      game.updatePartyTowers(starter);
    }
  };

  return (
    <>
      <Grid templateColumns="6fr 1fr" h="100vh" bg={bg}>
        <Board game={game} />
        <Sidebar game={game} />
      </Grid>

      <Modal
        closeOnOverlayClick={false}
        isCentered
        isOpen={partyTowers.size < 2}
      >
        <ModalOverlay />
        <ModalContent color="white" borderRadius="0.25rem">
          <ModalHeader textAlign="center" color="gray.400">
            <Text fontSize="xl">Select 2</Text>
          </ModalHeader>
          <ModalBody pb={6}>
            <Grid
              templateColumns="repeat(3, 1fr)"
              gap="1rem"
              templateRows="8rem"
            >
              {starters!.map((starter, id) => {
                const { component } = starter;
                const isSelected = selectedStarters.includes(starter.baseId);
                return (
                  <PseudoBox
                    as="button"
                    onClick={() => onSelectStarter(starter)}
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
    </>
  );
};

export default memo(Game);
