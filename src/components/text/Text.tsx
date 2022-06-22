import React, { ReactNode } from "react";
import { Text as RNText, TextStyle, StyleSheet } from "react-native";
import { COLORS } from "@constants/index";

type TextProps = {
    children?: ReactNode;
    type?: "title" | "artist" | "label" | "default";
    style?: TextStyle;
};

export const Text = ({
    children,
    type = "default",
    style,
    ...props
}: TextProps) => {
    return (
        <RNText style={[variants[type], style]} {...props}>
            {children}
        </RNText>
    );
};

export const variants = StyleSheet.create({
    title: {
        fontWeight: "600",
        fontSize: 15,
        lineHeight: 22,
        color: COLORS.BLACK,
    },
    artist: {
        fontSize: 15,
        lineHeight: 22,
        fontWeight: "500",
        color: COLORS.ARTIST_FONT,
    },
    label: {
        lineHeight: 18,
        color: COLORS.INPUT,
    },
    default: {},
});
