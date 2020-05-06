import React, { memo, useCallback } from "react";
import {
  Flex,
  IconButton,
  useColorMode,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  useTheme,
  Button,
} from "@chakra-ui/core";
import {
  IoIosColorPalette,
  IoMdSunny,
  IoMdMoon,
  IoIosExit,
  IoMdRefreshCircle,
} from "react-icons/io";
import { useDispatch } from "react-redux";
import { updateVariantColor } from "../store/settings/actions";
import { useTypedSelector } from "../store";

const OptionControls = () => {
  const theme: any = useTheme();
  const { colorMode, toggleColorMode } = useColorMode();
  const { paletteNum, inversePaletteNum } = theme[colorMode];
  const variantColor = useTypedSelector((state) => state.settings.variantColor);
  const dispatch = useDispatch();
  const vColor = `${variantColor}.${inversePaletteNum}`;

  const dispatchVariantColor = useCallback(
    (color: string) => dispatch(updateVariantColor(color)),
    [dispatch]
  );

  return (
    <Flex justify="flex-end">
      <Popover>
        <PopoverTrigger>
          <IconButton
            aria-label="Color picker"
            icon={IoIosColorPalette}
            fontSize="1.25rem"
            variant="link"
            variantColor={variantColor}
            _hover={{
              bg: vColor,
            }}
          />
        </PopoverTrigger>
        <PopoverContent zIndex={4} width="10rem">
          <PopoverArrow bg={theme[colorMode].bg} />
          <PopoverBody bg={theme[colorMode].bg}>
            <Flex direction="row" wrap="wrap" w="100%" justify="space-between">
              {theme.variantColors.map((vColor: string) => {
                return (
                  <Button
                    key={vColor}
                    onClick={() => dispatchVariantColor(vColor)}
                    size="sm"
                    isActive={vColor === variantColor}
                    variantColor={vColor}
                    borderColor={theme.colors[vColor][paletteNum]}
                    borderWidth="0.15rem"
                    m="0.25rem"
                  >
                    {}
                  </Button>
                );
              })}
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
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
