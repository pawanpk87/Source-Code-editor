import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import darkModeReducer from "./slices/darkModeSlice";
import userReducer from "./slices/userSlice";

const persistConfig = {
  key: "root",
  storage,
};

const _combineReducers = combineReducers({
  user: userReducer,
  darkMode: darkModeReducer,
});

const persistedReducer = persistReducer(persistConfig, _combineReducers);
export default persistedReducer;
