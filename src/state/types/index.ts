import { Api } from "@api/api";
import { AppDispatch, RootState } from "@state/store/configureStore";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type TThunkAPI = {
    dispatch: AppDispatch;
    getState: () => RootState;
    extra: {
        apiService: Api;
        dbRef: FirebaseFirestoreTypes.CollectionReference<FirebaseFirestoreTypes.DocumentData>;
    };
    rejectValue: string;
};

export type User = {
    displayName: any;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    metadata: {
        creationTime: number;
        lastSignInTime: number;
    };
    phoneNumber: any;
    photoURL: any;
    providerData: Array<{
        email: string;
        providerId: string;
        uid: string;
    }>;
    providerId: string;
    refreshToken: string;
    tenantId: any;
    uid: string;
};
