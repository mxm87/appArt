import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { Flex, RoundButton } from "@components/index";

export const BrowserScreen = ({ navigation, route }) => {
    const onBackButtonPress = () => {
        navigation.goBack();
    };

    return (
        <Flex>
            <WebView
                source={{
                    uri: route.params.url,
                }}
                startInLoadingState
            />
            <View style={styles.closeButtonWrapper}>
                <RoundButton type="close" onPress={onBackButtonPress} />
            </View>
        </Flex>
    );
};

const styles = StyleSheet.create({
    closeButtonWrapper: {
        position: "absolute",
        top: 48,
        left: 16,
    },
});
