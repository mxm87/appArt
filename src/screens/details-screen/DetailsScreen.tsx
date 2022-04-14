import React, { useEffect, useRef } from "react";
import {
    Animated,
    FlatList,
    StyleSheet,
    View,
    ListRenderItem,
    NativeSyntheticEvent,
    NativeScrollEvent,
} from "react-native";
import FastImage from "react-native-fast-image";
import { useAppSelector, useAppDispatch } from "@hooks/redux";
import {
    addItem,
    removeItem,
    favoritesSelector,
} from "@state/slices/favoritesSlice";
import { selectArtworksData } from "@state/slices/artworksSlice";
import {
    Container,
    Text,
    RoundButton,
    FavoriteButton,
} from "@components/index";
import { COLORS, S_WIDTH, S_HEIGT, BASE_URL } from "@constants/index";
import { SharedElement } from "react-navigation-shared-element";
import { ArtItem } from "@model/index";
import { getImageURI } from "@api/utils";
import ROUTES from "@navigation/routes";

export const DetailsScreen = ({ navigation, route }) => {
    const artworks = useAppSelector(selectArtworksData);
    const favoritesIds = useAppSelector(favoritesSelector.selectIds);
    const dispatch = useAppDispatch();

    const { initialScrollIndex } = route.params;
    const currentScrollIndex = useRef(initialScrollIndex);
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        setTimeout(() => {
            Animated.timing(opacity, {
                toValue: 1,
                duration: 250,
                useNativeDriver: true,
            }).start();
        }, 500);
    }, []);

    const onBackButtonPress = () => {
        navigation.navigate(ROUTES.HOME, {
            currentScrollIndex: currentScrollIndex.current,
        });
    };

    const onInfoButtonPress = () => {
        navigation.navigate(ROUTES.BROWSER, {
            url: BASE_URL + artworks[currentScrollIndex.current].id,
        });
    };

    const onFavoritePress = (item: ArtItem, active: boolean) => {
        dispatch(active ? removeItem(item.id) : addItem(item));
    };

    const renderItem: ListRenderItem<ArtItem> = ({ item, index }) => {
        const active = favoritesIds.includes(item.id);
        return (
            <View>
                <SharedElement key={index} id={`artwork.${item.tileIndex}`}>
                    <FastImage
                        source={{ uri: getImageURI(item.image_id) }}
                        resizeMode="cover"
                        style={styles.image}
                    />
                </SharedElement>

                <Animated.View style={[styles.labelWrapper, { opacity }]}>
                    <View style={styles.labelText}>
                        <Text type="title">{item.title}</Text>
                        <Text type="artist">{item.artist_title}</Text>
                    </View>
                    <FavoriteButton
                        onPress={() => onFavoritePress(item, active)}
                        active={active}
                    />
                </Animated.View>
            </View>
        );
    };

    const getItemLayout = (_, index: number) => ({
        length: S_WIDTH,
        offset: S_WIDTH * index,
        index,
    });

    const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) =>
        (currentScrollIndex.current = Math.round(
            e.nativeEvent.contentOffset.x / S_WIDTH
        ));

    return (
        <Container style={styles.container}>
            <FlatList
                data={artworks}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                onMomentumScrollEnd={onMomentumScrollEnd}
                initialScrollIndex={initialScrollIndex}
                getItemLayout={getItemLayout}
                scrollEventThrottle={16}
            />
            <Animated.View style={[styles.backButtonWrapper, { opacity }]}>
                <RoundButton type="back" onPress={onBackButtonPress} />
                <RoundButton type="info" onPress={onInfoButtonPress} />
            </Animated.View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: { backgroundColor: COLORS.DEFAULT },
    image: {
        height: S_HEIGT,
        width: S_WIDTH,
    },
    backButtonWrapper: {
        position: "absolute",
        flexDirection: "row",
        justifyContent: "space-between",
        top: 48,
        left: 16,
        right: 16,
    },
    labelWrapper: {
        position: "absolute",
        backgroundColor: COLORS.BG,
        width: S_WIDTH - 48,
        borderRadius: 8,
        bottom: 44,
        marginHorizontal: 24,
        paddingHorizontal: 24,
        paddingVertical: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    labelText: {
        width: S_WIDTH / 1.5,
    },
});
