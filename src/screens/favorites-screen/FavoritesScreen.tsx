import React from "react";
import {
    View,
    FlatList,
    ListRenderItem,
    TouchableOpacity,
    StyleSheet,
    LayoutAnimation,
} from "react-native";
import FastImage from "react-native-fast-image";
import { Container, Text } from "@components/index";
import { useAppSelector, useAppDispatch } from "@hooks/redux";
import { favoritesSelector, removeItem } from "@state/slices/favoritesSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { FavoriteItem } from "@model/index";
import { getImageURI } from "@api/utils";
import Icon from "react-native-vector-icons/Feather";
import { COLORS, S_WIDTH, BASE_URL } from "@constants/index";
import ROUTES from "@navigation/routes";

export const FavoritesScreen = ({ navigation }) => {
    const favoritesData = useAppSelector(favoritesSelector.selectAll);
    const dispatch = useAppDispatch();

    const onArtworkPress = (id: number) => {
        navigation.navigate(ROUTES.BROWSER, {
            url: BASE_URL + id,
        });
    };

    const onRemovePress = (id: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        dispatch(removeItem(id));
    };

    const renderItem: ListRenderItem<FavoriteItem> = ({ item }) => {
        return (
            <View style={styles.favItem}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => onArtworkPress(item.id)}
                    style={styles.touchWrapper}
                >
                    <FastImage
                        source={{ uri: getImageURI(item.image_id, true) }}
                        resizeMode="cover"
                        style={styles.image}
                    />
                    <View style={styles.labelContainer}>
                        <Text type="title">{item.title}</Text>
                        <Text type="artist">{item.artist_title}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => onRemovePress(item.id)}
                    style={styles.deleteButton}
                >
                    <Icon name="trash-2" color={COLORS.ICON} size={24} />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <Container>
            <SafeAreaView edges={["right", "left", "top"]}>
                <FlatList data={favoritesData} renderItem={renderItem} />
            </SafeAreaView>
        </Container>
    );
};

const styles = StyleSheet.create({
    favItem: {
        width: S_WIDTH,
        marginVertical: 10,
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    touchWrapper: {
        flexDirection: "row",
    },
    labelContainer: {
        width: S_WIDTH - 200,
        paddingHorizontal: 16,
        marginTop: 4,
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 6,
    },
    deleteButton: {
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        backgroundColor: COLORS.ICON_BG,
    },
});
