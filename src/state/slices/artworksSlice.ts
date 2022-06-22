import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import defaultInitialState from "@state/store/initialState";
import { RootState } from "@state/store/configureStore";
import { GridItem } from "@model/index";
import { getSearchParams, GetArtworksResponse } from "@api/index";
import { TThunkAPI } from "../types";

export const getArtworks = createAsyncThunk<
    GetArtworksResponse,
    void,
    TThunkAPI
>("artworks/get", async (_, { extra: { apiService } }) => {
    const searchResults = await apiService.searchArtworks(getSearchParams());
    const artworkIDs = searchResults.data.map(result => result.id);

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
    data: GridItem[];
    loading: boolean;
}

const initialState = defaultInitialState.artworks as ArtworksState;

export const artworksSlice = createSlice({
    name: "artworks",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getArtworks.pending, state => {
                state.loading = true;
            })
            .addCase(getArtworks.fulfilled, (state, action) => {
                state.data = extractData(action.payload);
                state.loading = false;
            })
            .addCase(getArtworks.rejected, state => {
                state.loading = false;
            });
    },
});

export const selectArtworks = (state: RootState) => state.artworks;

export const selectArtworksData = (state: RootState) => state.artworks.data;

export const artworksReducer = artworksSlice.reducer;
