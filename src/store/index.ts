import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer, { UserStateType } from "./userReducer";
import storage from "redux-persist/es/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
// import undoable, { excludeAction, StateWithHistory } from 'redux-undo'

// import componentsReducer, { ComponentsStateType } from './componentsReducer'
// import pageInfoReducer, { PageInfoType } from './pageInfoReducer'

/**
 * @description store 的定義類型
 * */
export type StateType = {
  user: UserStateType;
  // // components: ComponentsStateType
  // components: StateWithHistory<ComponentsStateType> // 增加了 undo
  // pageInfo: PageInfoType
};

// const store = configureStore({
//   reducer: {
//     user: userReducer,
//     // 没有 undo
//     components: componentsReducer,

//     增加了 undo
//     components: undoable(componentsReducer, {
//       limit: 20, // 限制 undo 20 步
//       // 屏蔽不重要的 action
//       filter: excludeAction([
//         'components/resetComponents',
//         'components/changeSelectedId',
//         'components/selectPrevComponent',
//         'components/selectNextComponent',
//       ]),
//     }),
//     pageInfo: pageInfoReducer,
//   },
// });

// export default store;

//================================持久化儲存======================================

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // 需要持久化的 reducer
};

const rootReducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);

export default store;
