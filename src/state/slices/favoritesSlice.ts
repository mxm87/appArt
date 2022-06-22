import {
    createSlice,
    createEntityAdapter,
    createAsyncThunk,
} from "@reduxjs/toolkit";
import { RootState } from "@state/store/configureStore";
import { TThunkAPI } from "../types";
import { FavoriteItem } from "@model/index";
import defaultInitialState from "@state/store/initialState";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export const addItem = createAsyncThunk<void, FavoriteItem, TThunkAPI>(
    "favorites/add",
    async (item, { dispatch, extra: { dbRef } }) => {
        const uid = auth().currentUser?.uid;
        if (uid) {
            dbRef.doc(uid).update({
                [item.id]: item,
            });
        }
        dispatch(addOne(item));
    },
);

export const removeItem = createAsyncThunk<void, { id: number }, TThunkAPI>(
    "favorites/remove",
    async ({ id }, { dispatch, extra: { dbRef } }) => {
        const uid = auth().currentUser?.uid;
        if (uid) {
            dbRef.doc(uid).update({
                [id]: firestore.FieldValue.delete(),
            });
        }
        dispatch(removeOne(id));
    },
);

export const mergeItems = createAsyncThunk<void, void, TThunkAPI>(
    "favorites/merge",
    async (_, { dispatch, getState, extra: { dbRef } }) => {
        const rootState = getState() as RootState;
        const uid = auth().currentUser?.uid;
        if (uid) {
            const { entities: entitiesApp, ids: idsApp } = rootState.favorites;
            dbRef
                .doc(uid)
                .get()
                .then(async documentSnapshot => {
                    if (documentSnapshot.exists) {
                        const entitiesFirebase = documentSnapshot.data();
                        const idsFirebase = Object.keys(entitiesFirebase);

                        let result: FavoriteItem[] = Object.values(entitiesApp);

                        idsFirebase.forEach(id => {
                            !idsApp.includes(Number(id)) &&
                                result.push(entitiesFirebase[id]);
                        });

                        result.sort((a, b) => a.timestamp - b.timestamp);

                        idsApp.length > 0 &&
                            dbRef.doc(uid).update({ ...entitiesApp });
                        dispatch(setAll(result));
                        console.log("Firebase document updated");
                    } else {
                        dbRef.doc(uid).set(entitiesApp);
                        console.log("Firebase document created");
                    }
                });
        }
    },
);

export interface FavoritesState {
    ids: number[];
    entities: {};
}

const initialState = defaultInitialState.favorites as FavoritesState;

const favoritesAdapter = createEntityAdapter<FavoriteItem>({
    selectId: item => item.id,
});

export const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addOne: favoritesAdapter.addOne,
        removeOne: favoritesAdapter.removeOne,
        setAll: favoritesAdapter.setAll,
    },
});

const { addOne, removeOne, setAll } = favoritesSlice.actions;

export const favoritesSelector = favoritesAdapter.getSelectors<RootState>(
    state => state.favorites,
);

export const favoritesReducer = favoritesSlice.reducer;
