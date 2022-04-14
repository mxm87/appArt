import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "@constants/index";
import Icon from "react-native-vector-icons/Feather";

type RoundButtonProps = {
    onPress: () => void;
    type: "close" | "back" | "info";
};

const variants = {
    close: {
        icon: "x",
        size: 24,
    },
    back: {
        icon: "chevron-left",
        size: 28,
    },
    info: {
        icon: "book-open",
        size: 24,
    },
};

export const RoundButton = ({ onPress, type }: RoundButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Icon
                name={variants[type].icon}
                color={COLORS.BUTTON}
                size={variants[type].size}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 48,
        height: 48,
        backgroundColor: COLORS.BUTTON_WRAPPER,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
});
