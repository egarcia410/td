import { SettingsActionTypes, SettingsActionsUnion } from "./actionTypes";

export const updateVariantColor = (
  variantColor: string
): SettingsActionsUnion => {
  return {
    type: SettingsActionTypes.UPDATE_VARIANT_COLOR,
    variantColor,
  };
};
