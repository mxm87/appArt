import { Api } from "@api/api";
import { AppDispatch, RootState } from "@state/store/configureStore";

export type TThunkAPI = {
    dispatch: AppDispatch;
    extra: { apiService: Api };
    rejectWithValue: (value: any, meta: any[]) => any;
    getState: () => RootState;
    rejectValue: string;
};
