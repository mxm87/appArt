import AsyncStorage from "@react-native-async-storage/async-storage";
import { Api } from "@api/api";
import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
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
import { artworksReducer, ArtworksState } from "@state/slices/artworksSlice";
import { favoritesReducer, FavoritesState } from "@state/slices/favoritesSlice";

export type RootState = {
    artworks: ArtworksState;
    favorites: FavoritesState;
};
const apiService = Api.getInstance();

const customMiddlewares = [
    /* other middlewares */
];

const persistConfig = {
    key: "root",
    version: 1,
    storage: AsyncStorage,
};

const combinedReducer: Reducer = combineReducers({
    artworks: artworksReducer,
    favorites: favoritesReducer,
});

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
    preloadedState: initialState,
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
        const defaultMiddleware = getDefaultMiddleware({
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
                extraArgument: { apiService },
            },
        });
        type DefaultMiddleware = typeof defaultMiddleware;
        return defaultMiddleware.concat(
            ...customMiddlewares
        ) as DefaultMiddleware;
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof combinedReducer>
export const persistor = persistStore(store);

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
