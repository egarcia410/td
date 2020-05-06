import { SettingsActionTypes, SettingsActionsUnion } from "./actionTypes";

export interface ISettingsState {
  variantColor: string;
}

export const initialState: ISettingsState = {
  variantColor: "cyan",
};

const reducer = (state = initialState, action: SettingsActionsUnion) => {
  switch (action.type) {
    case SettingsActionTypes.UPDATE_VARIANT_COLOR: {
      return { ...state, variantColor: action.variantColor };
    }
    default: {
      return { ...state };
    }
  }
};

export default reducer;
