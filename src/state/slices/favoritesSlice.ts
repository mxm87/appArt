import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { RootState } from "@state/store/configureStore";
import { FavoriteItem } from "@model/index";
import defaultInitialState from "@state/store/initialState";

export interface FavoritesState {
    ids: number[];
    entities: {};
}

const initialState = defaultInitialState.favorites as FavoritesState;

const favoritesAdapter = createEntityAdapter<FavoriteItem>({
    selectId: (item) => item.id,
});

export const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addItem: favoritesAdapter.addOne,
        removeItem: favoritesAdapter.removeOne,
    },
});

export const favoritesSelector = favoritesAdapter.getSelectors<RootState>(
    (state) => state.favorites
);

export const { addItem, removeItem } = favoritesSlice.actions;

export const favoritesReducer = favoritesSlice.reducer;
