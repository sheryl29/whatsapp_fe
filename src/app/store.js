import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import userSlice from "../features/userSlice";
import storage from "redux-persist/lib/storage";
import createFilter from "redux-persist-transform-filter"
import chatSlice from "../features/chatSlice";

//save user only filter
const saveUserOnlyFilter = createFilter("user", ["user"]);

//persist config
const persistConfig ={
    key: "user",
    storage,
    whitelist: ["user"],
    transforms: [saveUserOnlyFilter]
};

const rootReducer = combineReducers({
    user: userSlice,
    chat: chatSlice,
});
const persistedReducer=persistReducer(persistConfig, rootReducer);

export const store=configureStore({
    reducer: persistedReducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: true,
});

export const persistor = persistStore(store);