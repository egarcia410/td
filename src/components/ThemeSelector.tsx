import React, { useCallback, useMemo } from "react";
import {
  Popover,
  PopoverTrigger,
  IconButton,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Flex,
  Button,
  useTheme,
  useColorMode,
} from "@chakra-ui/core";
import { IoIosColorPalette } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { updateVariantColor } from "../store/settings/actions";

const ThemeSelector = () => {
  const theme: any = useTheme();
  const { colorMode } = useColorMode();
  const { paletteNum, inversePaletteNum } = theme[colorMode];
  const variantColor = useTypedSelector((state) => state.settings.variantColor);
  const dispatch = useDispatch();
  const vColor = `${variantColor}.${inversePaletteNum}`;

  const dispatchVariantColor = useCallback(
    (color: string) => dispatch(updateVariantColor(color)),
    [dispatch]
  );

  const renderVariantColors = useMemo(() => {
    return theme.variantColors.map((vColor: string) => {
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
    });
  }, [theme, dispatchVariantColor, paletteNum, variantColor]);

  return (
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
            {renderVariantColors}
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeSelector;
