import React, { ReactNode } from "react";
import { Text as RNText, TextStyle, StyleSheet } from "react-native";
import { COLORS } from "@constants/index";

type TextProps = {
    children?: ReactNode;
    type?: "title" | "artist" | "default";
    style?: TextStyle;
};

export const Text = ({
    children,
    type = "default",
    style,
    ...props
}: TextProps) => {
    return (
        <RNText style={[styles[type], style]} {...props}>
            {children}
        </RNText>
    );
};

export const styles = StyleSheet.create({
    title: {
        fontWeight: "600",
        fontSize: 15,
        lineHeight: 22,
    },
    artist: {
        fontSize: 15,
        lineHeight: 22,
        fontWeight: "500",
        color: COLORS.ARTIST_FONT,
    },
    default: {},
});
