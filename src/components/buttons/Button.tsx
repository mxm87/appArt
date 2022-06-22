import React from "react";
import {
    TouchableOpacity,
    StyleSheet,
    View,
    ActivityIndicator,
} from "react-native";
import { Text } from "@components/index";
import { COLORS } from "@constants/index";

type ButtonProps = {
    onPress: () => void;
    title: string;
    isLoading?: boolean;
};

export const Button = ({ onPress, title, isLoading }: ButtonProps) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            disabled={isLoading}
            style={styles.button}>
            {isLoading ? (
                <ActivityIndicator color={COLORS.DEFAULT} />
            ) : (
                <View>
                    <Text type="title" style={{ color: COLORS.WHITE }}>
                        {title}
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 46,
        backgroundColor: COLORS.ACTIVE,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
    },
});
