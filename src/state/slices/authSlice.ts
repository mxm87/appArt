import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import defaultInitialState from "@state/store/initialState";
import { RootState } from "@state/store/configureStore";
import { mergeItems } from "@state/slices/favoritesSlice";
import auth from "@react-native-firebase/auth";
import { FormValues } from "@screens/index";
import { TThunkAPI, User } from "../types";
import { AUTH_CODES } from "@constants/firebase";

export const login = createAsyncThunk<User, FormValues, TThunkAPI>(
    "auth/login",
    async ({ email, password }, { dispatch, rejectWithValue }) => {
        try {
            return await auth()
                .createUserWithEmailAndPassword(email, password)
                .then(UserCredential => {
                    dispatch(mergeItems());
                    return UserCredential.user.toJSON() as User;
                });
        } catch (e) {
            if (e.code === AUTH_CODES.EMAIL_EXISTS) {
                return await auth()
                    .signInWithEmailAndPassword(email, password)
                    .then(UserCredential => {
                        dispatch(mergeItems());
                        return UserCredential.user.toJSON() as User;
                    })
                    .catch(e => {
                        console.log("Firebase:signIn:ERROR", e.code);
                        return rejectWithValue(e.code);
                    });
            } else {
                console.log("Firebase:createUser:ERROR", e.code);
                return rejectWithValue(e.code);
            }
        }
    },
);

export const logout = createAsyncThunk<void, void, TThunkAPI>(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            return await auth().signOut();
        } catch (e) {
            return rejectWithValue(e.code);
        }
    },
);

export interface AuthState {
    user: User | null;
    loading: boolean;
}

const initialState = defaultInitialState.auth as AuthState;

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(logout.fulfilled, state => {
                state.user = null;
                state.loading = false;
            })
            .addMatcher(
                action => action.type.endsWith("/pending"),
                state => {
                    state.loading = true;
                },
            )
            .addMatcher(
                action => action.type.endsWith("/rejected"),
                state => {
                    state.loading = false;
                },
            );
    },
});

export const selectAuth = (state: RootState) => state.auth;

export const selectCurrentUser = (state: RootState) => state.auth.user;

export const authReducer = authSlice.reducer;
