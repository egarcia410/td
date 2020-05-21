import React, {
  memo,
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Grid, useColorMode, useTheme } from "@chakra-ui/core";
import Board from "./Board";
import Sidebar from "./Sidebar";
import { Game as G } from "../entities";
import { GameStatusEnum, RegionsEnum } from "../types/game";
import { TerrainEnum } from "../types/tower";
import StarterSelectModal from "./StarterSelectModal";

const Game = () => {
  const theme: any = useTheme();
  const { colorMode } = useColorMode();
  const { bg } = theme[colorMode];
  const gameRef = useRef<G>(new G(TerrainEnum.LAND, RegionsEnum.KANTO));
  const game = gameRef.current;
  const [
    {
      addListener,
      initializeGame,
      dispatch,
      updateGameStatus,
      animations,
      status,
    },
    update,
  ] = useState(game);

  useEffect(() => {
    initializeGame();
    addListener({
      valuesToWatch: ["status"],
      update,
    });
  }, [addListener, initializeGame]);

  const thenRef = useRef(performance.now());
  const requestIdRef = useRef(0);

  const handleResize = useCallback(() => {
    updateGameStatus(GameStatusEnum.PAUSED);
    dispatch(["fieldTowers", "enemies"]);
  }, [updateGameStatus, dispatch]);

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
        animations();
      }
    };

    if (status === GameStatusEnum.STARTED) {
      animate();
    } else {
      cancelAnimationFrame(requestIdRef.current);
    }
  }, [status, animations]);

  return (
    <>
      <Grid templateColumns="6fr 1fr" h="100vh" bg={bg}>
        <Board game={game} />
        <Sidebar game={game} />
      </Grid>
      <StarterSelectModal game={game} />
    </>
  );
};

export default memo(Game);
