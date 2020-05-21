import React, { useState, memo, useEffect } from "react";
import { Flex, IconButton } from "@chakra-ui/core";
import { FaPlay, FaPause } from "react-icons/fa";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { GameStatusEnum } from "../types/game";
import { Game } from "../entities";

interface IPlayControlsProps {
  game: Game;
}

const PlayControls: React.FC<IPlayControlsProps> = ({ game }) => {
  const variantColor = useTypedSelector((state) => state.settings.variantColor);
  const [{ addListener, updateGameStatus, status }, update] = useState(game);

  useEffect(() => {
    addListener({
      valuesToWatch: ["status"],
      update,
    });
  }, [addListener]);

  const onToggleGameState = () => {
    const newGameStatus =
      status === GameStatusEnum.STARTED
        ? GameStatusEnum.PAUSED
        : GameStatusEnum.STARTED;
    updateGameStatus(newGameStatus);
  };

  return (
    <Flex justify="center">
      {/* <IconButton
        icon={FaBackward}
        variant="solid"
        aria-label="decrease game speed"
        variantColor={variantColor}
      /> */}
      <IconButton
        icon={status === GameStatusEnum.STARTED ? FaPause : FaPlay}
        onClick={() => onToggleGameState()}
        variant="solid"
        aria-label={
          status === GameStatusEnum.STARTED ? "Pause game" : "Start game"
        }
        m="0 0.5rem"
        variantColor={variantColor}
      />
      {/* <IconButton
        icon={FaForward}
        variant="solid"
        aria-label="increase game speed"
        variantColor={variantColor}
      /> */}
    </Flex>
  );
};

export default memo(PlayControls);
