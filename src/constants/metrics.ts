import { Dimensions, Platform } from "react-native";

export const IS_IOS = Platform.OS === "ios";

export const { width: S_WIDTH, height: S_HEIGT } = Dimensions.get("window");

export const V_SCALE = S_HEIGT / 844;

export const TILE_HEIGHT = {
    SMALL: 180,
    LARGE: 250,
};
