import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import defaultInitialState from "@state/store/initialState";
import { RootState } from "@state/store/configureStore";
import { ArtItem } from "@model/index";
import { getSearchParams, GetArtworksResponse } from "@api/index";
import { TThunkAPI } from "../types";

export const getArtworks = createAsyncThunk<
    GetArtworksResponse,
    void,
    TThunkAPI
>("artworks/get", async (_, { extra: { apiService } }) => {
    const searchResults = await apiService.searchArtworks(getSearchParams());
    const artworkIDs = searchResults.data.map((result) => result.id);

    return apiService.getArtworks({
        ids: artworkIDs,
    });
});

const extractData = (payload: GetArtworksResponse) => {
    return payload.data.map(({ id, title, artist_title, image_id }, i) => {
        return {
            id,
            title,
            artist_title,
            image_id,
            tileIndex: i,
        };
    });
};

export interface ArtworksState {
    data: ArtItem[];
    loading: boolean;
}

const initialState = defaultInitialState.artworks as ArtworksState;

export const artworksSlice = createSlice({
    name: "artworks",
    initialState,
    reducers: {},
    extraReducers: {
        [getArtworks.pending.toString()]: (state) => {
            state.loading = true;
        },
        [getArtworks.fulfilled.toString()]: (state, action) => {
            state.data = extractData(action.payload);
            state.loading = false;
        },
        [getArtworks.rejected.toString()]: (state) => {
            state.loading = false;
        },
    },
});

export const selectArtworks = (state: RootState) => state.artworks;

export const selectArtworksData = (state: RootState) => state.artworks.data;

export const artworksReducer = artworksSlice.reducer;
