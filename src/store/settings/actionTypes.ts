export enum SettingsActionTypes {
  UPDATE_VARIANT_COLOR = "UPDATE_VARIANT_COLOR",
}

export interface UpdateVariantColor {
  type: SettingsActionTypes.UPDATE_VARIANT_COLOR;
  variantColor: string;
}

export type SettingsActionsUnion = UpdateVariantColor;
