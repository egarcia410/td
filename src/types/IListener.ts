import { Dispatch } from "react";

export interface IListener {
  valuesToWatch: string[];
  update: Dispatch<React.SetStateAction<any>>;
}
