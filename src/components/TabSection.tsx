import React from "react";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useTheme,
  useColorMode,
  Box,
} from "@chakra-ui/core";
import { MdGroupWork } from "react-icons/md";
import { GiLightBackpack } from "react-icons/gi";
import { FaStore } from "react-icons/fa";
import PartyTowers from "./PartyTowers";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Game } from "../entities";
import ContentContainer from "./ContentContainer";
import InventoryItems from "./InventoryItems";

interface ITabSectionProps {
  game: Game;
}

const TabSection: React.FC<ITabSectionProps> = ({ game }) => {
  const theme: any = useTheme();
  const { colorMode } = useColorMode();
  const { paletteNum } = theme[colorMode];
  const variantColor = useTypedSelector((state) => state.settings.variantColor);
  const vColor = `${variantColor}.${paletteNum}`;

  return (
    <Tabs isFitted variant="enclosed">
      <TabList borderColor="transparent">
        <Tab
          color={theme[colorMode].borderColor}
          borderBottomColor={`${theme[colorMode].borderColor}`}
          borderBottomWidth="0.15rem"
          _selected={{
            color: vColor,
            borderBottomColor: vColor,
          }}
        >
          <Box as={MdGroupWork} size="2rem" />
        </Tab>
        <Tab
          color={theme[colorMode].borderColor}
          borderBottomColor={theme[colorMode].borderColor}
          borderBottomWidth="0.15rem"
          _selected={{
            color: vColor,
            borderBottomColor: vColor,
          }}
        >
          <Box as={GiLightBackpack} size="2rem" />
        </Tab>
        <Tab
          color={theme[colorMode].borderColor}
          borderBottomColor={`${theme[colorMode].borderColor}`}
          borderBottomWidth="0.15rem"
          _selected={{
            color: vColor,
            borderBottomColor: vColor,
          }}
        >
          <Box as={FaStore} size="2rem" />
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <ContentContainer>
            <PartyTowers game={game} />
          </ContentContainer>
        </TabPanel>
        <TabPanel>
          <ContentContainer>
            <InventoryItems />
          </ContentContainer>
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TabSection;
