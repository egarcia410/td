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
import { FaStore, FaTrophy } from "react-icons/fa";
import { useTypedSelector } from "../hooks";
import { Game } from "../entities";
import PartyTowers from "./PartyTowers";
import ContentContainer from "./ContentContainer";
import InventoryItems from "./InventoryItems";
import ShopItems from "./ShopItems";
import Badges from "./Badges";

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
        <Tab
          color={theme[colorMode].borderColor}
          borderBottomColor={`${theme[colorMode].borderColor}`}
          borderBottomWidth="0.15rem"
          _selected={{
            color: vColor,
            borderBottomColor: vColor,
          }}
        >
          <Box as={FaTrophy} size="2rem" />
        </Tab>
      </TabList>
      <TabPanels h="75vh" overflow="auto">
        <TabPanel>
          <ContentContainer>
            <PartyTowers game={game} />
          </ContentContainer>
        </TabPanel>
        <TabPanel>
          <ContentContainer>
            <InventoryItems game={game} />
          </ContentContainer>
        </TabPanel>
        <TabPanel>
          <ContentContainer>
            <ShopItems game={game} />
          </ContentContainer>
        </TabPanel>
        <TabPanel>
          <ContentContainer>
            <Badges game={game} />
          </ContentContainer>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TabSection;
