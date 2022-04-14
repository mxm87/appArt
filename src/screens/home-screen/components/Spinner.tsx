import React, { useRef, useEffect } from "react";
import { Animated, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { V_SCALE } from "@constants/index";

const Spinner = ({ loading, scrollY, top }) => {
    const lottieRef = useRef(null);

    useEffect(() => {
        loading && lottieRef.current?.play(21, 40);
    }, [loading]);

    const progress = scrollY.interpolate({
        inputRange: [-150, -30, 0],
        outputRange: [0.22, 0.05, 0.05],
        extrapolate: "clamp",
    });

    const opacity = scrollY.interpolate({
        inputRange: [-100, -40, 0],
        outputRange: [1, 0, 0],
        extrapolate: "clamp",
    });

    const translateY = scrollY.interpolate({
        inputRange: [-100, -40, 0],
        outputRange: [0, -10, -10],
        extrapolate: "clamp",
    });

    return (
        <Animated.View
            style={[
                styles.container,
                { top: Math.max(top - 5, 25) },
                !loading && { opacity, transform: [{ translateY }] },
            ]}
        >
            <LottieView
                ref={lottieRef}
                source={require("@assets/animations/red-spinner.json")}
                progress={loading ? null : progress}
                loop
                style={{ height: 90 * V_SCALE }}
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        alignSelf: "center",
        justifyContent: "center",
        height: 50 * V_SCALE,
        overflow: "hidden",
    },
});

export default Spinner;
