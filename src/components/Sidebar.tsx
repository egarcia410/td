import React, { memo } from "react";
import { useColorMode, useTheme, Stack } from "@chakra-ui/core";
import Controls from "./Controls";
import Details from "./Details";
import TabSection from "./TabSection";

const Sidebar = () => {
  const theme: any = useTheme();
  const { colorMode } = useColorMode();

  return (
    <Stack
      as="section"
      borderLeftColor={theme[colorMode].borderColor}
      borderLeftWidth="0.25rem"
      spacing="1rem"
    >
      <Controls p="0.5rem" />
      <Details />
      <TabSection />
    </Stack>
  );
};

export default memo(Sidebar);
