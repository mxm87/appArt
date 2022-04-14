import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { useNavigation } from "@react-navigation/native";
import { COLORS, S_WIDTH, TILE_HEIGHT } from "@constants/index";
import { getImageURI } from "@api/utils";
import ROUTES from "@navigation/routes";
import FastImage from "react-native-fast-image";

const GridItem = ({ item, index, smallTileIndex }) => {
    const navigation = useNavigation() as any;

    const imageURI = getImageURI(item.image_id);
    const onArtworkPress = (index: number) => {
        navigation.navigate(ROUTES.DETAILS, {
            initialScrollIndex: index,
            thumbnailSource: imageURI,
        });
    };

    const height =
        index === smallTileIndex ? TILE_HEIGHT.SMALL : TILE_HEIGHT.LARGE;

    return (
        <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => {
                onArtworkPress(item.tileIndex);
            }}
        >
            <SharedElement id={`artwork.${item.tileIndex}`}>
                <FastImage
                    source={{ uri: imageURI }}
                    resizeMode="cover"
                    style={[styles.image, { height }]}
                />
            </SharedElement>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    image: {
        width: S_WIDTH / 2 - 12,
        borderRadius: 4,
        backgroundColor: COLORS.BUTTON,
        marginBottom: 8,
    },
});

export default GridItem;
