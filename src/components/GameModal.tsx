import React, { memo } from "react";
import { Game } from "../entities";
import BadgeModal from "./BadgeModal";

interface IGameModalProps {
  game: Game;
}

const GameModal: React.FC<IGameModalProps> = ({ game }) => {
  return <BadgeModal game={game} />;
};

export default memo(GameModal);
