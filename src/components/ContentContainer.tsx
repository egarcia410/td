import React from "react";
import { Grid } from "@chakra-ui/core";

const ContentContainer: React.FC = ({ children }) => {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap="0.25rem" padding="0.5rem">
      {children}
    </Grid>
  );
};

export default ContentContainer;
