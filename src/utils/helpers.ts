import { Alert } from "react-native";
import { GridItem, FavoriteItem } from "@model/index";

type AlertProps = {
    title: string;
    description: string;
};

export const showAlert = (alert: AlertProps) => {
    Alert.alert(alert.title, alert.description, [
        { text: "OK", onPress: () => {} },
    ]);
};

export const getFavoriteItem = (item: GridItem): FavoriteItem => {
    const { tileIndex, ...rest } = item;
    return { ...rest, timestamp: Date.now() };
};
