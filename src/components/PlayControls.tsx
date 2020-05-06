import React, { useState } from "react";
import { Flex, IconButton } from "@chakra-ui/core";
import { FaPlay, FaPause, FaBackward, FaForward } from "react-icons/fa";
import { useTypedSelector } from "../store";

const PlayControls = () => {
  const [hasStart, setHasStart] = useState(false);
  const variantColor = useTypedSelector((state) => state.settings.variantColor);

  const onToggleGameState = () => {
    setHasStart((val) => !val);
  };

  return (
    <Flex justify="center">
      <IconButton
        icon={FaBackward}
        variant="solid"
        aria-label="decrease game speed"
        variantColor={variantColor}
      />
      <IconButton
        icon={hasStart ? FaPause : FaPlay}
        onClick={() => onToggleGameState()}
        variant="solid"
        aria-label={hasStart ? "Pause game" : "Start game"}
        m="0 0.5rem"
        variantColor={variantColor}
      />
      <IconButton
        icon={FaForward}
        variant="solid"
        aria-label="increase game speed"
        variantColor={variantColor}
      />
    </Flex>
  );
};

export default PlayControls;
