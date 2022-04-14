import React, { useEffect, useRef } from "react";
import { ScrollView, Animated, RefreshControl } from "react-native";
import { HStack, Container } from "@components/index";
import { useAppSelector, useAppDispatch } from "@hooks/redux";
import { selectArtworks, getArtworks } from "@state/slices/artworksSlice";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Spinner from "./components/Spinner";
import GridColumn from "./components/GridColumn";
import { COLORS, IS_IOS } from "@constants/index";

export const HomeScreen = () => {
    const dispatch = useAppDispatch();
    const { data: artworks, loading } = useAppSelector(selectArtworks);
    const { top } = useSafeAreaInsets();

    const scrollY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        artworks.length === 0 && dispatch(getArtworks());
    }, []);

    const onRefresh = () => {
        dispatch(getArtworks());
    };

    return (
        <Container>
            {IS_IOS && <Spinner {...{ loading, scrollY, top }} />}
            <ScrollView
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                refreshControl={
                    <RefreshControl
                        colors={[COLORS.ACTIVE]}
                        tintColor={"transparent"}
                        refreshing={loading}
                        onRefresh={onRefresh}
                    />
                }
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    y: scrollY,
                                },
                            },
                        },
                    ],
                    { useNativeDriver: false }
                )}
                style={{ paddingTop: top }}
            >
                <HStack style={{ paddingBottom: top }}>
                    <GridColumn position="left" data={artworks.slice(0, 4)} />
                    <GridColumn position="right" data={artworks.slice(4, 8)} />
                </HStack>
            </ScrollView>
        </Container>
    );
};
