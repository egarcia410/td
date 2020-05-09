import { combineReducers, createStore } from "redux";
import settingsReducer, { ISettingsState } from "./settings/reducer";

export interface RootState {
  settings: ISettingsState;
}

const rootReducer = combineReducers({
  settings: settingsReducer,
});

const store = createStore(rootReducer);

export default store;
