import AsyncStorage from "@react-native-async-storage/async-storage";
import { Api } from "@api/api";
import firestore from "@react-native-firebase/firestore";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import initialState from "@state/store/initialState";
import { authReducer } from "@state/slices/authSlice";
import { artworksReducer } from "@state/slices/artworksSlice";
import { favoritesReducer } from "@state/slices/favoritesSlice";

const apiService = Api.getInstance();
const dbRef = firestore().collection("favorites");

const customMiddlewares = [
    /* other middlewares */
];

const persistConfig = {
    key: "root",
    version: 1,
    storage: AsyncStorage,
};

const combinedReducer = combineReducers({
    auth: authReducer,
    artworks: artworksReducer,
    favorites: favoritesReducer,
});

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
    preloadedState: initialState,
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
            thunk: {
                extraArgument: { apiService, dbRef },
            },
        }).concat(customMiddlewares),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof combinedReducer>;
export type AppDispatch = typeof store.dispatch;
