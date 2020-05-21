import React, { memo, useCallback } from "react";
import { Flex, IconButton, useColorMode, useTheme } from "@chakra-ui/core";
import {
  IoMdSunny,
  IoMdMoon,
  IoIosExit,
  IoMdRefreshCircle,
} from "react-icons/io";
import { useTypedSelector } from "../hooks/useTypedSelector";
import ThemeSelector from "./ThemeSelector";
import { Game } from "../entities";
import { ResetTypeEnum } from "../types/game";

interface IOptionControlsProps {
  game: Game;
}

const OptionControls: React.FC<IOptionControlsProps> = ({ game }) => {
  const theme: any = useTheme();
  const { colorMode, toggleColorMode } = useColorMode();
  const { inversePaletteNum } = theme[colorMode];
  const variantColor = useTypedSelector((state) => state.settings.variantColor);
  const vColor = `${variantColor}.${inversePaletteNum}`;

  const onResetGame = useCallback(() => {
    game.reset(ResetTypeEnum.HARD);
  }, [game]);

  return (
    <Flex>
      <ThemeSelector />
      <IconButton
        aria-label="Color mode"
        onClick={toggleColorMode}
        icon={colorMode === "light" ? IoMdMoon : IoMdSunny}
        fontSize="1.25rem"
        variant="link"
        variantColor={variantColor}
        _hover={{
          bg: vColor,
        }}
      />
      <IconButton
        aria-label="Reset game"
        onClick={onResetGame}
        icon={IoMdRefreshCircle}
        fontSize="1.25rem"
        variant="link"
        variantColor={variantColor}
        _hover={{
          bg: vColor,
        }}
      />
      <IconButton
        aria-label="Exit game"
        icon={IoIosExit}
        fontSize="1.25rem"
        variant="link"
        variantColor={variantColor}
        _hover={{
          bg: vColor,
        }}
      />
    </Flex>
  );
};

export default memo(OptionControls);
