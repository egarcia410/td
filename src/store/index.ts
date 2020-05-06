import { combineReducers, createStore } from "redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import settingsReducer, { ISettingsState } from "./settings/reducers";

export interface RootState {
  settings: ISettingsState;
}

const rootReducer = combineReducers({
  settings: settingsReducer,
});

const store = createStore(rootReducer);

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
