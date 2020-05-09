import { Dispatch } from "react";

export enum GameStatusEnum {
  IDLE = "IDLE",
  STARTED = "STARTED",
  PAUSED = "PAUSED",
  COMPLETED_WAVE = "COMPLETED_WAVE",
  FAIL_GAME_OVER = "FAIL_GAME_OVER",
  SUCCESS_GAME_OVER = "SUCCESS_GAME_OVER",
}

export enum ResetTypeEnum {
  SOFT = "SOFT",
  HARD = "HARD",
}

export interface IListener {
  valuesToWatch: string[];
  trigger: Dispatch<React.SetStateAction<any>>;
}

export enum RegionsEnum {
  "KANTO" = "KANTO",
}
