import React, { useState } from "react";
import { View, TextInput, TextInputProps, StyleSheet } from "react-native";
import { Text } from "@components/index";
import { COLORS } from "@constants/index";

type TextFieldProps = TextInputProps & {
    label: string;
    inputRef?: React.Ref<TextInput>;
    errorMessage?: string;
    onFocus?: () => void;
    onBlur?: () => void;
};

export const TextField = ({
    label,
    inputRef,
    onFocus,
    onBlur,
    errorMessage,
    ...props
}: TextFieldProps) => {
    const [isFocused, setIsFocused] = useState(false);

    const _onFocus = () => {
        setIsFocused(true);
        typeof onFocus === "function" && onFocus();
    };

    const _onBlur = () => {
        setIsFocused(false);
        typeof onBlur === "function" && onBlur();
    };

    return (
        <View>
            <Text type="label">{label}</Text>
            <View
                style={[
                    styles.container,
                    {
                        borderColor: isFocused ? COLORS.ACTIVE : COLORS.INPUT,
                    },
                ]}
            >
                <TextInput
                    ref={inputRef}
                    onFocus={_onFocus}
                    onBlur={_onBlur}
                    selectionColor={COLORS.ACTIVE}
                    style={styles.input}
                    {...props}
                />
            </View>
            <Text style={styles.error}>{errorMessage}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 38,
        width: "100%",
        justifyContent: "center",
        borderBottomWidth: 1,
    },
    input: {
        height: "100%",
    },
    error: { color: COLORS.ACTIVE, marginTop: 4, marginBottom: 16, height: 16 },
});
