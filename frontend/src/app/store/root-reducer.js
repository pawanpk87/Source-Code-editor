import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import darkModeReducer from "./slices/darkModeSlice";
import userReducer from "./slices/userSlice";
import filesReducer from "./slices/filesSlice";

const persistConfig = {
  key: "root",
  storage,
};

const _combineReducers = combineReducers({
  user: userReducer,
  darkMode: darkModeReducer,
  files: filesReducer,
});

const persistedReducer = persistReducer(persistConfig, _combineReducers);
export default persistedReducer;
