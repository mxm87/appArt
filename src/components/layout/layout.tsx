import React, { ReactNode } from "react";
import { View, ViewStyle } from "react-native";

type LProps = {
    children?: ReactNode;
    style?: ViewStyle;
};

export const Container = ({ children, style, ...props }: LProps) => (
    <View
        style={[
            { flex: 1, alignItems: "center", justifyContent: "center" },
            style,
        ]}
        {...props}
    >
        {children}
    </View>
);

export const Flex = ({ children, style, ...props }: LProps) => (
    <View style={[{ flex: 1 }, style]} {...props}>
        {children}
    </View>
);

export const HStack = ({ children, style, ...props }: LProps) => (
    <View style={[{ flexDirection: "row" }, style]} {...props}>
        {children}
    </View>
);
