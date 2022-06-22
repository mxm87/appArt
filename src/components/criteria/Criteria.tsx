import React from "react";
import { StyleSheet, View, Text as RNText } from "react-native";
import { COLORS } from "@constants/colors";
import { Text } from "@components/text";

interface CriteriaProps {
    params: Array<{
        title: string;
        check: (value?: any) => boolean;
    }>;
    value: any;
}

export const Criteria = ({ params, value }: CriteriaProps) => {
    return (
        <View>
            <Text>Passwords must contain at least:</Text>
            <View style={styles.params}>
                {params.map((item, i) => {
                    const passed = item.check(value);
                    return (
                        <RNText key={i}>
                            <Text
                                style={{
                                    color: passed
                                        ? COLORS.CRITERIA
                                        : COLORS.BLACK,
                                }}
                            >
                                {item.title}
                            </Text>
                            {i < params.length - 1 && <Text>, </Text>}
                        </RNText>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    params: {
        alignItems: "center",
        flexDirection: "row",
    },
});
