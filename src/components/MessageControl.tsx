import React, { useEffect, useState, memo } from "react";
import { useToast } from "@chakra-ui/core";
import { Game } from "../entities";
import GameModal from "./GameModal";

interface IMessageControlProps {
  game: Game;
}

const MessageControl: React.FC<IMessageControlProps> = ({ game }) => {
  const [{ addListener, message }, update] = useState(game);
  const toast = useToast();

  useEffect(() => {
    addListener({
      valuesToWatch: ["message"],
      update,
    });
  }, [addListener]);

  useEffect(() => {
    if (message) {
      const status = message.status === "success" ? "success" : "info";
      toast({
        position: "bottom-right",
        title: message.title,
        description: message.description,
        status: status,
        duration: 2500,
        isClosable: true,
      });
    }
  }, [message, toast]);

  return (
    <>
      <GameModal game={game} />
    </>
  );
};

export default memo(MessageControl);
