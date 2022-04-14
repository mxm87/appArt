import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "@constants/index";
import Icon from "react-native-vector-icons/Feather";

type FavoriteButtonProps = {
    onPress: () => void;
    active: boolean;
};

export const FavoriteButton = ({ onPress, active }: FavoriteButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Icon
                name="star"
                color={active ? COLORS.ACTIVE : COLORS.BUTTON}
                size={24}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 48,
        height: 48,
        alignItems: "center",
        justifyContent: "center",
    },
});
